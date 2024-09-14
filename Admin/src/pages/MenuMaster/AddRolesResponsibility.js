// import React, { useContext, useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
// import * as Yup from "yup";
// import UiContent from "../../Components/Common/UiContent";
// import Select from "react-select";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../MenuMaster/1.css";
// import { Link } from "react-router-dom";

// import axios from "axios";
// import DeleteModal from "../../common/DeleteModal";
// import SearchComponent from "../../common/SearchComponent";
// import {
//     Card,
//     CardHeader,
//     Col,
//     Container,
//     Input,
//     Row,
//     Label,
// } from "reactstrap";
// import BreadCrumb from "../../Components/Common/BreadCrumb";
// import { TagsInput } from "react-tag-input-component";
// import SignContext from "../../contextAPI/Context/SignContext";
// import { useNavigate } from "react-router-dom";
// import { ClickTrigger } from "lord-icon-element";

// const validationSchema = Yup.object().shape({});
// const TestRolesResponsibility = () => {
//     const navigate = useNavigate();
//     const [new_id, set_id] = useState("");
//     const [deleteModal, setDeleteModal] = useState(false);
//     const [selectedForUpdate, setselectedForUpdate] = useState(null);
//     const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
//     const [originalDepType, setOriginalDepType] = useState([]);

//     const {
//         GetallDepartmentGroup,
//         GetallLocation,
//         GetallDepartmentType,
//         GetallEmployeeRole,
//         GetallEmployeeName,
//         getReqCommDetails,
//         addRolesandResponsibility,
//     } = useContext(SignContext);
//     console.log("THisisisi", new_id)
//     // useEffect(()=>{
//     // set_id();
//     // },[new_id])
//     console.log("THe new id is:", new_id)
//     const addrolesandresponsibility = async (
//         new_id,
       
//         employeeName,
//         email,
//         password,
//         isActive,
        
//         template,

//     ) => {
//         const response = await addRolesandResponsibility(
//             new_id,
          
//             employeeName,
//             email,
//             password,
//             isActive,
           
          
//             template,

//         );
//         console.log("response123", response);
//     };

//     const [selectedMulti, setselectedMulti] = useState(null);
//     const [selectedMulti1, setselectedMulti1] = useState(null);
//     const [selectedMulti2, setselectedMulti2] = useState(null);
//     const [selectedMulti3, setselectedMulti3] = useState(null);
//     const [selectedMulti4, setselectedMulti4] = useState(null);
//     const [dep, setdep] = useState(null);
//     const [loc, setloc] = useState(null);
//     const [dtype, setdtype] = useState(null);
//     const [emprole, setemprole] = useState(null);
//     const [empname, setempname] = useState(null);
   
//     const [locationSchema, setlocationSchema] = useState(null);
//     const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

//     const [email1, setemail1] = useState([]);
//     const [pass, setpass] = useState([]);

//     const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);
//     const [subtemplate, setsubtemplate] = useState([]);
//     const [subtasktemplate, setsubtasktemplate] = useState([]);
//     const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
//     const [emailandpassword, setemailandpassword] = useState([]);
//     const [template, settemplate] = useState([]);
//     const [tasktemplate, settasktemplate] = useState([]);

//     const gettingemailandpassword = async (id) => {
//         const res = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/employeename/getemployeenamebyid/${id}`
//         );
//         console.log("nnnnnnnnn", res);
//         setemail1(res.data.email);
//         setpass(res.data.password);
//     };
//     useEffect(() => {
//         gettingemailandpassword(emailandpassword);
//     }, [emailandpassword]);

//     useEffect(() => {
//         console.log(uniqueDepartmentTypes);
//     }, [uniqueDepartmentTypes]);
//     useEffect(() => {
//         console.log(uniqueEmployeeRoles);
//     }, [uniqueEmployeeRoles]);
//     useEffect(() => {
//         console.log(uniqueEmployeeRoles);
//     }, [uniqueEmployeeNames]);

//     const getloc = async () => {
//         const response = await GetallLocation();

//         const names = response.data
//             .filter((item) => item.isActive)
//             .map((item) => ({
//                 value: item._id,
//                 label: item.name,
//                 id: item._id,
//                 isActive: item.isActive,
//             }));

//         console.log(names);
//         setloc(names);
//     };

//     const getdepgroup = async () => {
//         const response = await GetallDepartmentGroup();

//         const names = response.data
//             .filter((item) => item.isActive)
//             .map((item) => ({
//                 value: item._id,
//                 label: item.name,
//                 id: item._id,
//                 isActive: item.isActive,
//             }));

//         setdep(names);
//     };

//     const handleTemplateChange = async (e) => {
//         const id = e.target.value;
//         console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", id);

//         const res = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/template/getTemplateById/${id}`
//         );
//         // console.log(">>>>vaishal123", res.data._id);

//         setsubtemplate(res.data);
//     };

//     const handleTaskTemplateChange = async (e) => {
//         const id = e.target.value;
//         console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", id);

//         const res = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/tasktemplate/getTaskTemplateById/${id}`
//         );
//         console.log(">>>>vaishal", res.data._id);
//         set_id(res.data._id)
//         setsubtasktemplate(res.data);
//     };

//     const getdeptype = async () => {
//         const response = await GetallDepartmentType();
//         //  console.log("res>>",response);

//         const names = response.data
//             .filter((item) => item.isActive)
//             .map((item) => ({
//                 value: item._id,
//                 label: item.name,
//                 id: item.departmentGroup._id,
//                 new_id: item._id,
//             }));

//         setdtype(names);
//     };

//     const getemprole = async () => {
//         const response = await GetallEmployeeRole();

//         const names = response.data
//             .filter((item) => item.isActive)
//             .map((item) => ({
//                 value: item._id,
//                 label: item.EmployeeRole,
//                 id: item.departmentType._id,
//                 new_empId: item._id,
//             }));

//         setemprole(names);
//         console.log(names);
//     };
//     const getempname = async () => {
//         const response = await GetallEmployeeName();

//         const names = response.data.map((item) => ({
//             value: item._id,
//             label: item.name,
//             id: item.employeeRole._id,
//             main_id: item._id,
//         }));

//         setempname(names);
//         console.log(names);
//     };


//     function handleMulti(selectedMulti) {
//         // setselectedMulti(selectedMulti);
//         setselectedMulti(
//             selectedMulti.length > 0
//                 ? [selectedMulti[selectedMulti.length - 1]]
//                 : null
//         );

//         console.log(">>>>vaishal", selectedMulti);
//         let selectedValues = [];
//         for (let i = 0; i < selectedMulti.length; i++) {
//             const selectempId = selectedMulti[i].id;

//             for (let j = 0; j < dtype.length; j++) {
//                 const departtype = dtype[j];

//                 if (departtype && departtype.id === selectempId) {
//                     selectedValues.push({
//                         label: departtype.label,
//                         id: departtype.id,
//                         value: departtype.label,
//                         new_Id: departtype.new_id,
//                     });
//                 }
//             }
//         }
//         setUniqueDepartmentTypes(selectedValues);

//         console.log("These are the department type", uniqueDepartmentTypes);
//     }

//     function handleMulti1(selectedMulti1) {
//         setselectedMulti1(
//             selectedMulti1.length > 0
//                 ? [selectedMulti1[selectedMulti1.length - 1]]
//                 : null
//         );
//         console.log("Hiiiiisshsh", selectedMulti1);
//         console.log("hello");
//         console.log(selectedMulti1);

//         console.log("vaishal11", selectedMulti1);
//         let selectedempValues = [];
//         for (let i = 0; i < selectedMulti1.length; i++) {
//             const selectId = selectedMulti1[i].new_Id;
//             //  console.log(selectId)

//             for (let j = 0; j < emprole.length; j++) {
//                 const employeetype = emprole[j];
//                 // console.log(employeetype);

//                 if (employeetype && employeetype.id === selectId) {
//                     selectedempValues.push({
//                         label: employeetype.label,
//                         id: employeetype.id,
//                         value: employeetype.label,
//                         neww_id: employeetype.new_empId,
//                     });
//                 }
//             }
//         }
//         setUniqueEmployeeRoles(selectedempValues);
//     }

//     function handleMulti4(selectedMulti4) {
//         //  setselectedMulti4(selectedMulti4);
//         setselectedMulti4(
//             selectedMulti4.length > 0
//                 ? [selectedMulti4[selectedMulti4.length - 1]]
//                 : null
//         );

//         console.log("hiivaishal", selectedMulti4);
//         console.log("abc", selectedMulti4[0].main_Id);
//         setemailandpassword(selectedMulti4[0].main_Id);
//         // gettingemailandpassword(selectedMulti4[0].main_Id);
//     }
//     function handleMulti2(selectedMulti2) {
//         // setselectedMulti2(selectedMulti2);
//         // setlocationSchema(selectedMulti2);
//         setselectedMulti2(
//             selectedMulti2.length > 0
//                 ? [selectedMulti2[selectedMulti2.length - 1]]
//                 : null
//         );
//     }

//     function handleMulti3(selectedMulti3) {
//         // setselectedMulti3(selectedMulti3);
//         setselectedMulti3(
//             selectedMulti3.length > 0
//                 ? [selectedMulti3[selectedMulti3.length - 1]]
//                 : null
//         );
//         let selectedempNames = [];
//         for (let i = 0; i < selectedMulti3.length; i++) {
//             const selectId = selectedMulti3[i].neww_id;

//             for (let j = 0; j < empname.length; j++) {
//                 const EmployeeName = empname[j];

//                 if (EmployeeName && EmployeeName.id === selectId) {
//                     selectedempNames.push({
//                         label: EmployeeName.label,
//                         id: EmployeeName.id,
//                         value: EmployeeName.label,
//                         main_Id: EmployeeName.main_id,
//                     });
//                 }
//             }
//         }
//         setuniqueEmployeeNames(selectedempNames);
//         console.log(selectedempNames);
//     }
//     const gettemplate = async () => {
//         const res = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/template/getTemplates`
//         );
//         console.log(">>template", res.data);
//         settemplate(res.data);
//     };
//     const gettasktemplate = async () => {
//         const res = await axios.get(
//             `${process.env.REACT_APP_BASE_URL}/tasktemplate/getTaskTemplates`
//         );
//         console.log(">>template", res.data);
//         settasktemplate(res.data);
//     };
//     useEffect(() => {
//         console.log("subteml", subtemplate);
//     }, [subtemplate]);
//     useEffect(() => {
//         getdepgroup();
//         getloc();
//         getdeptype();
//         getemprole();
//         getempname();
//         gettemplate();
//         gettasktemplate();
//     }, []);
//     const cancel = () => {
//         navigate("/roles-responsibilty");
//     };
//     useEffect(() => { }, [dep]);
//     useEffect(() => { }, [dtype]);
//     useEffect(() => { }, [emprole]);
//     useEffect(() => { }, [empname]);
//     useEffect(() => { }, [loc]);

//     // const filteredLoc = loc.filter(location => location.isActive === true);
//     return (
//         <>
//             <UiContent />
//             <div className="page-content">
//                 <Container fluid>
//                     <div className="row">
//                         <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                             <div className="col-6">
//                                 <h4 className="mb-0">Role Responsibilty</h4>
//                             </div>
//                             <div className="col-6">
//                                 <div className="d-flex align-items-center justify-content-end">
//                                     <Link to="/roles-responsibilty">
//                                         <button
//                                             className="custom_hover btn btn-primary btn-color"
//                                             type="submit"
//                                             style={{
//                                                 display: "flex",
//                                                 fontSize: "18px",
//                                                 width: "100%",
//                                             }}
//                                         >
//                                             <i className="ri-function-line me-1 fs-18"></i>View Menu
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </div>

//                             <div className="page-title-right">
//                                 <div className="form-check d-inline-block mb-0">
//                                     <input
//                                         className="form-check-input"
//                                         type="checkbox"
//                                         id="formCheck1"
//                                         style={{ visibility: "hidden" }}
//                                     />
//                                     {/* <label className="form-check-label" htmlFor="formCheck1">
//             <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
//           </label> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Row>
//                         <Col lg={12}>
//                             <Formik
//                                 validationSchema={validationSchema}
//                                 initialValues={{

//                                     employeeName: [],
//                                     email: "",
//                                     password: "",
                                  
//                                     template: "",
//                                     tasktemplate: "",
//                                 }}
//                                 onSubmit={(values, { resetForm }) => {
//                                     setselectedMulti2(null);
//                                     setselectedMulti(null);
//                                     setselectedMulti1(null);
//                                     setselectedMulti3(null);
//                                     setselectedMulti4(null);
//                                     setUniqueDepartmentTypes([]);
//                                     setUniqueEmployeeRoles([]);
//                                     setuniqueEmployeeNames([]);
//                                     // addCheckupDetails(values);
//                                     console.log(">>>", values.name);
//                                     console.log("Nioicc", values.locationSchema);
//                                     let loc1 = [];
//                                     let dg1 = [];
//                                     let dt = [];
//                                     let er = [];
//                                     let en = [];
//                                     console.log(">>>", selectedMulti2);

//                                     selectedMulti2.map((type) => {
//                                         loc1.push(type.id);
//                                     });

//                                     selectedMulti.map((type) => {
//                                         dg1.push(type.id);
//                                     });
//                                     selectedMulti1.map((type) => {
//                                         dt.push(type.new_Id);
//                                     });
//                                     selectedMulti3.map((type) => {
//                                         er.push(type.neww_id);
//                                     });
//                                     selectedMulti4.map((type) => {
//                                         en.push(type.main_Id);
//                                     });
//                                     console.log("loc1", loc1);
//                                     console.log("dt1", dt);
//                                     //  console.log("loc1",loc1);
//                                     console.log("dg1", dg1);
//                                     console.log("en", en);
//                                     console.log("suud", subtemplate._id);
//                                     console.log("Initialized new_id:", new_id);
//                                     const response = addrolesandresponsibility(
//                                         new_id,
                                      
//                                         en,

//                                         email1,
//                                         pass,

//                                         values.isActive,
//                                         subtemplate._id,


//                                     );
//                                     console.log("Byee", new_id)
//                                     console.log("asd", loc1);
//                                     console.log("Newww", response);
//                                     if (response) {
//                                         toast.success("Entry added successfully!");
//                                         GetallEmployeeName();
//                                         navigate("/roles-responsibilty");
//                                     } else {
//                                         toast.error("Failed to add entry");
//                                     }
//                                     setemail1("");
//                                     setpass("");
//                                     resetForm();
//                                     navigate("/roles-responsibilty");
//                                 }}
//                             >
//                                 {({
//                                     values,
//                                     errors,
//                                     touched,
//                                     handleChange,
//                                     handleBlur,
//                                     handleSubmit,
//                                     resetForm,
//                                 }) => (
//                                     <div className="login">
//                                         <div className="form">
//                                             <Form
//                                                 onSubmit={handleSubmit}
//                                                 enctype="multipart/form-data"
//                                             >
//                                                 <Card>
//                                                     <CardHeader>
//                                                         <Row className="g-1 m-1">
//                                                             <Col className="col-sm">
//                                                                 <div className="d-flex justify-content-sm-between">
//                                                                     <h2 className="card-title mb-0 justify-content-sm-start">
//                                                                         <strong>Roles Assign Details</strong>
//                                                                     </h2>
//                                                                 </div>
//                                                             </Col>
//                                                         </Row>
//                                                     </CardHeader>
//                                                     <div className="card-body">
//                                                         <div className="live-preview">
//                                                             <Row className="align-items-center g-3">
                                                        
//                                                                 <Col lg={4}>
//                                                                     <div className="mb-3">
//                                                                         <Label
//                                                                             htmlFor="choices-multiple-default"
//                                                                             className="form-label text-muted"
//                                                                         >
//                                                                             Employee Name
//                                                                         </Label>
//                                                                         <Select
//                                                                             value={selectedMulti4}
//                                                                             isMulti={true}
//                                                                             onChange={(selectedOptions) => {
//                                                                                 handleMulti4(selectedOptions);
//                                                                             }}
//                                                                             options={uniqueEmployeeNames}
//                                                                         />
//                                                                     </div>
//                                                                     {/* <p className="error text-danger">
//                                     {errors.employeeName &&
//                                       touched.employeeName &&
//                                       errors.employeeName}
//                                   </p> */}
//                                                                 </Col>
//                                                                 <Col lg={4}>
//                                                                     <label
//                                                                         className="form-label mt-3"
//                                                                         htmlFor="product-orders-input"
//                                                                     >
//                                                                         Email
//                                                                     </label>
//                                                                     <div className="">
//                                                                         <Input
//                                                                             type="text"
//                                                                             className="form-control"
//                                                                             id="product-orders-input"
//                                                                             name="email"
//                                                                             aria-label="orders"
//                                                                             ia-describedby="product-orders-addon"
//                                                                             onChange={handleChange}
//                                                                             onBlur={handleBlur}
//                                                                             value={email1}
//                                                                         />
//                                                                     </div>

//                                                                     <p className="error text-danger">
//                                                                         {/* {errors.checkupNumber &&
//                                       touched.checkupNumber &&
//                                       errors.checkupNumber} */}
//                                                                     </p>
//                                                                     <ErrorMessage
//                                                                         name="email"
//                                                                         component="div"
//                                                                         className="text-danger"
//                                                                     />
//                                                                 </Col>
//                                                                 <Col lg={4}>
//                                                                     <label
//                                                                         className="form-label mt-3"
//                                                                         htmlFor="product-orders-input"
//                                                                     >
//                                                                         Password
//                                                                     </label>
//                                                                     <div className="">
//                                                                         <Input
//                                                                             type="text"
//                                                                             className="form-control"
//                                                                             id="product-orders-input"
//                                                                             name="password"
//                                                                             aria-label="orders"
//                                                                             ia-describedby="product-orders-addon"
//                                                                             onChange={handleChange}
//                                                                             onBlur={handleBlur}
//                                                                             value={pass}
//                                                                         />
//                                                                     </div>

//                                                                     <p className="error text-danger">
//                                                                         {/* {errors.checkupNumber &&
//                                       touched.checkupNumber &&
//                                       errors.checkupNumber} */}
//                                                                     </p>
//                                                                     <ErrorMessage
//                                                                         name="password"
//                                                                         component="div"
//                                                                         className="text-danger"
//                                                                     />
//                                                                 </Col>
//                                                                 <Col sm={4}>
//                                                                     <div className="mb-3">
//                                                                         <label
//                                                                             className="form-label"
//                                                                             htmlFor="product-orders-input"
//                                                                         >
//                                                                             Task Template
//                                                                         </label>
//                                                                         <div className="">
//                                                                             <select
//                                                                                 className="form-select"
//                                                                                 name="tasktemplate"
//                                                                                 onBlur={handleBlur}
//                                                                                 value={values.tasktemplate}
//                                                                                 onChange={(e) => {
//                                                                                     //setSelectedDepartmentGroup(e.target.value);
//                                                                                     handleChange(e);
//                                                                                     handleTaskTemplateChange(e);
//                                                                                 }}
//                                                                             >
//                                                                                 <option value="">--select--</option>
//                                                                                 {tasktemplate && tasktemplate.length > 0 ? (
//                                                                                     tasktemplate
//                                                                                         .filter(
//                                                                                             (type) => type.isActive === true
//                                                                                         )

//                                                                                         .map((type) => (
//                                                                                             <option
//                                                                                                 key={type}
//                                                                                                 value={type._id}
//                                                                                             >
//                                                                                                 {type.templateName}
//                                                                                             </option>
//                                                                                         ))
//                                                                                 ) : (
//                                                                                     <option value="" disabled>
//                                                                                         No Task available
//                                                                                     </option>
//                                                                                 )}
//                                                                             </select>
//                                                                             <ErrorMessage
//                                                                                 name="departmentGroup"
//                                                                                 component="div"
//                                                                                 className="text-danger"
//                                                                             />
//                                                                         </div>
//                                                                     </div>
//                                                                 </Col>

//                                                                 <Col sm={2}>
//                                                                     <div className="mt-3">
//                                                                         <Field
//                                                                             type="checkbox"
//                                                                             id="isActive"
//                                                                             label="Is Active"
//                                                                             name="isActive"
//                                                                             checked={values.isActive}
//                                                                             onChange={handleChange}
//                                                                         />
//                                                                         <label className="me-2">Is Active</label>
//                                                                     </div>
//                                                                 </Col>
//                                                                 {/* <Col sm={4}></Col> */}

//                                                             </Row>
//                                                         </div>
//                                                     </div>

//                                                     <div className="text-end mb-3 me-3">
//                                                         <button
//                                                             className="btn btn-success w-sm"
//                                                             type="submit"
//                                                         >
//                                                             Submit
//                                                         </button>
//                                                         <button
//                                                             className="btn btn-danger w-sm"
//                                                             // onClick={handleSubmit}
//                                                             onClick={cancel}
//                                                             style={{ marginLeft: "3px" }}
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     </div>
//                                                 </Card>
//                                             </Form>
//                                         </div>
//                                     </div>
//                                 )}
//                             </Formik>
//                             <ToastContainer />
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     );
// };

// export default TestRolesResponsibility;
