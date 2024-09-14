import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { Link } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddEmployee = () => {
  const {
    GetallLocation,
    GetallDepartmentGroup,
    GetDepTypeById,
    GetEmployeeRoleById,
    addEmployeeName,
  } = useContext(SignContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    departmentGroup: Yup.string().required("Please select Type of Function"),
    location: Yup.string().required("Invalid Location Group"),
    departmentType: Yup.string().required("Please select a Department Type"),
    employeeRole: Yup.string().required("Please select a Employee Role"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const [loc, setloc] = useState(null);
  const [grp, setgrp] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [aa, setaa] = useState("");
  const [employeerole, setemployeerole] = useState(null);
  const [display, setDisplay] = useState([]);
  const getallemployeename = async (values) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenames`
    );
    return res;
  };
  const getdeptype = async (id) => {
    const res = await GetDepTypeById(id);
    setdtype(res.data);

    console.log("hello>>>", res.data[0].departmentGroup._id);

    setaa(res.data[0].departmentGroup._id);
  };
  const handleDepGrp = (e) => {
    let depgrpid = e.target.value;

    console.log(depgrpid);

    if (depgrpid) {
      getdeptype(depgrpid);
    }
  };

  const getemployeerole = async (id, s) => {
    console.log(s);
    console.log(id);
    const res = await GetEmployeeRoleById(s, id);

    setemployeerole(res.data);
  };
  const handleDepType = (e) => {
    let deptypeid = e.target.value;

    if (deptypeid) {
      getemployeerole(deptypeid, aa);
    }
  };
  const cancel = () => {
    navigate("/employee-master");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetallLocation();
        setloc(res.data);

        console.log("loc", res);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [GetallLocation]);

  const fetchData1 = async () => {
    try {
      const res = await GetallDepartmentGroup();
      setgrp(res.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };
  const addEmployeeName1 = async (values) => {
    const response = await addEmployeeName(values);
    console.log("response", response.data._id);
    const res1 = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/pin/createPinnedItem/${response.data._id}`,
      {
        Dashboard: false,
        MenuMaster: false,
        AdminUser: false,
        RolesResponsibility: false,
        CommunityUpdateMaster: false,
        LocationMaster: false,
        DepartmentGroup: false,
        DepartmentType: false,
        EmployeeRole: false,
        Employeemaster: false,
        AddTask: false,
        AssignMaster: false,
      }
    );
    console.log(res1);
  };
  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => { }, [grp]);
  useEffect(() => { }, [loc]);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Employee name</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/employee-master">
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
                  location: "",
                  departmentGroup: "",
                  departmentType: "",
                  employeeRole: "",
                  name: "",
                  email: "",
                  password: "",
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  console.log("hello");
                  console.log(">>>>>", values);
                  if (!values.location) {
                    toast.error("All the Location are Inactive");
                  }
                  const res = addEmployeeName1(values);
                  if (res) {
                    toast.success("Employee Added successfully!");
                    setTimeout(() => {
                      getallemployeename();
                      navigate("/employee-master");
                    }, 3000)
                  } else {
                    toast.error("Employee Not Added");
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
                                    <strong>Employee Details</strong>
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
                                      >
                                        <option value="">--select--</option>

                                        {/* {console.log(loc.isActive===true)}; */}
                                        {loc && loc.length > 0 ? (
                                          loc
                                            .filter(
                                              (type) => type.isActive === true
                                            )
                                            .map((type) => (
                                              <option
                                                key={type}
                                                value={type._id}
                                              >
                                                {type.name}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No locations available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="location"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                        value={values.departmentGroup}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleDepGrp(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {grp && grp.length > 0 ? (
                                          grp
                                            .filter(
                                              (type) => type.isActive === true
                                            )
                                            .map((type) => (
                                              <option
                                                key={type}
                                                value={type._id}
                                              >
                                                {type.name}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No grp available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="departmentGroup"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                        value={values.departmentType}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleDepType(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {dtype && dtype.length > 0 ? (
                                          dtype
                                            .filter(
                                              (type) => type.isActive === true
                                            )
                                            .map((type) => (
                                              <option
                                                key={type}
                                                value={type._id}
                                              >
                                                {type.name}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No type available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="departmentType"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Employee Roles
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="employeeRole"
                                        onBlur={handleBlur}
                                        value={values.employeeRole}
                                        onChange={handleChange}
                                      >
                                        <option value="">--select--</option>
                                        {employeerole &&
                                          employeerole.length > 0 ? (
                                          employeerole
                                            .filter(
                                              (type) => type.isActive === true
                                            )
                                            .map((type) => (
                                              <option
                                                key={type}
                                                value={type._id}
                                              >
                                                {type.EmployeeRole}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No role available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="employeeRole"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                      />
                                      <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
                                      <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                      />
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

export default AddEmployee;
