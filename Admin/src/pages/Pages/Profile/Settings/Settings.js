import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { toast, ToastContainer } from "react-toastify";


//import images
import progileBg from "../../../../assets/images/profile-bg.jpg";
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";
import SignContext from "../../../../contextAPI/Context/SignContext";

const Settings = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const {updateAdmin,  getSpecificAdmin, changeadminPassword } =
    useContext(SignContext);
  const [AdminInfo, setAdminInfo] = useState({
    oldPassword: "",
    newPassword: "",
  });
  // const [UserPassowrd, setUserPassword] = useState({
  //   oldPassword: "",
  //   newPassword: "",
  // });
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  // console.log(Success);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChange = (e) => {
    setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAdmin(AdminInfo, id);
  
    // console.log("hiii",res);
    if (res.success) {
      setSuccess(res.msg);
      
      toast.success("Updated Successfully", { autoClose: 3000 });
      
      // window.location.reload();
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("authToken");
    const res = await changeadminPassword(AdminInfo, token);
    // console.log(res);
    if (res.success) {
      // console.log(res);
      // window.location.reload();
   
        setSuccess(res.msg);
        navigate("/login");
  
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const getspecificAdmin = async (id) => {
    const res = await getSpecificAdmin(id);
    // console.log(res);
    if (res.success) {
      setAdminInfo(res);
    } else {
      // console.log(res.msg);
    }
  };

  useEffect(() => {
    getspecificAdmin(id);
  }, []);

  document.title = "Profile Settings | OPA";

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <div className="position-relative mx-n4 mt-n4">
            <div className="profile-wid-bg profile-setting-img">
              <img src={`${url}/${AdminInfo.image}`} className="profile-wid-img" alt="" />
            </div>
          </div>
          <Row>
            <Col xxl={3}>
              <Card className="mt-n5">
                <CardBody className="p-4">
                  <Form onSubmit={(e) => handleSubmit(e)}>
                  <div className="text-center">
                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                      <img
                        src={`${url}/${AdminInfo.image}`}
                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                        alt="user-profile"
                      />
                      <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                        {/* <Input
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                        /> */}
                        {/* <Label
                          htmlFor="profile-img-file-input"
                          className="profile-photo-edit avatar-xs"
                        >
                          <span className="avatar-title rounded-circle bg-light text-body">
                            <i className="ri-camera-fill"></i>
                          </span>
                        </Label> */}
                      </div>
                    </div>
                    <h5 className="fs-16 mb-1">{AdminInfo.name}</h5>
                  </div>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                {/* <CardBody>
                  <div className="d-flex align-items-center mb-5">
                    <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Complete Your Profile</h5>
                    </div>
                    <div className="flex-shrink-0">
                    <Link
                    to="#"
                    className="badge bg-light text-primary fs-12"
                    >
                        <i className="ri-edit-box-line align-bottom me-1"></i>{" "}
                        Edit
                        </Link>
                    </div>
                  </div>
                  <div className="progress animated-progress custom-progress progress-label">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div className="label">30%</div>
                    </div>
                  </div>
                </CardBody> */}
              </Card>
              <Card>
                {/* <CardBody>
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Portfolio</h5>
                    </div>
                    <div className="flex-shrink-0">
                    <Link
                        to="#"
                        className="badge bg-light text-primary fs-12"
                      >
                        <i className="ri-add-fill align-bottom me-1"></i> Add
                      </Link>
                    </div>
                    </div>
                    <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                        <i className="ri-github-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="email"
                      className="form-control"
                      id="gitUsername"
                      placeholder="Username"
                      defaultValue="@daveadame"
                      />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-global-fill"></i>
                      </span>
                    </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="websiteInput"
                      placeholder="www.example.com"
                      defaultValue="www.velzon.com"
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-success">
                        <i className="ri-dribbble-fill"></i>
                        </span>
                        </div>
                        <Input
                        type="text"
                      className="form-control"
                      id="dribbleName"
                      placeholder="Username"
                      defaultValue="@dave_adame"
                    />
                  </div>
                  <div className="d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-danger">
                        <i className="ri-pinterest-fill"></i>
                      </span>
                      </div>
                    <Input
                      type="text"
                      className="form-control"
                      id="pinterestName"
                      placeholder="Username"
                      defaultValue="Advance Dave"
                    />
                  </div>
                </CardBody> */}
              </Card>
            </Col>

            <Col xxl={9}>
              <Card className="mt-xxl-n5">
                <CardHeader>
                  <Nav
                    className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1");
                        }}
                      >
                        <i className="fas fa-home"></i>
                        Personal Details
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2");
                        }}
                        type="button"
                      >
                        <i className="far fa-user"></i>
                        Change Password
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                          <Col lg={12}>
                            <div className="mb-3">
                              <Label
                                htmlFor="firstnameInput"
                                className="form-label"
                              >
                                Name
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="firstnameInput"
                                placeholder="Enter your name"
                                name="name"
                                value={AdminInfo.name}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>
                          {/* <Col lg={6}>
                            <div className="mb-3">
                              <Label
                                htmlFor="phonenumberInput"
                                className="form-label"
                              >
                                City
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="textInput"
                                defaultValue="Vadodara"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Label className="form-label">Country</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="text"
                                defaultValue="India"
                              />
                            </div>
                          </Col> */}
                          <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-success"
                                onClick={()=>{navigate("/pages-profile");}}
                              >
                                Cancel
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>

                    <TabPane tabId="2">
                      {Error && (
                        <Alert
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          {Error}
                        </Alert>
                      )}
                      {Success && <Alert severity="success">{Success}</Alert>}
                      <Form onSubmit={(e) => handlePasswordSubmit(e)}>
                        <Row className="g-2">
                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="oldpasswordInput"
                                className="form-label"
                              >
                                Old Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="oldpasswordInput"
                                placeholder="Enter current password"
                                name="oldPassword"
                                value={AdminInfo.oldPassword}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div>
                              <Label
                                htmlFor="newpasswordInput"
                                className="form-label"
                              >
                                New Password*
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="newpasswordInput"
                                placeholder="Enter new password"
                                name="newPassword"
                                value={AdminInfo.newPassword}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </Col>

                  

                          {/* <Col lg={12}>
                            <div className="mb-3">
                              <Link
                                to="/forgot-password"
                                className="link-primary text-decoration-underline"
                              >
                                Forgot Password ?
                              </Link>
                            </div>  
                          </Col> */}

                          <Col lg={12}>
                            <div className="text-end">
                              <button type="submit" className="btn btn-success">
                                Change Password
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settings;
