import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardHeader, Col, Container, Input, Row, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

const TaskTemplate = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [tasksByDepartment, setTasksByDepartment] = useState({});

    const { addTaskTemplate, GetallTemplates } = useContext(SignContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskfortemplate`);

                // Fetch department names from the response and create a mapping
                const departmentNames = {};
                response.data.forEach(task => {
                    departmentNames[task.documentdepartmenttype] = task.departmentType;
                });

                // Process task details and replace department IDs with names
                const tasksWithCheckboxState = response.data.reduce((accumulator, currentValue) => {
                    const tasksWithNames = currentValue.taskDetails.map(task => ({
                        ...task,
                        departmentType: departmentNames[currentValue.documentdepartmenttype]
                    }));
                    return [...accumulator, ...tasksWithNames];
                }, []);

                groupTasksByDepartment(tasksWithCheckboxState);
            } catch (error) {
                console.error('Failed to fetch Tools', error);
                toast.error("Failed to fetch Tools");
            }
        };
        fetchTasks();
    }, []);


    const groupTasksByDepartment = (tasks) => {
        const grouped = tasks.reduce((acc, task) => {
            const deptName = task.departmentType;
            if (!acc[deptName]) {
                acc[deptName] = [];
            }
            acc[deptName].push(task);
            return acc;
        }, {});
        setTasksByDepartment(grouped);
    };

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = Object.values(tasksByDepartment).flat().map(task =>
            task._id === taskId ? { ...task, isChecked: !task.isChecked } : task
        );
        groupTasksByDepartment(updatedTasks);
    };

    const handleSubmit = async (values) => {
        const selectedTasks = Object.values(tasksByDepartment).flat().filter(task => task.isChecked).map(task => ({
            id: task._id,
            // taskid: _id,
            name: task.taskName
        }));

        const payload = {
            departmentName: values.departmentName,
            isActive: values.isActive,
            tasks: selectedTasks,
            TemplateName: values.templateName  // Extract templateName from the values object
        };

        const response = await addTaskTemplate(payload);

        if (response) {
            toast.success("Template created successfully!");
            setTimeout(() => {
                GetallTemplates();
                navigate("/TaskTemplateMaster");
            }, 2000)
        } else {
            toast.error("Failed to create template");
        }
    };

    const cancel = () => {
        navigate("/TaskTemplateMaster");
    };

    const renderTasks = () => {
        return Object.entries(tasksByDepartment).map(([department, tasks], index) => (
            <div key={index} className=" mt-4 p-0 space1">
                <Row>
                    <Col lg={12}>
                        <h5 className="mainheading">{department}</h5>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {tasks.map((task, idx) => (
                        <div key={task._id} className=" border-0 mt-2 space1" style={{ paddingLeft: '50px' }}>

                            <Input
                                type="checkbox"
                                checked={task.isChecked}
                                onChange={() => handleCheckboxChange(task._id)}
                            />
                            <Label className="me-2 spacebetween"> {task.taskName} </Label>

                        </div>
                    ))}
                </Row>
            </div>
        ));
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.replace("/");
    };

    // Set timeout for automatic logout after 1 hour
    useEffect(() => {
        let timeoutId;

        const startTimer = () => {
            timeoutId = setTimeout(() => {
                handleLogout();
                toast.warn("You have been logged out due to inactivity.");
            }, 600000); // 1 hour = 3600000 milliseconds
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);
            startTimer();
        };

        // Start the timer when the component mounts
        startTimer();

        // Reset the timer whenever there is user interaction
        const handleUserInteraction = () => {
            resetTimer();
            // You can also perform other actions on user interaction if needed
        };

        document.addEventListener("mousemove", handleUserInteraction);
        document.addEventListener("keydown", handleUserInteraction);
        document.addEventListener("mousedown", handleUserInteraction);
        document.addEventListener("scroll", handleUserInteraction);

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener("mousemove", handleUserInteraction);
            document.removeEventListener("keydown", handleUserInteraction);
            document.removeEventListener("mousedown", handleUserInteraction);
            document.removeEventListener("scroll", handleUserInteraction);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="page-content">
            <Container fluid>
                <div className="row">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <div className="col-6">
                            <h4 className="mb-0">Tool Template</h4>
                        </div>
                        <div className="col-6">
                            <div className="d-flex align-items-center justify-content-end">
                                <Link to="/TaskTemplateMaster">
                                    <button
                                        className="custom_hover btn btn-primary btn-color"
                                        type="submit"
                                        style={{
                                            display: "flex",
                                            fontSize: "18px",
                                            width: "100%",
                                        }}
                                    >
                                        <i className="ri-function-line me-1 fs-18"></i>View Menu
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="page-title-right">
                            <div className="form-check d-inline-block mb-0">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="formCheck1"
                                    style={{ visibility: "hidden" }}
                                />
                                {/* <label className="form-check-label" htmlFor="formCheck1">
            <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
          </label> */}
                            </div>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <div className="card-body">
                                <CardHeader>
                                    <h4 className="mb-0">Create New Template</h4>
                                </CardHeader>

                                <Formik
                                    initialValues={{
                                        templateName: "",
                                        departmentName: "",
                                        isActive: true,
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, handleChange }) => (
                                        <Form>
                                            <div className="card-body">
                                                <Row form>
                                                    <Col md={5}>
                                                        <label htmlFor="templateName">Template Name:</label>
                                                        <Input
                                                            id="templateName"
                                                            name="templateName"
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={values.templateName}
                                                        />
                                                    </Col>
                                                    <Col md={5}>
                                                        <label htmlFor="departmentName">Template Details:</label>
                                                        <Input
                                                            id="departmentName"
                                                            name="departmentName"
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={values.departmentName}
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <div className="mt-4" style={{ paddingTop: '14px' }}>
                                                            <Field type="checkbox" name="isActive" />
                                                            <Label className="ms-2">Is Active</Label>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={12}>
                                                        <h5 className="mt-3 mb-4 fs-4">Select Tools:</h5>
                                                        {renderTasks()}
                                                    </Col>
                                                </Row>
                                                <Row>

                                                </Row>
                                            </div>
                                            <div className="text-end mb-3 me-3">
                                                <button
                                                    className="btn btn-success w-sm"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                                <button
                                                    className="btn btn-danger w-sm"
                                                    // onClick={handleSubmit}
                                                    onClick={cancel}
                                                    style={{ marginLeft: "3px" }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            {/* <div className="card-footer text-right" >
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={cancel}>Cancel</button>
                                    </div> */}
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    );
};

export default TaskTemplate;
