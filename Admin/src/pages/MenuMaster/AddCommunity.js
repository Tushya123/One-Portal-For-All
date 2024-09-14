import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
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
import { useNavigate } from "react-router-dom";
import { ClickTrigger } from "lord-icon-element";
const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];

const AddCommunity = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Community Updates Name is required"),
    uploadimage: Yup.mixed(), // Make uploadimage optional
    message: Yup.string().required("Community Updates Message is required"),
    // locationSchema: Yup.array().min(1, "Please select at least one Location"),
    // departmentGroup: Yup.array().min(1, "Please select at least one Department Group"),
    // departmentType: Yup.array().min(1, "Please select at least one Department Type"),
    // employeeRole: Yup.array().min(1, "Please select at least one Employee Role"),
    // employeeName: Yup.array().min(1, "Please select at least one Employee Name"),
    isActive: Yup.boolean(),
  });


  const {
    GetallDepartmentGroup,
    GetallLocation,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
    addCommMaster,
    getReqCommDetails,
  } = useContext(SignContext);

  const addcommunitymaster = async (
    name,
    message,
    uploadimage,
    loc1,
    departmentgroup,
    departmenttype,
    employeerole,
    employeename,
    isActive
  ) => {
    //uploadimage=profilePhoto;

    const response = await addCommMaster(
      name,
      message,
      uploadimage,
      loc1,
      departmentgroup,
      departmenttype,
      employeerole,
      employeename,
      isActive
    );
    // console.log(">>> image is",uploadimage);
    // console.log(">>>name",name);
    //  console.log(">>>message",message);
    console.log("response isssss", response);
  };
  const getrequiredcommdetails = async () => {
    const res = await getReqCommDetails();
    return res;
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
  // const [addloc,setaddloc]=useState([]);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);

  useEffect(() => {
    console.log(uniqueDepartmentTypes);
  }, [uniqueDepartmentTypes]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeRoles]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);

  }, [uniqueEmployeeNames]);

  /*const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };  */
  const getloc = async () => {
    const response = await GetallLocation();

    console.log(">>>>", response);

    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
      }));




    const namesOptions = [
      { label: "All", value: "all" },
      ...names,
    ];
    setloc(namesOptions);
  };



  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();

    // console.log(">>> department group", response);
    const names = response.data
      .filter((item) => item.isActive)
      .map((item) => ({
        value: item._id,
        label: item.name,
        id: item._id,
      }));

    setdep(names);
  };
  const getdeptype = async () => {
    const response = await GetallDepartmentType();

    console.log("department type>>", response);
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
    setselectedMulti(selectedMulti);


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

    console.log(uniqueDepartmentTypes);

    //  console.log(selectedMulti);
  }

  function handleMulti1(selectedMulti1) {
    console.log("hello");
    console.log(selectedMulti1);
    setselectedMulti1(selectedMulti1);
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
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePhoto(file);
  };
  function handleMulti4(selectedMulti4) {
    setselectedMulti4(selectedMulti4);


    console.log("hii", selectedMulti4);
  }
  useEffect(() => {

  }, [handleMulti2])

  async function handleMulti2(selectedMulti2) {
    const isAllSelected = selectedMulti2.some(
      (option) => option.value === "all"
    );

    // If "All" is selected, ensure only "All" is selected
    if (isAllSelected) {
      setselectedMulti2([{ label: "All", value: "all" }]);
      const response = await GetallDepartmentGroup();

      const names = response.data
        .filter((item) => item.isActive)
        .map((item) => ({
          value: item._id,
          label: item.name,
          id: item._id,
        }));
      console.log("names", names)
      const selectedIds = names.map((name) => name.id); // Extract _id values

      setselectedMulti([{ label: "All", value: "all" }]) // Set selectedMulti2 with _id values
      setselectedMulti3([{ label: "All", value: "all" }])
      setselectedMulti2([{ label: "All", value: "all" }])
      setselectedMulti1([{ label: "All", value: "all" }])
      setselectedMulti4([{ label: "All", value: "all" }])
    }
    else {
      // If "All" is not selected, allow multiple selections
      setselectedMulti2(selectedMulti2);
    }
    // SetEmployee([]);

    // setselectedMulti2(selectedMulti2);
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
            main_Id: EmployeeName.main_id,
          });
        }
      }
    }


    setuniqueEmployeeNames(selectedempNames);
    console.log(selectedempNames);


  }
  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
  }, []);
  const cancel = () => {
    navigate("/community-update");
  };
  useEffect(() => {

    // console.log(dep);
  }, [dep]);
  useEffect(() => {
  }, [dtype]);
  useEffect(() => {
  }, [emprole]);

  useEffect(() => {
    // console.log(emprole);

  }, [empname]);

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Community Update</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/community-update">
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
                  name: "",
                  uploadimage: "",
                  message: "",
                  locationSchema: [],
                  departmentGroup: [],
                  departmentType: [],
                  employeeRole: [],
                  employeeName: [],
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {

                  console.log(">>>", values.name);
                  console.log("lsdanfsadkf", values.locationSchema);
                  let loc1 = [];
                  let dg1 = [];
                  let dt = [];
                  let er = [];
                  let en = [];

                  console.log(">>>", selectedMulti2);

                  selectedMulti2.map((type) => {
                    loc1.push(type.value);
                  });

                  (selectedMulti || []).map((type) => {
                    if (type && type.id) {
                      dg1.push(type.id);
                    }
                  });

                  (selectedMulti1 || []).map((type) => {
                    if (type && type.new_Id) {
                      dt.push(type.new_Id);
                    }
                  });

                  (selectedMulti3 || []).map((type) => {
                    if (type && type.neww_id) {
                      er.push(type.neww_id);
                    }
                  });

                  (selectedMulti4 || []).map((type) => {
                    if (type && type.main_Id) {
                      en.push(type.main_Id);
                    }
                  });

                  console.log("dg1", dg1);
                  console.log("en", en);
                  values.uploadimage = profilePhoto;
                  console.log("image to upload is", values.uploadimage);
                  if (!values.uploadimage) {
                    toast.error("Please upload an image");
                    return;
                    // Prevent form submission
                  }
                  const response = addcommunitymaster(
                    values.name,
                    values.message,
                    values.uploadimage,
                    loc1,
                    dg1,
                    dt,
                    er,
                    en,
                    values.isActive
                  );

                  console.log("The response is ", response);
                  console.log("his is ", values.uploadimage);

                  if (response) {
                    toast.success("Community Update Added successfully!");
                    setTimeout(() => {
                      getrequiredcommdetails();
                      getReqCommDetails();
                      navigate("/community-update");
                    }, 3000)
                  }
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
                  resetForm,
                }) => (
                  <div className="login">
                    <div className="form">
                      <form
                        onSubmit={handleSubmit}
                        enctype="multipart/form-data"
                      >
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Community Updates Details</strong>
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
                                    Community Updates Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="name"
                                      aria-label="orders"
                                      ar
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
                                    />
                                  </div>

                                  <p className="error text-danger">
                                    {errors.name && touched.name && errors.name}
                                  </p>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <Label
                                      for="profile-photo"
                                      className="form-label mt-3"
                                    >
                                      Profile Photo
                                    </Label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      id="uploadimage"
                                      name="uploadimage"
                                      accept=".jpg, .jpeg, .png"
                                      onChange={handlePhotoChange}
                                    />
                                  </div>
                                </Col>
                                <Col sm={4}></Col>
                                <Col sm={12}>
                                  <div>
                                    <Label
                                      htmlFor="exampleFormControlTextarea5"
                                      className="form-label"
                                    >
                                      Community Updates Message
                                    </Label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea5"
                                      rows="4"
                                      name="message"
                                      value={values.message}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.message &&
                                      touched.message &&
                                      errors.message}
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>
                                      Assign Community Updates Message
                                    </strong>
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
                                    // className="form-label text-muted"
                                    >
                                      Location
                                    </Label>
                                    <Select
                                      value={selectedMulti2}
                                      values={locationSchema}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti2(selectedOptions);
                                        // setFieldValue("locationSchema",selectedOptions);
                                      }}

                                      options={loc}
                                    />
                                  </div>
                                  {/* <p className="error text-danger">
                                    {errors.loc &&
                                      touched.loc &&
                                      errors.loc}
                                  </p> */}
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                    // className="form-label text-muted"
                                    >
                                      Type of Functions
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
                                  {/* <p className="error text-danger">
                                    {errors.departmentGroup &&
                                      touched.departmentGroup &&
                                      errors.departmentGroup}
                                  </p> */}
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                    // className="form-label text-muted"
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
                                  {/* <p className="error text-danger">
                                    {errors.departmentType &&
                                      touched.departmentType &&
                                      errors.departmentType}
                                  </p> */}
                                </Col>

                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                    // className="form-label text-muted"
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
                                  {/* <p className="error text-danger">
                                    {errors.employeeRole &&
                                      touched.employeeRole &&
                                      errors.employeeRole}
                                  </p> */}
                                </Col>
                                {/* <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                    // className="form-label text-muted"
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
                                  </div> */}
                                {/* <p className="error text-danger">
                                    {errors.employeeName &&
                                      touched.employeeName &&
                                      errors.employeeName}
                                  </p> */}
                                {/* </Col> */}

                                <Col sm={4}></Col>
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
                                    <label className="me-2"> Is Active</label>
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

export default AddCommunity;
