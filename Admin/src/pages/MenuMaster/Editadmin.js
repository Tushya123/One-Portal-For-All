import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editadmin = () => {
  const navigate = useNavigate();
  const {
    GetUserRoleByIdForEditing,
    setEditUserRoleValues,
    GetDepTypeById,
    GetEmployeeRoleById,
    GetallLocation,
    GetallDepartmentGroup,
    GetRoles,
    GetallAdminname,
  } = useContext(SignContext);
  const { id } = useParams();
  const [locations, setLocations] = useState([]);
  const [loca, setLoca] = useState("");
  const [previousdepartmentGroups, setpreviousDepartmentGroups] = useState([]);
  const [previousdepartmentTypes, setpreviousDepartmentTypes] = useState([]);
  const [previouslocations, setpreviousLocations] = useState([]);
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [employeeRoles, setEmployeeRoles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartmentGroup, setSelectedDepartmentGroup] = useState("");
  const [selectedDepartmentType, setSelectedDepartmentType] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [previousstatus, setpreviousstatus] = useState("");
  const [Roles, setRoles] = useState([]);
  const [status, setstatus] = useState("");
  const [image, setImage] = useState(null);
  const [typeid1, settypeid1] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    departmentGroup: " ",
    departmentType: " ",
    roles: " ",
    status: " ",
    image: "",
  });

  const handleDepartmentGroupChange = async (e) => {
    const depGrpId = e.target.value;
    setSelectedDepartmentGroup(depGrpId);

    // Fetch department types based on the selected department group
    const depTypeResponse = await GetDepTypeById(depGrpId);
    setDepartmentTypes(depTypeResponse.data);
  };
  const handlelocationchange = async (e) => {
    const depGrpId = e.target.value;
    setLoca(depGrpId);
  };
  useEffect(() => {}, [loca]);
  useEffect(() => {
    const roleload = async () => {
      try {
        const RoleResponse = await GetRoles();
        const res = setRoles(RoleResponse);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    roleload();
  }, [GetRoles]);
  const handleDepartmentTypeChange = async (e) => {
    const depTypeId = e.target.value;
    setSelectedDepartmentType(depTypeId);

    // Fetch employee roles based on the selected department group and department type
    const empRoleResponse = await GetEmployeeRoleById(
      selectedDepartmentGroup,
      depTypeId
    );
    const res = setEmployeeRoles(empRoleResponse.data);
  };
  const handleStatusChange = (e) => {
    //setImage(e.target.files[0]);
    const status = e.target.value;
    setstatus(status);
  };
  const handleImageChange = (e) => {
    //setImage(e.target.files[0]);
    const file = e.target.files[0];
    setImage(file);
  };
  const gettingadmin = async (id) => {
    const res = await GetUserRoleByIdForEditing(id);
    settypeid1(res.data);
    setpreviousDepartmentGroups(res.data.departmentGroup._id);
    setpreviousDepartmentTypes(res.data.departmentType._id);
    setpreviousLocations(res.data.location._id);
    setpreviousstatus(res.data.status);
  };
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
  useEffect(() => {}, []);
  useEffect(() => {
    gettingadmin(id);
  }, []);
  const cancel = () => {
    navigate("/admin-user");
  };

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Admin" parent="OPA" child="Edit Admin" />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={typeid1}
                onSubmit={(values, { resetForm }) => {
                  typeid1.image = image;
                  // if(!typeid1.image){
                  //   alert("Please upload a Image");
                  //   return ;
                  // }

                  if (
                    selectedDepartmentGroup === "" &&
                    selectedDepartmentType === "" &&
                    loca === ""
                  ) {
                    const res = setEditUserRoleValues(
                      id,
                      typeid1.name,
                      typeid1.email,
                      typeid1.password,
                      previouslocations,
                      previousdepartmentGroups,
                      previousdepartmentTypes,
                      typeid1.roles._id,
                      typeid1.image,
                      status === "" ? previousstatus : status
                    );

                    if (res) {
                      toast.success("Admin Details Edited successfully!");
                      setTimeout(() => {
                        GetallAdminname();
                        navigate("/admin-user");
                        GetallAdminname();
                      }, 3000);
                    }
                  } else {
                    const res = setEditUserRoleValues(
                      id,
                      typeid1.name,
                      typeid1.email,
                      typeid1.password,
                      loca,
                      selectedDepartmentGroup,
                      selectedDepartmentType,
                      typeid1.roles._id,
                      typeid1.image,
                      status === "" ? previousstatus : status
                    );

                    if (res) {
                      toast.success("Admin Details Edited successfully!");

                      setTimeout(() => {
                        GetallAdminname();
                        navigate("/admin-user");
                        GetallAdminname();
                      }, 3000);
                    }
                  }
                  // const res=setEditUserRoleValues(id,typeid1.name,typeid1.email,typeid1.password,loca,selectedDepartmentGroup,selectedDepartmentType,typeid1.roles._id,typeid1.image,status)
                  if (!typeid1.name || !typeid1.email || !typeid1.password) {
                    toast.error("Please Enter all the Details");
                    return;
                    GetallAdminname();
                  }
                  // if(res){
                  //   GetallAdminname();
                  //     navigate('/admin-user');
                  //     GetallAdminname();

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
                      <form
                        noValidate
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Admin</strong>
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
                                      //onChange={handleChange}
                                      onBlur={handleBlur}
                                      onChange={(e) =>
                                        settypeid1((prev) => ({
                                          ...prev,
                                          name: e.target.value,
                                        }))
                                      }
                                      //  onBlur={handleBlur}
                                      value={typeid1.name}
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
                                      onChange={(e) =>
                                        settypeid1((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                        }))
                                      }
                                      // onBlur={handleBlur}
                                      value={typeid1.email}
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
                                      onChange={(e) =>
                                        settypeid1((prev) => ({
                                          ...prev,
                                          password: e.target.value,
                                        }))
                                      }
                                      // onBlur={handleBlur}
                                      value={typeid1.password}
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
                                      onChange={(e) => {
                                        handleChange(e);
                                        handlelocationchange(e);
                                      }}
                                    >
                                      <option>{typeid1.location.name}</option>
                                      {locations && locations.length > 0 ? (
                                        locations.map(
                                          (
                                            location // Change from loc to locations
                                          ) => (
                                            <option
                                              key={location._id}
                                              value={location._id}
                                            >
                                              {location.name}
                                            </option>
                                          )
                                        )
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
                                    Type of Functions
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
                                      <option>
                                        <option>
                                          {typeid1.departmentGroup.name}
                                        </option>
                                      </option>
                                      {departmentGroups &&
                                      departmentGroups.length > 0 ? (
                                        departmentGroups.map(
                                          (
                                            group // Change from loc to departmentGroups
                                          ) => (
                                            <option
                                              key={group._id}
                                              value={group._id}
                                            >
                                              {group.name}
                                            </option>
                                          )
                                        )
                                      ) : (
                                        <option value="" disabled>
                                          No Type of Functions available
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
                                      <option>
                                        {typeid1.departmentType.name}
                                      </option>
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
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
                                </Col>
                                <Row>
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="product-orders-input"
                                    >
                                      User Role
                                    </label>
                                    <div>
                                      <select
                                        className="form-select"
                                        name="roles"
                                        onBlur={handleBlur}
                                        value={values.roles}
                                        onChange={handleChange}
                                      >
                                        <option>{typeid1.roles.role}</option>
                                        {/* {Roles &&
          Roles.length > 0 ? (
            Roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.role}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No employee roles available
            </option>
          )} */}
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
                                      Image
                                    </label>
                                    <div>
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
                                    <div>
                                      <select
                                        className="form-select"
                                        name="status"
                                        onBlur={handleBlur}
                                        value={values.status}
                                        onChange={(e) => {
                                          // setSelectedDepartmentType(e.target.value);
                                          handleChange(e);
                                          handleStatusChange(e);
                                        }}
                                      >
                                        <option>{typeid1.status}</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">
                                          InActive
                                        </option>
                                      </select>
                                    </div>
                                    <p className="error text-danger">
                                      {errors.checkupType &&
                                        touched.checkupType &&
                                        errors.checkupType}
                                    </p>
                                  </Col>
                                </Row>

                                {typeid1.image && (
                                  <Row>
                                    <Col sm={12}>
                                      <div className="mt-3 text-center">
                                        <img
                                          src={`${process.env.REACT_APP_BASE_URL}/${typeid1.image}`}
                                          alt="Uploaded Profile Photo"
                                          style={{
                                            maxWidth: "50%",
                                            maxHeight: "100px",
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                )}
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

export default Editadmin;
