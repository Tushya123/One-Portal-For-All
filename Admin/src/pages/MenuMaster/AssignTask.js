import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
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
const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];
const AssignTask = () => {
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    documentname: Yup.string().required("Please Enter a Document Name"),
    documentdepartmenttype: Yup.string().required(
      "Please Select a Document Department Type"
    ),
    uploaddocument: Yup.mixed(),
    tasktypes: Yup.string().required("Please select a task Type"),
    documentdescription: Yup.string().required("Please enter Description"),
  });
  // documentname: "",
  // documentdepartmenttype: "",
  // tasktypes: "",
  // formlink: "",
  // documenttype: "",
  // uploaddocument: "",
  // documentlink: "",
  // documentdescription: "",
  // locationSchema: [],
  // departmentGroup: [],
  // departmentType: [],
  // employeeRole: [],
  // employeeName: [],
  // isActive: true,

  const navigate = useNavigate();
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [selectedNoSortingGroup, setSelectedNoSortingGroup] = useState(null);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [selectedMulti4, setselectedMulti4] = useState(null);
  const {
    GetallDepartmentType,
    GetSpecificTaskByDepartmentGroup,
    GetAddTaskById,
    GetallDepartmentGroup,
    GetallLocation,
    GetallEmployeeRole,
    GetallEmployeeName,
    addAssignTaskmaster,
    GetallAssignTask,
    getSpecificAdmin,
    getLoggedInAdmin,
  } = useContext(SignContext);
  const cancel = () => {
    navigate("/assign-master");
  };
  const [accesslocation, setaccesslocation] = useState("");
  const [type, settype] = useState("");
  const [departmenttype, setdepartmenttype] = useState(null);
  const [tasktype, settasktype] = useState(null);
  const [document, setdocument] = useState("");
  const [dep, setdep] = useState(null);
  const [loc, setloc] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [emprole, setemprole] = useState(null);
  const [empname, setempname] = useState(null);
  const [file, setfile] = useState("");
  const [admininfo, setAdminInfo] = useState(null);

  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const getalldtype = async () => {
    const response = await GetallDepartmentType();

    setdepartmenttype(response.data);
  };
  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  function handleSelectGroups(selectedGroup) {
    setSelectedGroup(selectedGroup);
  }

  function handleSelectGroups2(selectedGroup2) {
    setSelectedGroup2(selectedGroup2);
  }

  function handleSelectNoSortingGroup(selectedNoSortingGroup) {
    setSelectedNoSortingGroup(selectedNoSortingGroup);
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
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

    // console.log(">>>", uniqueDepartmentTypes.length);

    //  console.log(selectedMulti);
  }

  function handleMulti1(selectedMulti1) {
    // console.log("hello");
    // console.log(selectedMulti1);
    setselectedMulti1(selectedMulti1);

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
    setselectedMulti4(selectedMulti4);
  }
  function handleMulti2(selectedMulti2) {
    // console.log("vaishal", selectedMulti2);
    setselectedMulti2(selectedMulti2);
  }

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3);
    let selectedempNames = [];
    for (let i = 0; i < selectedMulti3.length; i++) {
      const selectId = selectedMulti3[i].neww_id;

      for (let j = 0; j < empname.length; j++) {
        const EmployeeName = empname[j];

        if (EmployeeName && EmployeeName.id === selectId) {
          selectedempNames.push({
            label: EmployeeName.label,
            id: EmployeeName.id,
            value: EmployeeName.label,
            newid: EmployeeName.newid,
          });
        }
      }
    }
    // setuniqueEmployeeNames(selectedempNames);
    // console.log(selectedempNames);
  }
  const gettingtasktype = async (id) => {
    const res = await GetSpecificTaskByDepartmentGroup(id);
    console.log(">>>>>>>>>>>> vaishal", res);
    settasktype(res.data);
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
  const handlefile = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };
  const handleTaskChange = async (e) => {
    let taskid = e.target.value;
    // console.log(">>>>", taskid);
    const res = await GetAddTaskById(taskid);
    // console.log(">>>>", res.data);
    setaccesslocation(res.data.accessLocation);

    settype(res.data.taskType);

    // console.log(">>>>>>>>>>>>>", res.data.accessLocation);
  };
  const handleDepType = (e) => {
    let deptypeid = e.target.value;
    // console.log(">>>>>>>>>>>>>>>>>>>", deptypeid);
    gettingtasktype(deptypeid);
  };
  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
      }));
    setdep(names);
  };
  //documentname,documentdepartmenttype,tasktypes,documenttype,formlink,documentlink,uploaddocument,documentdescription,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive
  const addassigntask = async (
    documentname,
    documentdepartmenttype,
    tasktypes,
    documenttype,
    formlink,
    documentlink,
    uploaddocument,
    documentdescription,
    locationSchema,
    departmentGroup,
    departmentType,
    employeeRole,
    employeeName,
    isActive,
    assignedby
  ) => {
    const res = await addAssignTaskmaster(
      documentname,
      documentdepartmenttype,
      tasktypes,
      documenttype,
      formlink,
      documentlink,
      uploaddocument,
      documentdescription,
      locationSchema,
      departmentGroup,
      departmentType,
      employeeRole,
      employeeName,
      isActive,
      assignedby
    );
  };
  const addassigntask1 = async (
    values,
    values1,
    values2,
    values3,
    values4,
    values5,
    values6
  ) => {
    const res = await addAssignTaskmaster(
      values,
      values1,
      values2,
      null,
      values3,
      null,
      null,
      values4,
      null,
      null,
      null,
      null,
      null,
      values5,
      values6
    );
  };
  const handle1 = (e) => {
    let deptypeid = e.target.value;
    // console.log(deptypeid);
    setdocument(deptypeid);
  };
  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
      }));
    setloc(names);
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
    // console.log(names);
  };
  const getempname = async () => {
    const response = await GetallEmployeeName();

    console.log(">>>>>", response);
    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        // id: item.employeeRole._id,
        newid: item._id,
      }));
    setempname(names);
    setuniqueEmployeeNames(names);
  };
  useEffect(() => {
    // console.log(accesslocation);
  }, [accesslocation]);
  useEffect(() => {
    // console.log("type>>>>>>", type);
  }, [type]);

  useEffect(() => {
    // console.log("document>>>>>>", document);
  }, [document]);
  useEffect(() => {
    getalldtype();
  }, []);
  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
  }, []);
  // console.log(localStorage.getItem("Admin Name"))
  const hii_id = localStorage.getItem("authToken");
  const getloggedinAdmin = async (token) => {
    const res = await getLoggedInAdmin(token);
    console.log("This is response", res);
    if (res.success) {
      setAdminInfo(res);
    } else {
      // console.log(res.msg);
    }
  };

  useEffect(() => {
    getloggedinAdmin(hii_id);
  }, []);
  console.log(admininfo);

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Assign Tool</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/assign-master">
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
                  documentname: "",
                  documentdepartmenttype: "",
                  tasktypes: "",
                  formlink: "",
                  documenttype: "",
                  uploaddocument: "",
                  documentlink: "",
                  documentdescription: "",
                  locationSchema: [],
                  departmentGroup: [],
                  departmentType: [],
                  employeeRole: [],
                  employeeName: [],
                  isActive: true,
                  assignedby: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  let loc1 = [];
                  let dg1 = [];
                  let dt = [];
                  let er = [];
                  let en = [];
                  if (selectedMulti2) {
                    selectedMulti2.map((type) => {
                      loc1.push(type.id);
                    });
                  }

                  if (selectedMulti) {
                    selectedMulti.map((type) => {
                      dg1.push(type.id);
                    });
                  }

                  if (selectedMulti1) {
                    selectedMulti1.map((type) => {
                      dt.push(type.new_Id);
                    });
                  }

                  if (selectedMulti3) {
                    selectedMulti3.map((type) => {
                      er.push(type.neww_id);
                    });
                  }
                  if (selectedMulti4) {
                    selectedMulti4.map((type) => {
                      en.push(type.newid);
                    });
                  }
                  // console.log("en>>>>", en);
                  console.log("This is tj=he id goinf", admininfo._id);
                  const admin = localStorage.getItem("Admin ID");
                  console.log(admin, "Admin Name");
                  values.assignedby = admin;

                  values.uploaddocument = file;

                  if (document === "File Upload" && !file) {
                    toast.error("Please Upload a document");
                    return;
                  }

                  const res = addassigntask(
                    values.documentname,
                    values.documentdepartmenttype,
                    values.tasktypes,
                    values.documenttype,
                    values.formlink,
                    values.documentlink,
                    values.uploaddocument,
                    values.documentdescription,
                    loc1,
                    dg1,
                    dt,
                    er,
                    en,
                    values.isActive,
                    values.assignedby
                  );
                  // if(!values.uploaddocument){
                  //   toast.error("Please Upload an Image");
                  //   return ;
                  // }
                  if (res) {
                    toast.success("Task Assigned successfully!");
                    // setTimeout(() => {
                    //   window.location.reload("/assign-master")
                    // }, 3000);
                    setTimeout(() => {
                      GetallAssignTask();
                      GetallAssignTask();
                      navigate("/assign-master");
                    }, 3000);
                  }
                  //               if (values.uploaddocument !== "" ) {
                  //     if (res) {
                  //         GetallAssignTask();
                  //         navigate('/assign-master');
                  //     }
                  // } else {
                  //     toast.error("Please Upload an Image");
                  // }
                  // resetForm();
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
                      <Form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Assigns Tool Details</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Row>
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="document-name-input"
                                    >
                                      Document Name
                                    </label>
                                    <div className="">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="document-name-input"
                                        name="documentname"
                                        aria-label="orders"
                                        aria-describedby="document-name-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.documentname}
                                      />
                                    </div>
                                    <ErrorMessage
                                      name="documentname"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </Col>
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="document-department-type-input"
                                    >
                                      Document Department Types
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="documentdepartmenttype"
                                        onBlur={handleBlur}
                                        value={values.documentdepartmenttype}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleDepType(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {departmenttype &&
                                        departmenttype.length > 0 ? (
                                          departmenttype
                                            .filter((item) => item.isActive)
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
                                        name="documentdepartmenttype"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                    <p className="error text-danger">
                                      {errors.documentdepartmenttype &&
                                        touched.documentdepartmenttype &&
                                        errors.documentdepartmenttype}
                                    </p>
                                  </Col>
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="tool-name-input"
                                    >
                                      Tool Name
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="tasktypes"
                                        onBlur={handleBlur}
                                        value={values.tasktypes}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleTaskChange(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {tasktype && tasktype.length > 0 ? (
                                          tasktype
                                            .filter((item) => item.isActive)
                                            .map((type) => (
                                              <option
                                                key={type._id}
                                                value={type._id}
                                              >
                                                {type.taskName}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No Tools available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="tasktypes"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                    <p className="error text-danger">
                                      {errors.tasktypes &&
                                        touched.tasktypes &&
                                        errors.tasktypes}
                                    </p>
                                  </Col>
                                </Row>
                                {type === "Form" && (
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="product-orders-input"
                                    >
                                      Form Link
                                    </label>
                                    <div className="">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        name="formlink"
                                        aria-label="orders"
                                        ar
                                        ia-describedby="product-orders-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.formlink}
                                      />
                                    </div>

                                    <p className="error text-danger"></p>
                                  </Col>
                                )}

                                {type === "Data" && (
                                  <>
                                    <Col sm={4}>
                                      <label
                                        className="form-label mt-3"
                                        htmlFor="product-orders-input"
                                      >
                                        Document Types
                                      </label>
                                      <div className="">
                                        <select
                                          className="form-select"
                                          name="documenttype"
                                          onBlur={handleBlur}
                                          value={values.documenttype}
                                          onChange={(e) => {
                                            handleChange(e);
                                            handle1(e);
                                          }}
                                        >
                                          <option value="">--select--</option>
                                          <option value="File Upload">
                                            File Upload
                                          </option>
                                          <option value="Link">Link</option>
                                        </select>
                                      </div>
                                      <p className="error text-danger">
                                        {errors.checkupType &&
                                          touched.checkupType &&
                                          errors.checkupType}
                                      </p>
                                    </Col>
                                    {document === "File Upload" && (
                                      <Col sm={4}>
                                        <div>
                                          <Label
                                            htmlFor="formFile"
                                            className="form-label"
                                          >
                                            File Upload
                                          </Label>
                                          <Input
                                            className="form-control"
                                            type="file"
                                            id="uploaddocument"
                                            name="uploaddocument"
                                            onChange={handlefile}
                                          />
                                        </div>
                                      </Col>
                                    )}

                                    {document === "Link" && (
                                      <Col sm={4}>
                                        <label
                                          className="form-label mt-3"
                                          htmlFor="product-orders-input"
                                        >
                                          Document Link
                                        </label>
                                        <div className="">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="product-orders-input"
                                            name="documentlink"
                                            aria-label="orders"
                                            ar
                                            ia-describedby="product-orders-addon"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.documentlink}
                                          />
                                        </div>

                                        <p className="error text-danger">
                                          {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
                                        </p>
                                      </Col>
                                    )}
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
                                        <label className="me-2">
                                          Is Active
                                        </label>
                                      </div>
                                    </Col>

                                    <Row
                                      style={{
                                        position: "relative",
                                        bottom: "-195px",
                                        zIndex: 99999999999999,
                                      }}
                                    >
                                      {accesslocation !== "Yes" && (
                                        <div className="text-end mb-3 pe-3">
                                          <button
                                            className="btn btn-success w-sm"
                                            type="submit"
                                          >
                                            Submit
                                          </button>
                                          <button
                                            className="btn btn-danger w-sm"
                                            onClick={cancel}
                                            style={{ marginLeft: "5px" }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      )}
                                    </Row>
                                  </>
                                )}
                                <Row>
                                  <Col sm={12}>
                                    <div>
                                      <Label
                                        htmlFor="exampleFormControlTextarea5"
                                        className="form-label"
                                      >
                                        Document Description
                                      </Label>
                                      <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea5"
                                        rows="4"
                                        name="documentdescription"
                                        value={values.documentdescription}
                                        onChange={handleChange}
                                        style={{ marginBottom: "60px" }}
                                      ></textarea>
                                      <ErrorMessage
                                        name="documentdescription"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                {type === "Form" && (
                                  <>
                                    <Row>
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
                                          <label className="me-2">
                                            Is Active
                                          </label>
                                        </div>
                                      </Col>
                                    </Row>

                                    {accesslocation !== "Yes" && (
                                      <div
                                        className="text-end mb-3 me-3 hstack gap-2 justify-content-end"
                                        style={{
                                          paddingRight: "20px",
                                          paddingTop: "40px",
                                          position: "relative",
                                        }}
                                      >
                                        <button
                                          className="btn btn-success w-sm"
                                          type="submit"
                                          // style={{ position: 'absolute', right: '0', top: '100px' }}

                                          onClick={() => {
                                            addassigntask1(
                                              values.documentname,
                                              values.documentdepartmenttype,
                                              values.tasktypes,
                                              values.formlink,
                                              values.documentdescription,
                                              values.isActive
                                            );
                                          }}
                                        >
                                          Submit
                                        </button>
                                        <button
                                          className="btn btn-danger w-sm"
                                          onClick={cancel}
                                          style={{ marginLeft: "5px" }}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </Row>
                            </div>
                          </div>
                        </Card>

                        {accesslocation === "Yes" && (
                          <Card>
                            <CardHeader>
                              <Row className="g-1 m-1">
                                <Col className="col-sm">
                                  <div className="d-flex justify-content-sm-between">
                                    <h2 className="card-title mb-0 justify-content-sm-start">
                                      <strong> Tool Access</strong>
                                    </h2>
                                  </div>
                                </Col>
                              </Row>
                            </CardHeader>
                            <div className="card-body ">
                              <div className="live-preview">
                                <Row className="align-items-center g-3">
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Employee Name
                                      </Label>
                                      <Select
                                        value={selectedMulti4}
                                        isMulti={true}
                                        onChange={(selectedOptions) => {
                                          handleMulti4(selectedOptions);
                                        }}
                                        options={uniqueEmployeeNames}
                                      />
                                    </div>
                                  </Col>

                                  <Row>
                                    <div className="text-end mb-3 ms-3">
                                      <button
                                        className="btn btn-success w-sm"
                                        type="submit"
                                        style={{ marginLeft: "200px" }}
                                      >
                                        Submit
                                      </button>
                                      <button
                                        className="btn btn-danger w-sm"
                                        onClick={cancel}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Row>
                                </Row>
                              </div>
                            </div>
                          </Card>
                        )}
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

export default AssignTask;
