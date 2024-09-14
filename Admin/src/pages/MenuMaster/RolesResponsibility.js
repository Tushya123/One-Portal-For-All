import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../MenuMaster/1.css";
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

const validationSchema = Yup.object().shape({});
const AddRoles = () => {
  const navigate = useNavigate();
  const [new_id, set_id] = useState("");
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
  } = useContext(SignContext);
  console.log("THisisisi", new_id)
  // useEffect(()=>{
  // set_id();
  // },[new_id])
  console.log("THe new id is:", new_id)
  const addrolesandresponsibility = async (
    new_id,
    employeeName,
    email,
    password,
    isActive,
    tasktemplate // Include tasktemplate here
  ) => {
    try {
      const response = await addRolesandResponsibility(
        `${tasktemplate}`, // Append tasktemplate to the URL
        employeeName,
        email,
        password,
        isActive,
      );
      console.log("response123", response);

      if (response.success) {
        toast.success("Roles and responsibilities added successfully!");
        setTimeout(() => {
          // window.location.reload("/roles-responsibilty")
        }, 3000);
      } else {
        toast.error("Employee Role already exists");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400 && error.response.data.error === "Employee name already exists.") {
        toast.error("User already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  const getRolesResponsibilitiesData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`)
      // setOriginalRolesResponsibilities(res.rolesresponsibilities);
      // setRolesResponsibilities(res.rolesresponsibilities);
    } catch (error) {
      // console.error("Error fetching roles and responsibilities:", error);
    }
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
  const [subtemplate, setsubtemplate] = useState([]);
  const [subtasktemplate, setsubtasktemplate] = useState([]);
  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const [emailandpassword, setemailandpassword] = useState([]);
  const [template, settemplate] = useState([]);
  const [tasktemplate, settasktemplate] = useState([]);
  const [finalemployeename, setemployeefinalname] = useState("");
  const [empval, setempval] = useState("");
  console.log("abc", empval)
  const gettingemailandpassword = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenamebyid/${empval}`
    );
    console.log("nnnnnnnnn", res);
    setemail1(res.data.email);
    setpass(res.data.password);
  };
  useEffect(() => {
    gettingemailandpassword(empval);
  }, [empval]);

  useEffect(() => {
    console.log(uniqueDepartmentTypes);
  }, [uniqueDepartmentTypes]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeRoles]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeNames]);

  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
        isActive: item.isActive,
      }));

    console.log(names);
    setloc(names);
  };

  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
        isActive: item.isActive,
      }));

    setdep(names);
  };

  const handleTemplateChange = async (e) => {
    const id = e.target.value;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", id);

    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/template/getTemplateById/${id}`
    );
    // console.log(">>>>vaishal123", res.data._id);

    setsubtemplate(res.data);
  };

  const handleTaskTemplateChange = async (e) => {
    const id = e.target.value;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", id);

    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tasktemplate/getTaskTemplateById/${id}`
    );
    console.log(">>>>vaishal", res.data._id);
    set_id(res.data._id)
    setsubtasktemplate(res.data);
  };

  const getdeptype = async () => {
    const response = await GetallDepartmentType();
    //  console.log("res>>",response);

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item.departmentGroup._id,
        new_id: item._id,
      }));

    setdtype(names);
  };

  const getemprole = async () => {
    const response = await GetallEmployeeRole();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.EmployeeRole,
        id: item.departmentType._id,
        new_empId: item._id,
      }));

    setemprole(names);
    console.log(names);
  };
  const getempname = async () => {
    const response = await GetallEmployeeName();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item.employeeRole._id,
        main_id: item._id,
      }));

    setempname(names);
    console.log(names);
  };

  function handleMulti(selectedMulti) {
    // setselectedMulti(selectedMulti);
    setselectedMulti(
      selectedMulti.length > 0
        ? [selectedMulti[selectedMulti.length - 1]]
        : null
    );

    console.log(">>>>vaishal", selectedMulti);
    let selectedValues = [];
    for (let i = 0; i < selectedMulti.length; i++) {
      const selectempId = selectedMulti[i].id;

      for (let j = 0; j < dtype.length; j++) {
        const departtype = dtype[j];

        if (departtype && departtype.id === selectempId) {
          selectedValues.push({
            label: departtype.label,
            id: departtype.id,
            value: departtype.label,
            new_Id: departtype.new_id,
          });
        }
      }
    }
    setUniqueDepartmentTypes(selectedValues);

    console.log("These are the department type", uniqueDepartmentTypes);
  }

  function handleMulti1(selectedMulti1) {
    setselectedMulti1(
      selectedMulti1.length > 0
        ? [selectedMulti1[selectedMulti1.length - 1]]
        : null
    );
    console.log("Hiiiiisshsh", selectedMulti1);
    console.log("hello");
    console.log(selectedMulti1);

    console.log("vaishal11", selectedMulti1);
    let selectedempValues = [];
    for (let i = 0; i < selectedMulti1.length; i++) {
      const selectId = selectedMulti1[i].new_Id;
      //  console.log(selectId)

      for (let j = 0; j < emprole.length; j++) {
        const employeetype = emprole[j];
        // console.log(employeetype);

        if (employeetype && employeetype.id === selectId) {
          selectedempValues.push({
            label: employeetype.label,
            id: employeetype.id,
            value: employeetype.label,
            neww_id: employeetype.new_empId,
          });
        }
      }
    }
    setUniqueEmployeeRoles(selectedempValues);
  }

  function handleMulti4(selectedMulti4) {
    //  setselectedMulti4(selectedMulti4);
    setselectedMulti4(
      selectedMulti4.length > 0
        ? [selectedMulti4[selectedMulti4.length - 1]]
        : null
    );

    console.log("hiivaishal", selectedMulti4);
    console.log("abc", selectedMulti4[0].main_Id);
    setemailandpassword(selectedMulti4[0].main_Id);
    // gettingemailandpassword(selectedMulti4[0].main_Id);
  }
  function handleMulti2(selectedMulti2) {
    // setselectedMulti2(selectedMulti2);
    // setlocationSchema(selectedMulti2);
    setselectedMulti2(
      selectedMulti2.length > 0
        ? [selectedMulti2[selectedMulti2.length - 1]]
        : null
    );
  }

  useEffect(() => {
    getRolesResponsibilitiesData();
  }, []);
  const handleEmployeeNameChange = (selectedOption) => {
    try {

      console.log("the id is", selectedOption.label);
      setemployeefinalname(selectedOption.label);
      setempval(selectedOption.value)

    } catch (error) {
      console.log(error);
    }
  };
  console.log("This is", empname)
  function handleMulti3(selectedMulti3) {
    // setselectedMulti3(selectedMulti3);
    setselectedMulti3(
      selectedMulti3.length > 0
        ? [selectedMulti3[selectedMulti3.length - 1]]
        : null
    );
    let selectedempNames = [];
    for (let i = 0; i < selectedMulti3.length; i++) {

      const selectId = selectedMulti3[i].value;

      for (let j = 0; j < empname.length; j++) {
        const EmployeeName = empname[j];

        if (EmployeeName && EmployeeName.id === selectId) {
          selectedempNames.push({
            label: EmployeeName.label,
            id: EmployeeName.id,
            value: EmployeeName.label,
            main_Id: EmployeeName.main_id,
          });
        }
      }
    }
    setuniqueEmployeeNames(selectedempNames);
    console.log(selectedempNames);
  }
  const gettemplate = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/template/getTemplates`
    );
    console.log(">>template", res.data);
    settemplate(res.data);
  };
  const gettasktemplate = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tasktemplate/getTaskTemplates`
    );
    console.log(">>template", res.data);
    settasktemplate(res.data);
  };
  useEffect(() => {
    console.log("subteml", subtemplate);
  }, [subtemplate]);
  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
    gettemplate();
    gettasktemplate();
  }, []);
  const cancel = () => {
    navigate("/roles-responsibilty");
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
  // const filteredLoc = loc.filter(location => location.isActive === true);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Role Responsibilty</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/roles-responsibilty">
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


                  employeeName: "",
                  email: "",
                  password: "",
                  isActive: true,
                  tasktemplate: '6654270d3110d1063bc75c30', // Include tasktemplate here


                }}
                onSubmit={(values, { resetForm }) => {
                  setselectedMulti2(null);
                  setselectedMulti(null);
                  setselectedMulti1(null);
                  setselectedMulti3(null);
                  setselectedMulti4(null);
                  setUniqueDepartmentTypes([]);
                  setUniqueEmployeeRoles([]);
                  setuniqueEmployeeNames([]);
                  // addCheckupDetails(values);
                  console.log(">>>", values.name);
                  console.log("Nioicc", values.locationSchema);


                  const response = addrolesandresponsibility(
                    new_id,

                    empval,

                    email1,
                    pass,

                    values.isActive,
                    values.tasktemplate // Pass tasktemplate value here




                  );
                  console.log("Byee", new_id)

                  console.log("Newww", response);
                  if (response) {
                    toast.success("Entry added successfully!");
                    GetallEmployeeName();
                    getRolesResponsibilitiesData();
                  } else {
                    toast.error("Failed to add entry");
                  }
                  setemail1("");
                  setpass("");
                  resetForm();
                  navigate("/roles-responsibilty");
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
                                    <strong>Roles Assign Details</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Row>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Employee Name
                                      </Label>
                                      <Select
                                        placeholder={finalemployeename}
                                        value={finalemployeename}
                                        onChange={handleEmployeeNameChange}
                                        options={empname}
                                      />
                                    </div>
                                    {/* Uncomment and use this if needed for validation messages */}
                                    {/* <p className="error text-danger">
        {errors.employeeName && touched.employeeName && errors.employeeName}
      </p> */}
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        className="form-label text-muted"
                                        htmlFor="email-input"
                                      >
                                        Email
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="email-input"
                                        name="email"
                                        aria-label="email"
                                        aria-describedby="email-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={email1}
                                      />
                                      <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        className="form-label text-muted"
                                        htmlFor="password-input"
                                      >
                                        Password
                                      </Label>
                                      <Input
                                        type="password"
                                        className="form-control"
                                        id="password-input"
                                        name="password"
                                        aria-label="password"
                                        aria-describedby="password-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={pass}
                                      />
                                      <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label className="form-label" htmlFor="product-orders-input">
                                      Tools Template
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="tasktemplate"
                                        onBlur={handleBlur}
                                        value={values.tasktemplate || '6654270d3110d1063bc75c30'} // Default value set here
                                        onChange={(e) => {
                                          // setSelectedDepartmentGroup(e.target.value);
                                          handleChange(e);
                                          handleTaskTemplateChange(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {tasktemplate && tasktemplate.length > 0 ? (
                                          tasktemplate
                                            .filter((type) => type.isActive === true)
                                            .map((type) => (
                                              <option key={type._id} value={type._id}>
                                                {type.templateName}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No Tool available
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


                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Field
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

export default AddRoles;
