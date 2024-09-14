import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import FeatherIcon from "feather-icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import yammo from "../assets/fonts/yummo-bold.woff"
import "../Dashboard/dashboard.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import SignContext from "../contextAPI/Context/SignContext";
import SearchComponent from "../common/SearchComponent";
import { useNavigate } from "react-router-dom";
import pinImage from '../assets/images/pin.png';
import toast, { Toaster } from 'react-hot-toast';
import {
  Pagination,
  Navigation,
  Scrollbar,
  EffectFade,
  EffectCreative,
  Mousewheel,
  EffectFlip,
  EffectCoverflow,
  Autoplay,
} from "swiper";
// const url = "http://localhost:5002";
const NewDashboard = () => {
  document.title = "Dashboard";
  const navigate = useNavigate();
  //const getReqCommDetails = useContext(SignContext)

  //const { id } = useParams();
  const {
    GetallDepartmentType,
    GetallDepartmentTypefordashboard,
    GetSpecificAddTaskByDeptId,
    deletetype,
  } = useContext(SignContext);
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
  const [rolesresponsibilities, setrolesresponsibility] = useState(null);
  const [admin, setadmin] = useState(null);
  const [addtask, setaddtask] = useState(null);
  const [assigntask, setassigntask] = useState(null);
  const [commsg, setcommmsg] = useState(null);
  const [deptype, setdeptype] = useState([]);
  const [tasklength, settasklength] = useState(null);
  const [response, setresponse] = useState(null);

  const getreqcommdetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/communitymaster/getalllocationcommunitydetails`
    );
    const filteredData = res.data.filter((item) => item.isActive);
    console.log("filteredData", res.data);
    setcommunityrequireddetails(filteredData);
  };

  const [communityreginaldetails, setcommunityreginaldetails] = useState(null);

  const getreginalUpdates = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/communitymaster/getAllReginalcommunitydetails`
    );
    const filteredData = res.data.filter((item) => item.isActive);
    console.log("setcommunityreginaldetails", res.data);
    setcommunityreginaldetails(filteredData);
  };

  const getreqassigntask = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntask`
    );
    console.log("jfjfijefjekf", res);
    setassigntask(res.assigncount);
  };
  const getreqadmincount = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/auth/getadmins`
    );
    console.log("jfjfijefjekf", res);
    setadmin(res.adminCount);
  };

  const getrolesresponsibility = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`
    );
    setrolesresponsibility(res.rolesResponsibilitiesCount);
    console.log(res.rolesResponsibilitiesCount);
  };

  const getcomdetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`
    );
    setcommmsg(res.count);
  };
  const gettaskdetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/addtask/getalltask`
    );
    setaddtask(res.formTasksCount);
  };
  const [filteredDeptype, setFilteredDeptype] = useState([]);
  const getalldepartmenttye = async () => {
    const res = await GetallDepartmentTypefordashboard();
    console.log(">>dtype", res);
    setdeptype(res.data);
    setFilteredDeptype(res.data);
  };
  const gettingid = async (id) => {
    const res = await GetSpecificAddTaskByDeptId(id);
    console.log("number", res);

    settasklength(res.data.length);
  };
  const userID = localStorage.getItem("Admin ID");
  let cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");

  console.log("AdminID", typeof userID);
  const getPinnedItem = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`
    );
    console.log("pinneditems", res.data[0]);
    setresponse(res.data[0]);
  };
  useEffect(() => {
    getPinnedItem();
  }, [cleanedUserID]);
  const schema = {
    "Add Tools": response?.AddTask,
    "Roles Responsibility": response?.RolesResponsibility,
    "Admin User": response?.AdminUser,
    "Assign Tools": response?.AssignMaster,
    "Community Update Master": response?.CommunityUpdateMaster,
    Dashboard: response?.Dashboard,
    "Type of Functions": response?.DepartmentGroup,
    "Department Type": response?.DepartmentType,
    "Employee Role": response?.EmployeeRole,
    "Employee Master": response?.Employeemaster,
    "Location Master": response?.LocationMaster,
    "Menu Master": response?.MenuMaster,
    "Template": response?.Template,
  };
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

  const searchList = (e) => {
    let inputVal = e.target.value.toLowerCase();
    let filteredData = deptype.map(dept => {
      // Filter the taskNames array
      let filteredTasks = dept.taskNames.filter(task => task.toLowerCase().includes(inputVal));
      // Return a new object with the filtered taskNames array
      return { ...dept, taskNames: filteredTasks };
    });
    // Filter the department types that still have tasks after the filtering
    filteredData = filteredData.filter(dept => dept.taskNames.length > 0);
    setFilteredDeptype(filteredData);
  };

  const trueKeys = Object.keys(schema).filter((key) => schema[key]);
  const handleRedirect = (field) => {
    // You can customize the URL or route based on your needs
    console.log("Hii", field);
    if (field === "Dashboard") {
      navigate("/dashboard");
    } if (field === "MenuMaster") {
      navigate("/menumaster");
    }
    if (field === "Add Tools") {
      navigate("/add-taskmaster");
    }
    if (field === "Assign Tools") {
      navigate("/assign-master");
    }
    if (field === "Template") {
      navigate("/template");
    }
    if (field === "Community Update Master") {
      navigate("/community-update");
    }
    if (field === "Type of Functions") {
      navigate("/department-group");
    }
    if (field === "Department Type") {
      navigate("/department-type");
    }
    if (field === "Employee Role") {
      navigate("/employee-roles");
    }
    if (field === "Employee Master") {
      navigate("/employee-master");
    }
    if (field === "Location Master") {
      navigate("/location-master");
    }
    if (field === "Menu Master") {
      navigate("/menumaster");
    }
    if (field === "Roles Responsibility") {
      navigate("/roles-responsibilty");
    }
    if (field === "Admin User") {
      navigate("/admin-user");
    }

    // Define route mappings for each field
    const routeMappings = {
      AddTask: "/add-taskmaster",
      AssignMaster: "/assign-master",
      CommunityUpdateMaster: "/community-update-master",
      // Dashboard: '/dashboard',
      DepartmentGroup: "/department-group",
      DepartmentType: "/department-type",
      EmployeeRole: "/employee-role",
      Employeemaster: "/employee-master",
      LocationMaster: "/location-master",
      MenuMaster: "/menu-master",
      // Add more mappings as needed
    };

    // Check if the field is true and has a corresponding route
    if (field && routeMappings[field]) {
      // Redirect to the corresponding route
      console.log(`Redirecting to ${routeMappings[field]}`);
      // Example using React Router's useNavigate hook
      // navigate(routeMappings[field]);
    } else {
      // Handle default case or display a message
      console.log("Invalid field or no valid route found for redirection");
      // Handle default case or display a message to the user
    }
  };

  useEffect(() => {
    console.log(">>>", deptype);
  }, [deptype]);
  useEffect(() => {
    getrolesresponsibility();
    getreqadmincount();
    getreqassigntask();
    getreqcommdetails();
    getreginalUpdates();
    getcomdetails();
    gettaskdetails();
    getalldepartmenttye();
    // getpinn();
  }, []);

  // useEffect(() => {
  //   gettingid();
  // }, [id]);
  console.log(rolesresponsibilities);
  console.log(commsg);
  console.log(admin);
  console.log(assigntask);


  useEffect(() => {
    // Set a delay for the execution
    const timer = setTimeout(() => {
      getreqcommdetails();
      getreginalUpdates();
    }); // Delay the execution for 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="bg-white page-content" style={{ fontFamily: yammo }}>
        <Container fluid>
          <Row>
            <h5>
              <b>Dashboard</b>
            </h5>
            <br />
            <br />
            <Col className="bottom-margin" md={4}>
              <div class="col-lg-12 col-lg-4 ">
                <Card
                  className="card-animate card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody className="rounded-20">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p class="fw-semibold new-class fs-16 mb-0 ">Users</p>

                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span className="counter-value">
                            {rolesresponsibilities}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title  rounded-circle fs-2">
                            <FeatherIcon icon="users" className="text-white text-white text-info" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>

            <Col md={4}>
              <div class="col-lg-12 col-lg-4">
                <Card
                  className="card-animate card-custom card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody className="rounded-20">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p class="fw-semibold new-class fs-16 mb-0 ">
                          no. Document
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span className="counter-value">
                            {commsg + admin + assigntask}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title  rounded-circle fs-2">
                            <FeatherIcon icon="users" className="text-white text-info" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col md={4}>
              <Card
                className="card-animate card-res"
                style={{ borderRadius: "15px" }}
              >
                <CardBody className="rounded-20">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p class="fw-semibold new-class fs-16 mb-0 ">
                        no. Form
                      </p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">{addtask}</span>
                      </h2>
                    </div>
                    <div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title   rounded-circle fs-2">
                          <FeatherIcon icon="file-text" className="text-white text-info" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <div style={{ display: "flex" }}>
                <label>
                  <img
                    src={pinImage}
                    style={{
                      width: "40px",
                      marginRight: "10px",
                    }}
                    alt="Pin"
                  />
                </label>
                <div style={{ fontSize: "22px", marginTop: "10px" }}>
                  Pinned Items
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {trueKeys.map((field) => (
              <Col key={field} sm={3} onClick={() => handleRedirect(field)}>
                <Card
                  className="card-animate card-custom card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody className="rounded-20">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p
                          className="fw-semibold new-class fs-16 mb-0 "
                          style={{ textAlign: "center" }}
                        >
                          {field}
                        </p>
                      </div>
                      {/* <div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info rounded-circle fs-2">
                          
                          <i className="bi bi-people text-white text-info"></i>
                        </span>
                      </div>
                    </div> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          {/* vaishal */}

          {/* <Row>
            {deptype && deptype.length>0 && deptype.map((type, index) => (


              <Col md={4} key={index}>
                <Link to={`/subdashboard/${type._id}`}>
                  <Card
                    className="card-animate card-res"
                    style={{ borderRadius: "15px" }}
                  >
                    <CardBody className="rounded-20">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p class="fw-semibold new-class fs-16 mb-0">
                            {type.name}
                          </p>

                          
                          <h2
                            className="mt-1 ff-secondary fs-14"
                            style={{ fontWeight: "bold" }}
                          >
                            SOPs
                          </h2>
                          <h2
                            className="mt-1 ff-secondary fs-14"
                            style={{ fontWeight: "bold" }}
                          >
                            
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded-circle fs-2">
                              <FeatherIcon
                                icon="file-text"
                                className="text-white text-info"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row> */}

          <Row style={{ marginTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'right' }} className="mt-5">
              <div className="search-box abc">
                <input
                  type="text"
                  id="searchTaskList"
                  className="form-control search anc"
                  placeholder="Search"
                  onChange={searchList}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
              {/* <input type="text" onChange={searchList} /> */}
            </div>
            {filteredDeptype &&
              filteredDeptype.length > 0 &&
              filteredDeptype.map((type, index) => {
                return (
                  <Col className="bottom-margin" md={4} key={index}>
                    <Link to={`/subdashboard/${type.departmentType._id}`}>
                      <Card className="card-animate card-res h-100" style={{ borderRadius: "15px" }}
                      >
                        <CardBody className="pb-20 rounded-20 d-flex flex-column">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-semibold new-class fs-20 mb-0 ">
                                {type.departmentType.name}
                              </p>

                              {/* <ul className="ps-0 fs-14 mt-3" style={{ fontWeight: '800', listStyleType: 'none', color: "#495057" }}>
                                {type.taskNames.map((task, taskIndex) => (
                                  <li key={taskIndex}>{task}</li>
                                ))}
                              </ul> */}
                              <h2
                                className="mt-1 ff-secondary fs-14"
                                style={{ fontWeight: "bold" }}
                              >
                                {/* {type.taskLength} */}
                              </h2>
                              <h2
                                className="mt-1 ff-secondary fs-14"
                                style={{ fontWeight: "bold" }}
                              >
                                {/* Task Length: {tasklength} */}
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title rounded-circle fs-2">
                                  <FeatherIcon
                                    icon="file-text"
                                    className="text-white text-info"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>

          <Col lg={12}>
            <Card>
              <CardBody className="rounded-20">
                <h4 className="mb-4 fs-4 " style={{ fontWeight: '800' }}>Group Level Updates</h4>
                <hr />
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                  loop={
                    communityrequireddetails &&
                    communityrequireddetails.length > 4
                  } autoplay={{ delay: 1000 }}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper swiper responsive-swiper rounded gallery-light pb-5"
                >
                  <div className="swiper-wrapper">
                    <div className="swiper-wrapper">
                      <Row>
                        {console.log(communityrequireddetails)}
                        {communityrequireddetails &&
                          communityrequireddetails.length > 0 ? (
                          communityrequireddetails.map((detail, index) => (

                            <SwiperSlide style={{ width: '30%' }} key={index}>

                              <div className="gallery-box card bg-white">
                                <div className="gallery-container">
                                  <Link
                                    className="image-popup "
                                    title={detail.name}
                                  >
                                    <img
                                      className="gallery-img img-fluid mx-auto"
                                      src={`${process.env.REACT_APP_BASE_URL}/${detail.uploadimage}`} // Adjust accordingly if using base64 strings
                                      alt={detail.name}
                                      style={{
                                        height: "170px",
                                        width: "100%",
                                      }}
                                    />
                                    <div className="gallery-overlay">
                                      <h6 className="overlay-caption fs-6" style={{ fontWeight: 'bold' }}>
                                        {/* {detail.locationSchema
                                        .map((location) => location.name)
                                        .join(", ")} */}

                                        {detail.updatedAt.split('T')[0]}
                                        <br />
                                        10:30AM - 1:15PM{" "}
                                      </h6>
                                    </div>
                                  </Link>
                                </div>
                                <div className="box-content">
                                  <div className="d-flex align-items-center mt-1">
                                    <h5 className="m-1 " style={{ color: 'rgb(16 118 238) ' }}>{detail.name}</h5>
                                  </div>
                                  <p className="m-1 ">{detail.message}</p>
                                </div>
                              </div>


                            </SwiperSlide>

                          ))
                        ) : (
                          <p>No Group Level Updates to Display</p>
                        )}
                      </Row>

                    </div>
                  </div>
                  <div className="swiper-pagination swiper-pagination-dark"></div>
                </Swiper>
              </CardBody>
            </Card>
          </Col>

          <Col lg={12}>
            <Card>
              <CardBody className="rounded-20">
                <h4 className="mb-4 fs-4 " style={{ fontWeight: '800' }}>Regional Updates</h4>
                <hr />
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 50,
                    },
                  }}
                  loop={
                    communityreginaldetails &&
                    communityreginaldetails.length > 4
                  } autoplay={{ delay: 1000 }}
                  onSwiper={(swiper) => console.log(swiper)}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper swiper responsive-swiper rounded gallery-light pb-5"
                >
                  <div className="swiper-wrapper">
                    <div className="swiper-wrapper">
                      <Row>
                        {console.log(communityreginaldetails)}
                        {communityreginaldetails &&
                          communityreginaldetails.length > 0 ? (
                          communityreginaldetails.map((detail, index) => (

                            <SwiperSlide style={{ width: '30%' }} key={index}>

                              <div className="gallery-box card bg-white">
                                <div className="gallery-container">
                                  <Link
                                    className="image-popup "
                                    title={detail.name}
                                  >
                                    <img
                                      className="gallery-img img-fluid mx-auto"
                                      src={`${process.env.REACT_APP_BASE_URL}/${detail.uploadimage}`} // Adjust accordingly if using base64 strings
                                      alt={detail.name}
                                      style={{
                                        height: "170px",
                                        width: "100%",
                                      }}
                                    />
                                    <div className="gallery-overlay">
                                      <h6 className="overlay-caption fs-6" style={{ fontWeight: 'bold' }}>
                                        {/* {detail.locationSchema
                                        .map((location) => location.name)
                                        .join(", ")} */}

                                        {detail.updatedAt.split('T')[0]}
                                        <br />
                                        10:30AM - 1:15PM{" "}
                                      </h6>
                                    </div>
                                  </Link>
                                </div>
                                <div className="box-content">
                                  <div className="d-flex align-items-center mt-1">
                                    <h5 className="m-1 " style={{ color: 'rgb(16 118 238) ' }}>{detail.name}</h5>
                                  </div>
                                  <p className="m-1 ">{detail.message}</p>
                                </div>
                              </div>


                            </SwiperSlide>

                          ))
                        ) : (
                          <p>No Regional Updates</p>
                        )}
                      </Row>

                    </div>
                  </div>
                  <div className="swiper-pagination swiper-pagination-dark"></div>
                </Swiper>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default NewDashboard;
