import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteTemplateModal from "../../common/DeleteTemplate";
import "../MenuMaster/1.css";
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const EditRolesResponsibility = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  const {
    GetallDepartmentGroup,
    GetallLocation,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
    getReqCommDetails,
    setEditRolesResponsibilityValues,
    ediRolesResponsibility,
    GetRolesResponsibilityByIdForEditing,
    GetallTemplates,
  } = useContext(SignContext);
  const [alltemp, setalltemp] = useState([]);
  const [subtemplate, setsubtemplate] = useState([]);
  const [email1, setemail1] = useState([]);
  const [pass, setpass] = useState([]);
  const [newactive, setnewactive] = useState(false);
  useEffect(() => {
    get();
    alltemplates();
  }, []);
  const get = async () => {
    const res = await GetallDepartmentGroup();
    console.log(res.data);
  };
  const alltemplates = async () => {
    const res = await GetallTemplates();
    setalltemp(res.data);
    console.log("HIii", res.data);
  };
  const [employee, setemployee] = useState({
    locationSchema: "",
    departmentGroup: "",
    departmentType: "",
    employeeRole: "",
    employeeName: "",
    email: "",
    password: "",
    isActive: false,
  });

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedMulti, setselectedMulti] = useState(null);
  const [rolesResponsibilities, setRolesResponsibilities] = useState([]);
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
  const [uniquemenu, setuniquemenu] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const [finalemployeename, setemployeefinalname] = useState("");
  const [empval, setempval] = useState("");
  const [template, settemplate] = useState("");
  const getRolesResponsibilitiesData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`
      );

      setRolesResponsibilities(res.rolesresponsibilities);
      console.log(res);
    } catch (error) {
      // console.error("Error fetching roles and responsibilities:", error);
    }
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
  useEffect(() => {
    console.log(uniqueDepartmentTypes);
  }, [uniqueDepartmentTypes]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeRoles]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeNames]);
  useEffect(() => {
    getRolesResponsibilitiesData();
  }, []);

  const getEdit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilitybyid/${id}`
      );
      const editData = response.data;
      console.log("Edit Data:", editData);
      console.log("editData.isActive:", editData.isActive);
      setemployee({
        locationSchema: editData.locationSchema._id,
        departmentGroup: editData.departmentGroup._id,
        departmentType: editData.departmentType._id,
        employeeRole: editData.employeeRole._id,
        employeeName: editData.employeeName._id,
        email: editData.email,
        password: editData.password,
        isActive: editData.isActive,
        tasktemplate: editData.tasktemplate._id,
      });
      setemployeefinalname(editData.employeeName.name);
      setempval(editData.employeeName._id);
      settemplate(editData.tasktemplate.templateName);

      //  setpassword(editData);
      // Set form data based on edit data
      console.log("employee.isActive:", employee.isActive);
    } catch (error) {
      console.error("Error fetching edit data:", error);
    }
  };
  useEffect(() => {
    console.log("employee.isActive:1234567", employee.isActive);
  }, [employee]);

  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data.map((item) => ({
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

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
      isActive: item.isActive,
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

  // function handleMulti4(selectedMulti4) {
  //   //  setselectedMulti4(selectedMulti4);
  //   setselectedMulti4(
  //     selectedMulti4.length > 0
  //       ? [selectedMulti4[selectedMulti4.length - 1]]
  //       : null
  //   );

  //   console.log("hii", selectedMulti4);
  // }
  function handleMulti2(selectedMulti2) {
    // setselectedMulti2(selectedMulti2);
    // setlocationSchema(selectedMulti2);
    setselectedMulti2(
      selectedMulti2.length > 0
        ? [selectedMulti2[selectedMulti2.length - 1]]
        : null
    );
  }
  const abc = async (
    id,
    locationSchema,
    departmentGroup,
    departmentType,
    employeeRole,
    employeeName,
    email,
    password,
    isActive
  ) => {
    console.log("hello");
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/ediRolesResponsibility/${id}`,
      {
        locationSchema,
        departmentGroup,
        departmentType,
        employeeRole,
        employeeName,
        email,
        password,
        isActive,
      }
    );
  };
  function handleMulti3(selectedMulti3) {
    // setselectedMulti3(selectedMulti3);
    setselectedMulti3(
      selectedMulti3.length > 0
        ? [selectedMulti3[selectedMulti3.length - 1]]
        : null
    );
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
    // setuniqueEmployeeNames(selectedempNames);
    console.log(selectedempNames);
  }

  const handleEmployeeNameChange = (selectedOption) => {
    try {
      console.log("the id is", selectedOption.value);
      setemployeefinalname(selectedOption.label);
      setempval(selectedOption.value);
      setemployee({
        employeeName: selectedOption.value,
      });
      console.log("object", employee.isActive);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleEmployeeNameChange();
  }, []);
  const gettingemailandpassword = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenamebyid/${empval}`
    );
    console.log("nnnnnnnnn", res);
    setemail1(res.data.email);
    setpass(res.data.password);
    setemployee((prev) => ({
      ...prev,
      email: res.data.email,
      password: res.data.password,
    }));
  };
  useEffect(() => {
    gettingemailandpassword(empval);
  }, [empval]);

  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
  }, []);

  useEffect(() => {
    getEdit();
  }, []);
  const cancel = () => {
    navigate("/roles-responsibilty");
  };
  useEffect(() => {}, [dep]);
  useEffect(() => {}, [dtype]);
  useEffect(() => {}, [emprole]);
  useEffect(() => {}, [empname]);
  useEffect(() => {}, [loc]);

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

  const handleRemoveTemplate = async (templateId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/deleteTemplateTask/${templateId}`
      );
      if (response.status === 200) {
        alert("Template successfully deleted");
        // Here you can add any additional logic needed after successful deletion
      }
    } catch (error) {
      alert("Error deleting template:", error);
    }
  };

  const handleDeleteClick = (templateId) => {
    if (window.confirm("Are you sure you want to remove the template?")) {
      handleRemoveTemplate(templateId);
    }
  };
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Roles & Responsibility"
            parent="OPA"
            child="Edit-Roles & Responsibility"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={validationSchema}
                initialValues={employee}
                onSubmit={({ resetForm }) => {
                  console.log("employeename", employee.employeeName);
                  const response = abc(
                    id,
                    employee.locationSchema,
                    employee.departmentGroup,
                    employee.departmentType,
                    employee.employeeRole,
                    empval,
                    employee.email,
                    employee.password,
                    employee.isActive
                  );
                  // setselectedMulti2(null);
                  // setselectedMulti(null);
                  // setselectedMulti1(null);
                  // setselectedMulti3(null);
                  // setselectedMulti4(null);
                  // setUniqueDepartmentTypes([]);
                  // setUniqueEmployeeRoles([]);
                  // setuniqueEmployeeNames([]);
                  // addCheckupDetails(values);
                  // console.log(">>>", values.name)
                  // console.log("Nioicc", values.locationSchema)
                  let loc1 = [];
                  let dg1 = [];
                  let dt = [];
                  let er = [];
                  let en = [];
                  console.log(">>>", selectedMulti2);

                  // selectedMulti2.map((type) => {
                  //     loc1.push(type.id);
                  // });

                  // selectedMulti.map((type) => {
                  //     dg1.push(type.id);
                  // });
                  // selectedMulti1.map((type) => {
                  //     dt.push(type.new_Id);
                  // });
                  // selectedMulti3.map((type) => {
                  //     er.push(type.neww_id);
                  // });
                  // selectedMulti4.map((type) => {
                  //     en.push(type.main_Id);

                  // });
                  console.log("loc1", loc1);
                  console.log("dt1", dt);
                  //  console.log("loc1",loc1);
                  console.log("dg1", dg1);
                  console.log("en", en);
                  // const response = setEditRolesResponsibilityValues(employee.locationSchema, employee.departmentGroup, employee.departmentType, employee.employeeRole, employee.employeeName, employee.email, employee.password, employee.isActive, employee.Dashboard, employee.MenuMaster, employee.Roles, employee.AdminUser, employee.CommunityUpdateMaster, employee.LocationMaster, employee.DepartmentGroup, employee.DepartmentType, employee.EmployeeRole, employee.Employeemaster, employee.AddTask, employee.AssignMaster, employee.CMS);
                  console.log("asd", loc1);
                  console.log("Newww", response);
                  if (response) {
                    toast.success(
                      "Roles & Responsibility Edited successfully!"
                    );
                    setTimeout(() => {
                      navigate("/roles-responsibilty");
                    }, 3000);
                  }
                  // if (response) {
                  //     toast.success('Entry added successfully!');
                  // } else {
                  //     toast.error('Failed to add entry');
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
                                    <strong>Roles & Responsibility</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col lg={4} className="mb-0">
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label mt-3"
                                    >
                                      Employee Name
                                    </Label>
                                    <Select
                                      value={empval}
                                      placeholder={finalemployeename}
                                      onChange={handleEmployeeNameChange}
                                      options={empname}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4} className="mb-0">
                                  <div className="mb-3">
                                    <Label
                                      className="form-label mt-3"
                                      htmlFor="product-orders-input"
                                    >
                                      Email
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="email"
                                      aria-label="orders"
                                      disabled
                                      onChange={(e) =>
                                        setemployee((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                        }))
                                      }
                                      onBlur={handleBlur}
                                      value={employee.email}
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </Col>
                                <Col lg={4} className="mb-0">
                                  <div className="mb-3">
                                    <Label
                                      className="form-label mt-3"
                                      htmlFor="product-orders-input"
                                    >
                                      Password
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="password"
                                      disabled
                                      aria-label="orders"
                                      onChange={(e) =>
                                        setemployee((prev) => ({
                                          ...prev,
                                          password: e.target.value,
                                        }))
                                      }
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

                                <Col lg={4} className="mb-0">
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      TemplateName
                                    </Label>
                                    <Input
                                      value={template}
                                      // onChange={handleEmployeeNameChange}
                                      options={template}
                                    />
                                  </div>
                                </Col>

                                <Col sm={2} className="mt-3">
                                  <Input
                                    type="checkbox"
                                    id="isActive"
                                    label="Is Active"
                                    name="isActive"
                                    checked={employee.isActive}
                                    onChange={(e) =>
                                      setemployee((prev) => ({
                                        ...prev,
                                        isActive: e.target.checked,
                                      }))
                                    }
                                  />
                                  <label className="me-2">Is Active</label>
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
                              // onClick={handleSubmit}
                              onClick={cancel}
                              style={{ marginLeft: "3px" }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-danger w-sm"
                              onClick={() => handleDeleteClick(empval)}
                              style={{ marginLeft: "3px" }}
                            >
                              Remove Template
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

export default EditRolesResponsibility;
