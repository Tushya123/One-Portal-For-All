import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import axios from "axios";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditEmployeeName = () => {
  const navigate = useNavigate();

  const {
    GetEmployeeNameIdForEditing,
    setEditEmployeeNameValues,
    GetallEmployeeName,
  } = useContext(SignContext);
  const { id } = useParams();
  const [typeid1, settypeid1] = useState({
    location: "",
    departmentGroup: "",
    departmentType: "",
    employeeRole: " ",
    name: " ",
    isActive: " ",
    email: " ",
    password: "",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Employee Role Name is required"),

    email: Yup.string().required("Email is required"),
    // password: Yup.string().required("Password is Required"),
  });
  const getallemployeename = async (values) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenames`
    );
    return res;
  };

  const gettingempname = async (id) => {
    const res = await GetEmployeeNameIdForEditing(id);
    console.log("res", res);
    settypeid1({
      location: res.data.location,
      departmentGroup: res.data.departmentGroup,
      departmentType: res.data.departmentType[0],
      employeeRole: res.data.employeeRole,
      name: res.data.name,
      isActive: res.data.isActive,
      email: res.data.email,
      password: res.data.password,
    });
  };
  const cancel = () => {
    GetallEmployeeName();
    navigate("/employee-master");
  };
  useEffect(() => {}, []);
  useEffect(() => {
    gettingempname(id);
  }, []);
  // console.log("Testing",typeid1.departmentGroup.name);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Employee Name"
            parent="OPA"
            child="Edit-EmployeeName"
          />
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={typeid1}
                onSubmit={(values, { resetForm }) => {
                  console.log("valuess", values);
                  if (
                    typeid1.name !== "" &&
                    typeid1.email !== "" &&
                    typeid1.password !== ""
                  ) {
                    const isValidEmail =
                      /.+@.+\..+/.test(typeid1.email) &&
                      /.com$|.net$/.test(typeid1.email);
                    // console.log("this is id",typeid1.departmentType[0]._id)
                    // console.log("this is name",typeid1.departmentType[0].name)
                    if (isValidEmail) {
                      const res = setEditEmployeeNameValues(
                        id,
                        typeid1.location,
                        typeid1.departmentGroup._id,
                        typeid1.departmentType._id,
                        typeid1.employeeRole._id,
                        typeid1.name,
                        typeid1.email,
                        typeid1.password,
                        typeid1.isActive
                      );
                      if (res) {
                        toast.success("Employee Edited successfully!");
                        setTimeout(() => {
                          getallemployeename();
                          navigate("/employee-master");
                        }, 3000);
                      }
                    }
                  }

                  // if(!typeid1.name){
                  //   toast.error("Please Enter Name");
                  //   return ;
                  // }

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
                      <form noValidate onSubmit={handleSubmit}>
                        {console.log("values", values)}
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Employee Name</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Location
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="location"
                                        onBlur={handleBlur}
                                        value={values.location}
                                        onChange={handleChange}
                                        disabled
                                      >
                                        <option>{typeid1.location.name}</option>
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Type of Functions
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentGroup"
                                        onBlur={handleBlur}
                                        // value={values.departmentGroup}
                                        onChange={handleChange}
                                        disabled
                                      >
                                        <option>
                                          {typeid1.departmentGroup.name}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Department Type
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentType"
                                        onBlur={handleBlur}
                                        // value={typeid1.departmentType[0]}

                                        onChange={handleChange}
                                        disabled
                                      >
                                        <option>
                                          {typeid1.departmentType.name}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Employee Role
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="employeeRole"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                        disabled
                                      >
                                        <option>
                                          {typeid1.employeeRole.EmployeeRole}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Employee Name
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="name"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) =>
                                          settypeid1((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                          }))
                                        }
                                        onBlur={handleBlur}
                                        value={typeid1.name}
                                      />
                                      {touched.name && !typeid1.name && (
                                        <p className="error text-danger">
                                          Employee Name is required
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Email
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="email"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) =>
                                          settypeid1((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                          }))
                                        }
                                        onBlur={handleBlur}
                                        value={typeid1.email}
                                      />
                                      {touched.email && !typeid1.email && (
                                        <p className="error text-danger">
                                          Email is required
                                        </p>
                                      )}
                                      {touched.email &&
                                        typeid1.email &&
                                        (!/.+@.+\..+/.test(typeid1.email) ||
                                          !/(.com|.net)$/.test(
                                            typeid1.email
                                          )) && (
                                          <p className="error text-danger">
                                            Invalid email format
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Password
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="password"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) =>
                                          settypeid1((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                          }))
                                        }
                                        onBlur={handleBlur}
                                        value={typeid1.password}
                                      />
                                      {touched.password &&
                                        !typeid1.password && (
                                          <p className="error text-danger">
                                            Password is required
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </Col>

                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="isActive"
                                      checked={typeid1.isActive}
                                      onChange={(e) =>
                                        settypeid1({
                                          ...typeid1,
                                          isActive: e.target.checked,
                                        })
                                      }
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
                              Update
                            </button>
                            <button
                              className="btn btn-danger w-sm"
                              onClick={cancel}
                              style={{ marginLeft: "3px" }}
                            >
                              Cancel
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

export default EditEmployeeName;
