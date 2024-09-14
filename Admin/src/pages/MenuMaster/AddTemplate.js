import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../MenuMaster/1.css'
import { Link } from "react-router-dom";



import axios from "axios";
import DeleteModal from "../../common/DeleteModal";
import SearchComponent from "../../common/SearchComponent";
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


const AddTemplate = () => {
  const navigate = useNavigate();
  

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalDepType, setOriginalDepType] = useState([]);

  const {
    GetallDepartmentGroup,
    GetallLocation,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
    getReqCommDetails,
    addRolesandResponsibility,
    createTemplateName,
    GetallTemplates
  } = useContext(SignContext);

  

  const createtempname = async (
   TemplateName,
    isActive,
    Dashboard,
    MenuMaster,
    AdminUser,
    CommunityUpdateMaster,
    LocationMaster,
    DepartmentGroup,
    DepartmentType,
    EmployeeRole,
    Employeemaster,
    AddTask,
    AssignMaster,
    CMS
  ) => {
    const response = await createTemplateName(TemplateName,
        isActive,
        Dashboard,
        MenuMaster,
        AdminUser,
        CommunityUpdateMaster,
        LocationMaster,
        DepartmentGroup,
        DepartmentType,
        EmployeeRole,
        Employeemaster,
        AddTask,
        AssignMaster,
        CMS
        )
        
        
    console.log("response123", response);
  };

  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [selectedMulti4, setselectedMulti4] = useState(null);
  const [dep, setdep] = useState(null);
  const [loc, setloc] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [emprole, setemprole] = useState(null);
  const [empname, setempname] = useState(null);
  const [locationSchema, setlocationSchema] = useState(null);
  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [email1, setemail1] = useState([]);
  const [pass, setpass] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const [emailandpassword, setemailandpassword] = useState([]);

  const cancel = () => {
    navigate("/template");
  };

  
  // const filteredLoc = loc.filter(location => location.isActive === true);
  return (
    
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
        <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Template</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/template">
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
                initialValues={{
                  // locationSchema: [],
                  // departmentGroup: [],
                  // departmentType: [],
                  // employeeRole: [],
                  // employeeName: [],
                  // email: "",
                  // password: "",
                  TemplateName:"",
                  isActive: false,
                  Dashboard: false,
                  MenuMaster: false,
                  AdminUser: false,
                  CommunityUpdateMaster: false,
                  LocationMaster: false,
                  DepartmentGroup: false,
                  DepartmentType: false,
                  EmployeeRole: false,
                  Employeemaster: false,
                  AddTask: false,
                  AssignMaster: false,
                  CMS: false,
                }}
                onSubmit={(values, { resetForm }) => {
                 
                  const response = createtempname(
                   
                    values.TemplateName,
                    values.isActive,
                    values.Dashboard,
                    values.MenuMaster,
                    values.AdminUser,
                    values.CommunityUpdateMaster,
                    values.LocationMaster,
                    values.DepartmentGroup,
                    values.DepartmentType,
                    values.EmployeeRole,
                    values.Employeemaster,
                    values.AddTask,
                    values.AssignMaster,
                    values.CMS
                  );
                
                  console.log("Newww", response);
                  if (response) {
                    toast.success("Entry added successfully!");
                    GetallTemplates();

                    navigate("/template");
                    
                  } else {
                    toast.error("Failed to add entry");
                  }
                //   setemail1('');
                //   setpass('');
                  resetForm();
                  // navigate('/template');
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                }) => (
                  <div className="login">
                    <div className="form">
                      <Form
                        onSubmit={handleSubmit}
                        enctype="multipart/form-data"
                      >
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Template</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                             
                                <Col lg={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                   Template Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="TemplateName"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.TemplateName}
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
                                {/* <Col sm={4}></Col> */}
                                <Row className="mt-5">
                                <Col >
                                  

                                  <div className="mt-3  space1">
                                    <Input
                                      type="checkbox"
                                      id="Dashboard"
                                      label="Dashboard"
                                      name="Dashboard"
                                      onChange={handleChange}
                                      checked={values.Dashboard}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">Dashboard</label>
                                  </div>

                                  <div className="mt-3">
                                  <label className="me-2 mainheading">SetUp</label>
                                  </div>
                                  <div className="mt-2 space1 " >
                                    <Input
                                      type="checkbox"
                                      id="MenuMaster"
                                      label="MenuMaster"
                                      name="MenuMaster"
                                      checked={values.MenuMaster}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween"  >Menu Master</label>
                                  </div>

                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="AdminUser"
                                      label="AdminUser"
                                      name="AdminUser"
                                      checked={values.AdminUser}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">Admin User</label>
                                  </div>

                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Master</label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="CommunityUpdateMaster"
                                      label="CommunityUpdateMaster"
                                      name="CommunityUpdateMaster"
                                      checked={values.CommunityUpdateMaster}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">
                                      Community  Master
                                    </label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="LocationMaster"
                                      label="LocationMaster"
                                      name="LocationMaster"
                                      checked={values.LocationMaster}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">
                                      LocationMaster
                                    </label>
                                  </div>
                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Department Master</label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="DepartmentGroup"
                                      label="DepartmentGroup"
                                      name="DepartmentGroup"
                                      checked={values.DepartmentGroup}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">
                                      Type of Functions
                                    </label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="DepartmentType"
                                      label="DepartmentType"
                                      name="DepartmentType"
                                      checked={values.DepartmentType}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">
                                      Department Type
                                    </label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="EmployeeRole"
                                      label="EmployeeRole"
                                      name="EmployeeRole"
                                      checked={values.EmployeeRole}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">Employee Role</label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="Employeemaster"
                                      label="Employeemaster"
                                      name="Employeemaster"
                                      checked={values.Employeemaster}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">
                                      Employee Master
                                    </label>
                                  </div>

                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Task Master</label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="AddTask"
                                      label="AddTask"
                                      name="AddTask"
                                      checked={values.AddTask}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">AddTask</label>
                                  </div>
                                  <div className="mt-2 space1">
                                    <Input
                                      type="checkbox"
                                      id="AssignMaster"
                                      label="AssignMaster"
                                      name="AssignMaster"
                                      checked={values.AssignMaster}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">AssignMaster</label>
                                  </div>
                                  <div className="mt-3 ">
                                    <Input
                                      type="checkbox"
                                      id="CMS"
                                      label="CMS"
                                      name="CMS"
                                      checked={values.CMS}
                                      onChange={handleChange}
                                      className="checkboxsize"
                                    />
                                    <label className="me-2 spacebetween">CMS</label>
                                  </div>
                                </Col></Row>
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
                            <button
                              className="btn btn-danger w-sm"
                              // onClick={handleSubmit}
                              onClick={cancel}
                              style={{ marginLeft: "3px" }}
                            >
                              Cancel
                            </button>
                          </div>
                        </Card>
                      </Form>
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

export default AddTemplate;