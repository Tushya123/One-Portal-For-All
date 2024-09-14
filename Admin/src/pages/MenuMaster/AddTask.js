import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { TagsInput } from "react-tag-input-component";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import { ClickTrigger } from "lord-icon-element";
const AddTask = () => {
  // departmentType:"",
  //                   taskName:"",
  //                   taskType:"",
  //                   accessLocation:"",
  //                   detail:"",
  //                   isActive: true,

  const validationSchema = Yup.object().shape({
    departmentType: Yup.string().required("Please select a Department Type"),
    taskName: Yup.string().required("Please Enter a Tool Name"),
    taskType: Yup.string().required("Please select a Tool Type"),
    accessLocation: Yup.string().required("Please select Access Location"),

    detail: Yup.string().required("Detail is required"),
    // email: Yup.string().email("Invalid email").required("Email is required"),
    // password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    // .required("Password is required"),
  });
  const navigate = useNavigate();
  const [departmenttype, setdepartmentype] = useState(null);
  const { GetallDepartmentType, addTask, GetallAddTask } =
    useContext(SignContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const getalldtype = async () => {
    const response = await GetallDepartmentType();
    setdepartmentype(response.data);
  };
  const addDetails = async (values) => {
    const response = await addTask(values);
  };
  const cancel = () => {
    navigate("/add-taskmaster");
  };
  useEffect(() => {
    getalldtype();
  }, []);
  useEffect(() => {}, [departmenttype]);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Add Tools</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/add-taskmaster">
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
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  departmentType: "",
                  taskName: "",
                  taskType: "",
                  accessLocation: "",
                  detail: "",
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  const res = addDetails(values);
                  if (res) {
                    toast.success("Task Added successfully!");
                    setTimeout(() => {
                      GetallAddTask();
                      navigate("/add-taskmaster");
                    }, 3000);
                  }
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <div className="login">
                    <div className="form">
                      {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                      <form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Tool Details</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Container fluid>
                                  <Row>
                                    <Col sm={4}>
                                      <label
                                        className="form-label mt-3"
                                        htmlFor="department-type-select"
                                      >
                                        Department Types
                                      </label>
                                      <div>
                                        <select
                                          className="form-select"
                                          name="departmentType"
                                          onBlur={handleBlur}
                                          value={values.departmentType}
                                          onChange={handleChange}
                                        >
                                          <option value="">--select--</option>
                                          {departmenttype &&
                                          departmenttype.length > 0 ? (
                                            departmenttype
                                              .filter(
                                                (type) => type.isActive === true
                                              )
                                              .map((type) => (
                                                <option
                                                  key={type._id}
                                                  value={type._id}
                                                >
                                                  {type.name}
                                                </option>
                                              ))
                                          ) : (
                                            <option value="" disabled>
                                              No department available
                                            </option>
                                          )}
                                        </select>
                                        <ErrorMessage
                                          name="departmentType"
                                          component="div"
                                          className="text-danger"
                                        />
                                      </div>
                                      <p className="error text-danger">
                                        {errors.departmentType &&
                                          touched.departmentType &&
                                          errors.departmentType}
                                      </p>
                                    </Col>

                                    <Col sm={4}>
                                      <label
                                        className="form-label mt-3"
                                        htmlFor="tool-name-input"
                                      >
                                        Tool Name
                                      </label>
                                      <div>
                                        <Input
                                          type="text"
                                          row="5"
                                          className="form-control"
                                          id="tool-name-input"
                                          name="taskName"
                                          aria-label="Tool Name"
                                          aria-describedby="tool-name-addon"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.taskName}
                                        />
                                      </div>
                                      <ErrorMessage
                                        name="taskName"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </Col>

                                    <Col sm={4}>
                                      <label
                                        className="form-label mt-3"
                                        htmlFor="tool-type-select"
                                      >
                                        Tool Types
                                      </label>
                                      <div>
                                        <select
                                          className="form-select"
                                          name="taskType"
                                          onBlur={handleBlur}
                                          value={values.taskType}
                                          onChange={handleChange}
                                        >
                                          <option value="">--select--</option>
                                          <option value="Form">Form</option>
                                          <option value="Data">Document</option>
                                        </select>
                                      </div>
                                      <ErrorMessage
                                        name="taskType"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </Col>
                                  </Row>
                                </Container>

                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Assigned By Admin
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="accessLocation"
                                      onBlur={handleBlur}
                                      value={values.accessLocation}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    <ErrorMessage
                                      name="accessLocation"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </Col>

                                <Col sm={8}>
                                  <div>
                                    <Label
                                      htmlFor="exampleFormControlTextarea5"
                                      className="form-label"
                                    >
                                      Details
                                    </Label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea5"
                                      rows="4"
                                      name="detail"
                                      value={values.detail}
                                      onChange={handleChange}
                                    ></textarea>
                                    <ErrorMessage
                                      name="detail"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </Col>
                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="isActive"
                                      checked={values.isActive}
                                      onChange={handleChange}
                                    />
                                    <label className="me-2">Is Active</label>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <div className="text-end mb-3 me-3">
                            <button
                              className="btn btn-success w-sm"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </Card>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
              <ToastContainer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddTask;
