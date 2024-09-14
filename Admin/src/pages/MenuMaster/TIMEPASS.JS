import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
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
    addAssignTaskmaster
  } = useContext(SignContext);
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
    console.log(selectedMulti4)
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
          });
        }
      }
    }
    setuniqueEmployeeNames(selectedempNames);
    // console.log(selectedempNames);
  }
  const gettingtasktype = async (id) => {
    const res = await GetSpecificTaskByDepartmentGroup(id);
    //  console.log(res);
    settasktype(res.data);
  };
  const getdeptype = async () => {
    const response = await GetallDepartmentType();
    //  console.log("res>>",response);
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.departmentGroup._id,
      new_id: item._id,
    }));
    setdtype(names);
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

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setdep(names);
  };
  const addassigntask = async (values,loc1,dg1,dt,er,en) => {
    console.log(">>>>",values.documentlink);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", values,loc1,dg1,dt,er,en);
    const res=await addAssignTaskmaster(values.documentname,values.documentdepartmenttype,values.tasktypes,values.documenttype,values.formlink,values.uploaddocument,values.documentdescription,loc1,dg1,dt,er,en,values.isActive);
    console.log(">>",res);
  };
  const handle1 = (e) => {
    let deptypeid = e.target.value;
    // console.log(deptypeid);
    setdocument(deptypeid);
  };
  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setloc(names);
  };
  const getemprole = async () => {
    const response = await GetallEmployeeRole();
    const names = response.data.map((item) => ({
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
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.employeeRole._id,
    }));
    setempname(names);
    console.log(names);
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
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Company Master"
            child="Add-Company"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={{
                  documentname: "",
                  documentdepartmenttype: "",
                  tasktypes: "",
                  formlink: "",
                  documenttype: "",
                  uploaddocument: null,
                  documentlink: "",
                  documentdescription: "",
                  locationSchema: [],
                  departmentGroup: [],
                  departmentType: [],
                  employeeRole: [],
                  employeeName: [],
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  let loc1 = [];
                  let dg1 = [];
                  let dt = [];
                  let er = [];
                  let en = [];

                  selectedMulti2.map((type) => {
                    loc1.push(type.id);
                  });

                  selectedMulti.map((type) => {
                    dg1.push(type.id);
                  });
                  selectedMulti1.map((type) => {
                    dt.push(type.new_Id);
                  });
                  selectedMulti3.map((type) => {
                    er.push(type.neww_id);
                  });
                  selectedMulti4.map((type) => {
                    en.push(type.main_Id);
                  });
                  console.log("en>>>>",en)
                  addassigntask(values,loc1,dg1,dt,er,en);
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
                                    <strong>Assigns Task Details</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Document Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="documentname"
                                      aria-label="orders"
                                      ar
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.documentname}
                                    />
                                  </div>

                                  <p className="error text-danger">
                                    {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
                                  </p>
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
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
                                        departmenttype.map((type) => (
                                          <option key={type} value={type._id}>
                                            {type.name}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="" disabled>
                                          No department available
                                        </option>
                                      )}
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Task Types
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
                                        tasktype.map((type) => (
                                          <option key={type} value={type._id}>
                                            {type.taskName}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="" disabled>
                                          No task available
                                        </option>
                                      )}
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
                                </Col>
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
                                            id="formFile"
                                            name="uploaddocument"
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
                                  </>
                                )}
                                <Col sm={8}>
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
                                    ></textarea>
                                  </div>
                                </Col>
                                {/* {type === "Form" && (
                                  <div className="text-end mb-3 me-3">
                                    <button
                                      className="btn btn-success w-sm"
                                      type="submit"
                                      onSubmit={addassigntask}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                )} */}
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
                                      <strong> Task Access</strong>
                                    </h2>
                                  </div>
                                </Col>
                              </Row>
                            </CardHeader>
                            <div className="card-body">
                              <div className="live-preview">
                                <Row className="align-items-center g-3">
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Location
                                      </Label>
                                      <Select
                                        value={selectedMulti2}
                                        isMulti={true}
                                        onChange={(selectedOptions) => {
                                          handleMulti2(selectedOptions);
                                        }}
                                        options={loc}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Department Group
                                      </Label>
                                      <Select
                                        value={selectedMulti}
                                        isMulti={true}
                                        onChange={(selectedOptions) => {
                                          handleMulti(selectedOptions);
                                        }}
                                        options={dep}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Department Type
                                      </Label>
                                      <Select
                                        value={selectedMulti1}
                                        isMulti={true}
                                        onChange={(selectedOptions) => {
                                          handleMulti1(selectedOptions);
                                        }}
                                        options={uniqueDepartmentTypes}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Employee Roles
                                      </Label>
                                      <Select
                                        value={selectedMulti3}
                                        isMulti={true}
                                        onChange={(selectedOptions) => {
                                          handleMulti3(selectedOptions);
                                        }}
                                        options={uniqueEmployeeRoles}
                                      />
                                    </div>
                                  </Col>
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
                                  <Col sm={2}>
                                    <div className="mt-3">
                                      <Input
                                        type="checkbox"
                                        id="isActive"
                                        label="Is Active"
                                        name="active"
                                        checked={values.active}
                                        onChange={handleChange}
                                      />
                                      <label className="me-2">Is Active</label>
                                    </div>
                                  </Col>
                                  <div className="text-end mb-3 me-3">
                                    <button
                                      className="btn btn-success w-sm"
                                      type="submit"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </Row>
                              </div>
                            </div>
                          </Card>
                        )}
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AssignTask;
