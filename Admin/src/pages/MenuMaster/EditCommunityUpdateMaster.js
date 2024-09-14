import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];
const EditCommunityUpdateMaster = () => {
  // dasfnsdfh
  const [previewDocument, setPreviewDocument] = useState(null);
  const handleFilePreview = (docName) => {
    // Set the document to be previewed
    setPreviewDocument(docName);
  };
  const navigate = useNavigate();
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
  useEffect(() => {
    gettingcommunitymastername(id);
  }, []);
  const {
    GetCommunityNameIdForEditing,
    setEditCommunityMasterName,
    getReqCommDetails,
    GetallLocation,
    GetallDepartmentGroup,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
  } = useContext(SignContext);
  const { id } = useParams();
  const cancel = () => {
    navigate("/community-update");
  };
  const [typeid1, settypeid1] = useState({
    name: " ",
    uploadimage: "",
    message: "",
    locationSchema: [],
    departmentGroup: [],
    departmentType: [],
    employeeRole: [],
    employeeName: [],
    isActive: " ",
  });
  const getreqcommdetails = async () => {
    try {
      const res = await getReqCommDetails();
      console.log("Response:", res);
      console.log("image", res.uploadimage); // Corrected line
      setcommunityrequireddetails(res.data);
      return res;
    } catch (error) {
      console.error("Error fetching community details", error.message);
      return null;
    }
  };

  const gettingcommunitymastername = async (id) => {
    try {
      const res = await GetCommunityNameIdForEditing(id);
      let loc = [];
      let dg = [];
      let dt = [];
      let er = [];
      let en = [];
      for (let i = 0; i < res.data.locationSchema.length; i++) {
        loc.push({
          value: res.data.locationSchema[i]._id,
          label: res.data.locationSchema[i].name,
        });
      }
      for (let i = 0; i < res.data.departmentGroup.length; i++) {
        dg.push({
          value: res.data.departmentGroup[i]._id,
          label: res.data.departmentGroup[i].name,
        });
      }
      for (let i = 0; i < res.data.departmentType.length; i++) {
        dt.push({
          value: res.data.departmentType[i]._id,
          label: res.data.departmentType[i].name,
        });
      }
      for (let i = 0; i < res.data.employeeRole.length; i++) {
        er.push({
          value: res.data.employeeRole[i]._id,
          label: res.data.employeeRole[i].EmployeeRole,
        });
      }
      for (let i = 0; i < res.data.employeeName.length; i++) {
        en.push({
          value: res.data.employeeName[i]._id,
          label: res.data.employeeName[i].name,
        });
      }

      // console.log(res.data.locationSchema);
      settypeid1({
        name: res.data.name,
        uploadimage: res.data.uploadimage,
        message: res.data.message,
        locationSchema: loc,
        departmentGroup: dg,
        departmentType: dt,
        employeeRole: er,
        employeeName: en,
        isActive: res.data.isActive,
      });

      console.log("hiasdasdasdiass", res.data.uploadimage);
    } catch (error) {
      console.log("Error Fetching Community Details", error.message);
    }
  };
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [selectedMulti4, setselectedMulti4] = useState(null);
  const [dep, setdep] = useState([]);
  const [loc, setloc] = useState([]);
  const [dtype, setdtype] = useState([]);
  const [emprole, setemprole] = useState([]);
  const [empname, setempname] = useState([]);
  const [image, setImage] = useState(null);
  const [locationSchema, setlocationSchema] = useState(null);
  // const [addloc,setaddloc]=useState([]);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);

  useEffect(() => {}, [uniqueDepartmentTypes]);
  useEffect(() => {}, [uniqueEmployeeRoles]);
  useEffect(() => {}, [uniqueEmployeeNames]);

  /*const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };  */
  const handleImageChange = (e) => {
    //setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
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

  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setdep(names);
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

  const getemprole = async () => {
    const response = await GetallEmployeeRole();
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.EmployeeRole,
      id: item.departmentType._id,
      new_empId: item._id,
    }));
    setemprole(names);
  };
  const getempname = async () => {
    const response = await GetallEmployeeName();
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.employeeRole._id,
      main_id: item._id,
    }));
    setempname(names);
  };

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

    //  console.log(selectedMulti);
  }

  function handleMulti1(selectedMulti1) {
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
  //  const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setProfilePhoto(file);
  // };
  function handleMulti4(selectedMulti4) {
    setselectedMulti4(selectedMulti4);
  }
  function handleMulti2(selectedMulti2) {
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
            main_Id: EmployeeName.main_id,
          });
        }
      }
    }
    setuniqueEmployeeNames(selectedempNames);
  }
  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
  }, []);

  useEffect(() => {
    // console.log(dep);
  }, [dep]);
  useEffect(() => {
    // console.log("departmenttype>>", dtype);
  }, [dtype]);
  useEffect(() => {
    // console.log(emprole);
  }, [emprole]);
  useEffect(() => {
    // console.log(emprole);
  }, [empname]);

  const [selectedlocation, setlocationValues] = useState([]);

  // useEffect to set default values when component mounts
  useEffect(() => {
    const defaultlocationvalues = typeid1.locationSchema.map((loc) => ({
      value: loc.value,
      label: loc.label,
      isDisabled: true,
    }));
    setlocationValues(defaultlocationvalues);
  }, [typeid1.locationSchema]);

  // console.log("This is the location value",locationSchema);

  // console.log("Testing",typeid1.departmentGroup.name);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Community Update Master"
            parent="OPA"
            child="Edit-CommunityUpdateMaster"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={validationSchema}
                initialValues={typeid1}
                onSubmit={(values, { resetForm }) => {
                  typeid1.uploadimage = image;
                  const response = setEditCommunityMasterName(
                    id,
                    typeid1.name,
                    typeid1.message,
                    typeid1.uploadimage,
                    typeid1.locationSchema,
                    typeid1.departmentGroup,
                    typeid1.departmentType,
                    typeid1.employeeRole,
                    typeid1.employeeName,
                    typeid1.isActive
                  );
                  // console.log("Locationhdshsdhdh ",typeid1.locationSchema.value);
                  if (response) {
                    toast.success(
                      "Community Update Details Edited successfully!"
                    );
                    setTimeout(() => {
                      getreqcommdetails();
                      getreqcommdetails();
                      navigate("/community-update");
                    }, 2000);
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
                        noValidate
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>
                                      Edit Community Update Details
                                    </strong>
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
                                      // onChange={handleChange}
                                      onChange={(e) =>
                                        settypeid1((prev) => ({
                                          ...prev,
                                          name: e.target.value,
                                        }))
                                      }
                                      onBlur={handleBlur}
                                      value={typeid1.name}
                                    />
                                    <p className="error text-danger">
                                      {errors.gallaryCategoryTitle &&
                                        touched.gallaryCategoryTitle &&
                                        errors.gallaryCategoryTitle}
                                    </p>
                                  </div>

                                  <p className="error text-danger">
                                    {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
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
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  {typeid1.uploadimage && (
                                    <div className="mt-3">
                                      <img
                                        src={`${process.env.REACT_APP_BASE_URL}/${typeid1.uploadimage}`}
                                        alt="Uploaded Profile Photo"
                                        style={{
                                          maxWidth: "50%",
                                          maxHeight: "100px",
                                        }}
                                      />
                                    </div>
                                  )}
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
                                      value={typeid1.message}
                                      onChange={(e) =>
                                        settypeid1((prev) => ({
                                          ...prev,
                                          message: e.target.value,
                                        }))
                                      }
                                    ></textarea>
                                  </div>
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
                                      className="form-label text-muted"
                                    >
                                      Location Schema
                                    </Label>
                                    <Select
                                      isMulti={true}
                                      isDisabled={true}
                                      options={typeid1.locationSchema.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true,
                                          // Disable each option if in edit mode
                                        })
                                      )}
                                      value={typeid1.locationSchema.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        })
                                      )}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Type of Functions{" "}
                                    </Label>
                                    <Select
                                      isMulti={true}
                                      isDisabled={true}
                                      options={typeid1.departmentGroup.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true,
                                          // Disable each option if in edit mode
                                        })
                                      )}
                                      value={typeid1.departmentGroup.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        })
                                      )}
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
                                      isMulti={true}
                                      isDisabled={true}
                                      options={typeid1.departmentType.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true,
                                          // Disable each option if in edit mode
                                        })
                                      )}
                                      value={typeid1.departmentType.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        })
                                      )}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Employee Role
                                    </Label>
                                    <Select
                                      isMulti={true}
                                      isDisabled={true}
                                      options={typeid1.employeeRole.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true,
                                          // Disable each option if in edit mode
                                        })
                                      )}
                                      value={typeid1.employeeRole.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        })
                                      )}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Employee Name
                                    </Label>
                                    <Select
                                      isMulti={true}
                                      isDisabled={true}
                                      options={typeid1.employeeName.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true,
                                          // Disable each option if in edit mode
                                        })
                                      )}
                                      value={typeid1.employeeName.map(
                                        (loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        })
                                      )}
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
                              className="btn btn-danger w-sm "
                              style={{ marginLeft: "13px" }}
                              onClick={cancel}
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

export default EditCommunityUpdateMaster;
