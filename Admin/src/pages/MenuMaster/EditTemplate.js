import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../MenuMaster/1.css'
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

// const validationSchema = Yup.object().shape({
//   locationSchema: Yup.string().required("Community Updates Name is required"),
//   uploadimage: Yup.mixed(), // Make uploadimage optional
//   message: Yup.string().required("Community Updates Message is required"),
//   // locationSchema: Yup.array().min(1, "Please select at least one Location"),
//   // departmentGroup: Yup.array().min(1, "Please select at least one Department Group"),
//   // departmentType: Yup.array().min(1, "Please select at least one Department Type"),
//   // employeeRole: Yup.array().min(1, "Please select at least one Employee Role"),
//   // employeeName: Yup.array().min(1, "Please select at least one Employee Name"),
//   isActive: Yup.boolean()
// });
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const EditTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Community Updates Name is required"),
  //   uploadimage: Yup.mixed(), // Make uploadimage optional
  //   message: Yup.string().required("Community Updates Message is required"),
  //   // locationSchema: Yup.array().min(1, "Please select at least one Location"),
  //   // departmentGroup: Yup.array().min(1, "Please select at least one Department Group"),
  //   // departmentType: Yup.array().min(1, "Please select at least one Department Type"),
  //   // employeeRole: Yup.array().min(1, "Please select at least one Employee Role"),
  //   // employeeName: Yup.array().min(1, "Please select at least one Employee Name"),
  //   isActive: Yup.boolean()
  // });
  useEffect(() => {
    gettingrolesandresponsibility(id);
  }, []);

  const {
    GetallDepartmentGroup,
    GetallLocation,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
    getReqCommDetails,
    setEditRolesResponsibilityValues,
    GetRolesResponsibilityByIdForEditing,
  } = useContext(SignContext);

  // const editrolesandresponsibility = async (locationSchema, departmentGroup, departmentType, employeeRole, employeeName, email, password, isActive, Dashboard, MenuMaster, AdminUser, CommunityUpdateMaster, LocationMaster, DepartmentGroup, DepartmentType, EmployeeRole, Employeemaster, AddTask, AssignMaster, CMS) => {

  //     const response = await setEditRolesResponsibilityValues(locationSchema, departmentGroup, departmentType, employeeRole, employeeName, email, password, isActive, Dashboard, MenuMaster, AdminUser, CommunityUpdateMaster, LocationMaster, DepartmentGroup, DepartmentType, EmployeeRole, Employeemaster, AddTask, AssignMaster, CMS);
  //     console.log("response123", response);

  // }
//   useEffect(() => {
//     get();
//   });
//   const get = async () => {
//     const res = await GetallDepartmentGroup();
//     console.log(res.data);
//   };
  const [employee, setemployee] = useState({
    TemplateName:"",
    isActive:"",
    Dashboard:"",
    MenuMaster:"",
    AdminUser:"",
    CommunityUpdateMaster:"",
    LocationMaster:"",
    DepartmentGroup:"",
    DepartmentType:"",
    EmployeeRole:"",
    Employeemaster:"",
    AddTask:"",
    AssignMaster:"",
    CMS:""
  });


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

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const getRolesResponsibilitiesData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/template/getTemplates`)

      setRolesResponsibilities(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching roles and responsibilities:", error);
    }
  };

 
  useEffect(()=>{
    getRolesResponsibilitiesData();
  },[])

  const gettingrolesandresponsibility = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/template/getTemplateById/${id}`
      );

      console.log("Hiii Bosss", response.data);

      // console.log(en)

      // console.log(res.data.locationSchema);
      setemployee({
        TemplateName:response.data.TemplateName,
    isActive:response.data.isActive,
    Dashboard:response.data.Dashboard,
    MenuMaster:response.data.MenuMaster,
    AdminUser:response.data.AdminUser,
    CommunityUpdateMaster:response.data.CommunityUpdateMaster,
    LocationMaster:response.data.LocationMaster,
    DepartmentGroup:response.data.DepartmentGroup,
    DepartmentType:response.data.DepartmentType,
    EmployeeRole:response.data.EmployeeRole,
    Employeemaster:response.data.Employeemaster,
    AddTask:response.data.AddTask,
    AssignMaster:response.data.AssignMaster,
    CMS:response.data.CMS
      });

      console.log("hiiasas", employee);
      // console.log("hiasdasdasdiass",locationSchema);
    } catch (error) {
      console.log("Error Fetching Community Details", error.message);
    }
  };
//   const getEdit = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilitybyid/${id}`
//       );
//       const editData = response.data;
//       console.log("Edit Data:", editData);
//       setemployee(editData);
//       setselectedMulti2([
//         {
//           value: editData.locationSchema._id,
//           label: editData.locationSchema.name,
//         },
//       ]);
//       setselectedMulti([
//         {
//           value: editData.departmentGroup._id,
//           label: editData.departmentGroup.name,
//         },
//       ]);
//       setselectedMulti1([
//         {
//           value: editData.departmentType._id,
//           label: editData.departmentType.name,
//         },
//       ]);
//       setselectedMulti3([
//         {
//           value: editData.employeeRole._id,
//           label: editData.employeeRole.EmployeeRole,
//         },
//       ]);
//       setselectedMulti4([
//         { value: editData.employeeName._id, label: editData.employeeName.name },
//       ]);

//       //  setpassword(editData);
//       // Set form data based on edit data
//       // setFormData({
//       //     locationSchema: editData.locationSchema,
//       //     departmentGroup: editData.departmentGroup,
//       //     departmentType: editData.departmentType,
//       //     employeeRole: editData.employeeRole,
//       //     employeeName: editData.employeeName,
//       //     email: editData.email,
//       //     password: editData.password,
//       //     isActive: editData.isActive,
//       //     Dashboard: editData.Dashboard,
//       //     MenuMaster: editData.MenuMaster,
//       //     AdminUser: editData.AdminUser,
//       //     CommunityUpdateMaster: editData.CommunityUpdateMaster,
//       //     LocationMaster: editData.LocationMaster,
//       //     DepartmentGroup: editData.DepartmentGroup,
//       //     DepartmentType: editData.DepartmentType,
//       //     EmployeeRole: editData.EmployeeRole,
//       //     Employeemaster: editData.Employeemaster,
//       //     AddTask: editData.AddTask,
//       //     AssignMaster: editData.AssignMaster,
//       //     CMS: editData.CMS,
//       // });

//       // Set dropdown values based on edit data
//       // setSelectedMulti2(editData.locationSchema);
//       // setSelectedMulti(editData.departmentGroup);
//       // setSelectedMulti1(editData.departmentType);
//       // setSelectedMulti3(editData.employeeRole);
//       // setSelectedMulti4(editData.employeeName);
//     } catch (error) {
//       console.error("Error fetching edit data:", error);
//     }
//   };
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>", employee);
  }, [employee]);

//   const getloc = async () => {
//     const response = await GetallLocation();

//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item._id,
//       isActive: item.isActive,
//     }));
//     console.log(names);
//     setloc(names);
//   };

//   const getdepgroup = async () => {
//     const response = await GetallDepartmentGroup();

//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item._id,
//       isActive: item.isActive,
//     }));
//     setdep(names);
//   };
//   const getdeptype = async () => {
//     const response = await GetallDepartmentType();
//     //  console.log("res>>",response);
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item.departmentGroup._id,
//       new_id: item._id,
//     }));
//     setdtype(names);
//   };

//   const getemprole = async () => {
//     const response = await GetallEmployeeRole();
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.EmployeeRole,
//       id: item.departmentType._id,
//       new_empId: item._id,
//     }));
//     setemprole(names);
//     console.log(names);
//   };
//   const getempname = async () => {
//     const response = await GetallEmployeeName();
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item.employeeRole._id,
//       main_id: item._id,
//     }));
//     setempname(names);
//     console.log(names);
//   };

//   function handleMulti(selectedMulti) {
//     // setselectedMulti(selectedMulti);
//     setselectedMulti(
//       selectedMulti.length > 0
//         ? [selectedMulti[selectedMulti.length - 1]]
//         : null
//     );

//     console.log(">>>>vaishal", selectedMulti);
//     let selectedValues = [];
//     for (let i = 0; i < selectedMulti.length; i++) {
//       const selectempId = selectedMulti[i].id;

//       for (let j = 0; j < dtype.length; j++) {
//         const departtype = dtype[j];

//         if (departtype && departtype.id === selectempId) {
//           selectedValues.push({
//             label: departtype.label,
//             id: departtype.id,
//             value: departtype.label,
//             new_Id: departtype.new_id,
//           });
//         }
//       }
//     }
//     setUniqueDepartmentTypes(selectedValues);

//     console.log("These are the department type", uniqueDepartmentTypes);
//   }

//   function handleMulti1(selectedMulti1) {
//     setselectedMulti1(
//       selectedMulti1.length > 0
//         ? [selectedMulti1[selectedMulti1.length - 1]]
//         : null
//     );
//     console.log("Hiiiiisshsh", selectedMulti1);
//     console.log("hello");
//     console.log(selectedMulti1);

//     console.log("vaishal11", selectedMulti1);
//     let selectedempValues = [];
//     for (let i = 0; i < selectedMulti1.length; i++) {
//       const selectId = selectedMulti1[i].new_Id;
//       //  console.log(selectId)

//       for (let j = 0; j < emprole.length; j++) {
//         const employeetype = emprole[j];
//         // console.log(employeetype);

//         if (employeetype && employeetype.id === selectId) {
//           selectedempValues.push({
//             label: employeetype.label,
//             id: employeetype.id,
//             value: employeetype.label,
//             neww_id: employeetype.new_empId,
//           });
//         }
//       }
//     }
//     setUniqueEmployeeRoles(selectedempValues);
//   }

//   function handleMulti4(selectedMulti4) {
//     //  setselectedMulti4(selectedMulti4);
//     setselectedMulti4(
//       selectedMulti4.length > 0
//         ? [selectedMulti4[selectedMulti4.length - 1]]
//         : null
//     );

//     console.log("hii", selectedMulti4);
//   }
//   function handleMulti2(selectedMulti2) {
//     // setselectedMulti2(selectedMulti2);
//     // setlocationSchema(selectedMulti2);
//     setselectedMulti2(
//       selectedMulti2.length > 0
//         ? [selectedMulti2[selectedMulti2.length - 1]]
//         : null
//     );
//   }
  const abc = async (
    id,
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
    console.log("hello");
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/template/updateTemplate/${id}`,
      {
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
      }
    );
  };
 

  const cancel = () => {
    navigate("/template");
  };
  useEffect(() => {}, [dep]);
  useEffect(() => {}, [dtype]);
  useEffect(() => {}, [emprole]);
  useEffect(() => {}, [empname]);
  useEffect(() => {}, [loc]);

  // const filteredLoc = loc.filter(location => location.isActive === true);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Roles&Responsibility"
            parent="OPA"
            child="Edit-Roles&Responsibility"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={validationSchema}
                initialValues={employee}
                onSubmit={({ resetForm }) => {
                  const response = abc(
                    id,
                    employee.TemplateName,
                    employee.isActive,
                    employee.Dashboard,
                    employee.MenuMaster,
                    employee.AdminUser,
                    employee.CommunityUpdateMaster,
                    employee.LocationMaster,
                    employee.DepartmentGroup,
                    employee.DepartmentType,
                    employee.EmployeeRole,
                    employee.Employeemaster,
                    employee.AddTask,
                    employee.AssignMaster,
                    employee.CMS,
                   
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
                //   let loc1 = [];
                //   let dg1 = [];
                //   let dt = [];
                //   let er = [];
                //   let en = [];
                //   console.log(">>>", selectedMulti2);

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
                //   console.log("loc1", loc1);
                //   console.log("dt1", dt);
                //   //  console.log("loc1",loc1);
                //   console.log("dg1", dg1);
                //   console.log("en", en);
                  // const response = setEditRolesResponsibilityValues(employee.locationSchema, employee.departmentGroup, employee.departmentType, employee.employeeRole, employee.employeeName, employee.email, employee.password, employee.isActive, employee.Dashboard, employee.MenuMaster, employee.Roles, employee.AdminUser, employee.CommunityUpdateMaster, employee.LocationMaster, employee.DepartmentGroup, employee.DepartmentType, employee.EmployeeRole, employee.Employeemaster, employee.AddTask, employee.AssignMaster, employee.CMS);
                //   console.log("asd", loc1);
                  console.log("Newww", response);
                  if(response){
                    // gettingrolesandresponsibility();
                    navigate("/template");
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
                                      onChange={(e) =>
                                        setemployee((prev) => ({
                                          ...prev,
                                          TemplateName: e.target.value,
                                        }))
                                      }
                                      onBlur={handleBlur}
                                      value={employee.TemplateName}
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
                                      checked={employee.isActive}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          isActive: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2">Is Active</label>
                                  </div>
                                </Col>
                                {/* <Col sm={4}></Col> */}
                                <Row></Row>
                               
                                
                                <Col sm={2}>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="Dashboard"
                                      label="Dashboard"
                                      name="Dashboard"
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          Dashboard: e.target.checked,
                                        })
                                      }
                                      checked={employee.Dashboard}
                                    />
                                    <label className="me-2 spacebetween">Dashboard</label>
                                  </div>
                                  <div className="mt-3">
                                  <label className="me-2 mainheading">SetUp</label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="MenuMaster"
                                      label="MenuMaster"
                                      name="MenuMaster"
                                      checked={employee.MenuMaster}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          MenuMaster: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">MenuMaster</label>
                                  </div>

                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="AdminUser"
                                      label="AdminUser"
                                      name="AdminUser"
                                      checked={employee.AdminUser}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          AdminUser: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">AdminUser</label>
                                  </div>
                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Master</label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="CommunityUpdateMaster"
                                      label="CommunityUpdateMaster"
                                      name="CommunityUpdateMaster"
                                      checked={employee.CommunityUpdateMaster}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          CommunityUpdateMaster:
                                            e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">
                                      CommunityMaster
                                    </label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="LocationMaster"
                                      label="LocationMaster"
                                      name="LocationMaster"
                                      checked={employee.LocationMaster}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          LocationMaster: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">
                                      LocationMaster
                                    </label>
                                  </div>

                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Department Master</label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="DepartmentGroup"
                                      label="DepartmentGroup"
                                      name="DepartmentGroup"
                                      checked={employee.DepartmentGroup}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          DepartmentGroup: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">
                                      Type of Functions
                                    </label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="DepartmentType"
                                      label="DepartmentType"
                                      name="DepartmentType"
                                      checked={employee.DepartmentType}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          DepartmentType: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">
                                      DepartmentType
                                    </label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="EmployeeRole"
                                      label="EmployeeRole"
                                      name="EmployeeRole"
                                      checked={employee.EmployeeRole}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          EmployeeRole: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">EmployeeRole</label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="Employeemaster"
                                      label="Employeemaster"
                                      name="Employeemaster"
                                      checked={employee.Employeemaster}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          Employeemaster: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">
                                      Employeemaster
                                    </label>
                                  </div>

                                  <div className="mt-3">
                                  <label className="me-2 mainheading">Task Master</label>
                                  </div>
                                  <div className="mt-3 space1 ">
                                    <Input
                                      type="checkbox"
                                      id="AddTask"
                                      label="AddTask"
                                      name="AddTask"
                                      checked={employee.AddTask}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          AddTask: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">AddTask</label>
                                  </div>
                                  <div className="mt-3 space1">
                                    <Input
                                      type="checkbox"
                                      id="AssignMaster"
                                      label="AssignMaster"
                                      name="AssignMaster"
                                      checked={employee.AssignMaster}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          AssignMaster: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">AssignMaster</label>
                                  </div>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="CMS"
                                      label="CMS"
                                      name="CMS"
                                      checked={employee.CMS}
                                      onChange={(e) =>
                                        setemployee({
                                          ...employee,
                                          CMS: e.target.checked,
                                        })
                                      }
                                    />
                                    <label className="me-2 spacebetween">CMS</label>
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
                              // onClick={handleSubmit}
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

export default EditTemplate;