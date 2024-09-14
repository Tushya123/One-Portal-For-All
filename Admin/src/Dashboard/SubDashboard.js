import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useParams } from "react-router-dom";
import SignContext from "../contextAPI/Context/SignContext";

const SubDashboard = () => {
    const { GetSpecificAddTaskByDeptId } = useContext(SignContext);
    document.title = "SubDashboard";
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const gettingid = async () => {
        console.log("hello");
        const res = await GetSpecificAddTaskByDeptId(id);
        console.log(">>>>", res.data.length);
        setTasks(res.data);
        setLoading(false); // Set loading to false once the data is fetched
    };

    useEffect(() => {
        gettingid();
    }, [id]);

    console.log(tasks);

    return (
        <div className="bg-white page-content">
            <Container fluid>
                <Row>
                    <div className="d-flex justify-content-end">
                        <Link to={`/Dashboard`}>
                            <button
                                className="custom_hover btn btn-primary btn-color"
                                type="submit"
                                style={{
                                    display: "flex",
                                    fontSize: "18px",
                                    width: "100%",
                                    marginBottom: "10px",
                                }}
                            >
                                <i className="ri-function-line me-1 fs-18"></i>Dashboard
                            </button>
                        </Link>
                    </div>
                    <div className="d-flex flex-wrap">
                        {loading ? (
                            <div>Loading...</div>
                        ) : tasks && tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <Col md={4} key={index} className="px-2">
                                    <Link to={`/assigndashboard/${task.departmentType._id}/${task._id}`}>
                                        <Card className="card-animate card-res" style={{ borderRadius: "15px" }}>
                                            <CardBody className="rounded-20">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <p className="fw-semibold new-class fs-18 mb-0">
                                                            {task.taskName}
                                                        </p>
                                                        <ul className="ps-0 fs-14 mt-3" style={{ fontWeight: '800', listStyleType: 'none', color: "#495057" }}>
                                                            <li>{task.detail}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <span className="avatar-title rounded-circle fs-2" style={{ backgroundColor: 'green' }}>
                                                            <FeatherIcon icon="file-text" className="text-white" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <div>No Tools available</div>
                        )}
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default SubDashboard;
