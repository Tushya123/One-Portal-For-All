import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { Card, CardHeader, Col, Container, Input, Row, Label } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { TagsInput } from "react-tag-input-component";
import SignContext from "../../contextAPI/Context/SignContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Editadmin = () => {
  const navigate=useNavigate();
    const {GetUserRoleByIdForEditing , setEditUserRoleValues,GetDepTypeById,
    GetEmployeeRoleById,GetallLocation,GetallDepartmentGroup, GetallAdminname} = useContext(SignContext);
    const { id } = useParams();
     const [locations, setLocations] = useState([]);
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartmentGroup, setSelectedDepartmentGroup] = useState("");
  const [selectedDepartmentType, setSelectedDepartmentType] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [status,setstatus]=useState("");
  const [image, setImage] = useState(null);
    const[typeid1,settypeid1]=useState({
        Name:"",
        email:"",
        password:"",
        location:"",
        departmentGroup:"",
        departmentType:"",
        Role:"",
        status:"",
        image:"",
        isActive:""
      });
    
  const handleDepartmentGroupChange = async (e) => {
    const depGrpId = e.target.value;
    setSelectedDepartmentGroup(depGrpId);

    // Fetch department types based on the selected department group
    const depTypeResponse = await GetDepTypeById(depGrpId);
    setDepartmentTypes(depTypeResponse.data);
  };

  const handleDepartmentTypeChange = async (e) => {
    const depTypeId = e.target.value;
    setSelectedDepartmentType(depTypeId);

    // Fetch employee roles based on the selected department group and department type
    const empRoleResponse = await GetEmployeeRoleById(
      selectedDepartmentGroup,
      depTypeId
    );
   const res= setEmployeeRoles(empRoleResponse.data);
  //  console.log("vaishal",res);
  };
   const handleImageChange = (e) => {
    //setImage(e.target.files[0]);
     var reader=new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload=()=>{
        // console.log(reader.result);
        setImage(reader.result);
       };
       reader.onerror=error=>{
        // console.log("error",error);
       };
  };    
    const gettingadmin=async (id)=>{
      const res=await GetUserRoleByIdForEditing(id);
      // console.log(res);
      settypeid1(res.data)
      
    }
      useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await GetallLocation();
        setLocations(locationResponse.data);

        const departmentGroupResponse = await GetallDepartmentGroup();
        setDepartmentGroups(departmentGroupResponse.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [GetallDepartmentGroup]);
    useEffect(() => {
        
      }, []);
    useEffect(()=>{
         gettingadmin(id);
    },[])

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Admin  "
            parent="OPA"
            child="Edit Admin Names"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={
                     typeid1
                    }
                onSubmit={(values, { resetForm }) => {
                  // console.log("type id",typeid1);
                  // console.log("location",typeid1.location);
                  // console.log("values",values);
                 

                   if (image) {
    // Upload the image first
    alert("Please upload a Image");
    values.image=image;
  }

                  const res=setEditUserRoleValues(id,values.name,values.password,values.email,values.location._id,values.departmentGroup._id,values.departmentType._id,values.Role,values.image,values.status,values.isActive)
                    if(res){
                      GetallAdminname();
                      window.location.reload();
                      navigate('/admin-user');
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
                      <form noValidate onSubmit={handleSubmit}  encType="multipart/form-data">
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Add Admin</strong>
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
                                     Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="name"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
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
                                    Email
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="email"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email}
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
                                    Password
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="password"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password} 
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
      {locations && locations.length > 0 ? (
        locations.map((location) => (  // Change from loc to locations
          <option key={location._id} value={location._id}>
            {location.name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No locations available
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
                                    Department Group
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="departmentGroup"
                                      onBlur={handleBlur}
                                      value={values.departmentGroup}
                                  onChange={(e) => {
                                    //setSelectedDepartmentGroup(e.target.value);
                                    handleChange(e);
                                    handleDepartmentGroupChange(e);
                                  }}
                                    >
                                      <option value="">--select--</option>
      {departmentGroups && departmentGroups.length > 0 ? (
        departmentGroups.map((group) => (  // Change from loc to departmentGroups
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No department groups available
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
                                    Department Type
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="departmentType"
                                      onBlur={handleBlur}
                                       value={values.departmentType}
                                  onChange={(e) => {
                                    //setSelectedDepartmentType(e.target.value);
                                    handleChange(e);
                                    handleDepartmentTypeChange(e);
                                  }}
                                    >
                                       <option value="">--select--</option>
                                    {departmentTypes &&
                                    departmentTypes.length > 0 ? (
                                      departmentTypes.map((type) => (
                                        <option
                                          key={type._id}
                                          value={type._id}
                                        >
                                          {type.name}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="" disabled>
                                        No department types available
                                      </option>
                                    )}
                                    </select>
                                  </div>
                                  {/* <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p> */}
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    User Role
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="Role"
                                      onBlur={handleBlur}
                                      value={values.Role}
                                      onChange={(e)=>{
                                        handleChange(e);
                                      }
                                        //setSelectedDepartmentType(e.target.value);
                                       
                                        //handleRoleChange(e);
                                      }
                                    >
                                 {/* <option value="">--select--</option>
                                  {employeeRoles &&
                                    employeeRoles.length > 0 ? (
                                      employeeRoles.map((role) => (
                                        <option
                                          key={role._id}
                                          value={role._id}
                                        >
                                          {role.EmployeeRole}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="" disabled>
                                        No employee roles available
                                      </option>
                                    )} */}
                                    <option value="">--select--</option>
                                  {Role &&
                                    Role.length > 0 ? (
                                      Role.filter(role => role.role !== "User").map(role => (
    <option key={role._id} value={role._id}>
      {role.role}
    </option>
    
                                      ))
                                    ) : (
                                      <option value="" disabled>
                                        No  roles available
                                      </option>
                                    )}
                                    </select>
                                  </div>
                                  {/* <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p> */}
                                </Col>
                                <Col sm={4}>
          <label className="form-label mt-3" htmlFor="product-orders-input">
            Image
          </label>
          <div className="">
            <Input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
             
            />
          </div>
          <p className="error text-danger"></p>
        </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Status
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="status"
                                      onBlur={handleBlur}
                                      value={values.status}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Active">Active</option>
                                      <option value="InActive">InActive</option>
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Editadmin;


