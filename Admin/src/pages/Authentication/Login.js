import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import User from "../"
import { gapi } from "gapi-script";
import './style1.css'
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  Spinner,
  FormFeedback,
  Alert,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logo from "../../assets/images/login_logo.png";
import { GoogleLogin } from "react-google-login";

// import logoWhite from from

// import { googleLogin } from "../../../../OPA_backend/middlewares/authMiddleware";
// const clientId="1005087809695-bm5o5takeq3sug0au1n0hab4ge5ug7e2.apps.googleusercontent.com
// "

//redux
import { Link, useNavigate } from "react-router-dom";

import withRouter from "../../Components/Common/withRouter";
import SignContext from "../../contextAPI/Context/SignContext";
import ParticleCanvas from "./canvas";

let Roles = "";

const Login = () => {
  const { loginAdmin } = useContext(SignContext);
  const navigate = useNavigate();
  const [AdminInfo, setAdminInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value });
  };
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [confirmPasswordShow, setconfirmPasswordShow] = useState(false);
  const [buttnLoading, setButtnLoading] = useState(false);

  const handleGoogleSuccess = async (response) => {
    // console.log("Nenenen", response);
    // console.log("neww",response.profileObj.email);
    try {
      const serverResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/google-login-authentication`,
        {
          email: response.profileObj.email,
        }
      );
      // console.log("Hii", serverResponse.success);
      // console.log("Hii",serverResponse.location);

      if (serverResponse.success === true) {
        const { token, roles, id, location } = serverResponse;

        // console.log("My default ID", id);
        // console.log(serverResponse);
        // console.log("This is the Type",typeof(JSON.stringify(roles)));

        // console.log('Roles:', roles);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("authToken", token);
        const currentTimestamp = new Date();

        // Get day, month, year, hour, minute, and AM/PM components
        const day = currentTimestamp.getDate();
        const month = currentTimestamp.toLocaleString("en-US", {
          month: "long",
        });
        const year = currentTimestamp.getFullYear();
        const hours = currentTimestamp.getHours();
        const minutes = currentTimestamp.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;

        // Create the formatted timestamp string
        const formattedTimestamp = `${day}-${month.toLowerCase()}-${year}-${formattedHours}:${minutes} ${ampm}`;

        // Set the formatted timestamp in local storage
        localStorage.setItem("timestamp", formattedTimestamp);
        localStorage.setItem("Role", serverResponse.roles);
        // localStorage.setItem("user", JSON.stringify(serverResponse));
        // localStorage.setItem("Rights", JSON.stringify(roles));
        Roles = roles;

        localStorage.setItem("Admin ID", JSON.stringify(id));
        localStorage.setItem("Admin Name", JSON.stringify(serverResponse.name));

        // window.localStorage.setItem("Google Location", JSON.stringify(location));
        // window.localStorage.setItem("email", JSON.stringify(serverResponse.profileObj.email));

        if (roles === "Admin" || roles === "Superadmin") {
          // Roles=roles;
          setSuccess(serverResponse.msg);

          navigate("/dashboard");
          // localStorage.removeItem("Rights");
        } else if (roles === "User") {
          // Roles=roles;

          setSuccess(serverResponse.msg);
          setTimeout(() => {
            navigate("/dashboard");
            // localStorage.removeItem("Rights");
          }, 3000);
        }
      } else {
        // Handle the case where the server response indicates failure
        // console.error('Error during Google login:', serverResponse.data.message);
        alert("Please Enter a Valid Email Id");
      }
    } catch (error) {
      // console.error('Error during Google login:', error);
      alert("Please Enter a Valid Email Id");
      // Handle the error as needed
    }
  };

  const handleGoogleFailure = (error) => {
    // console.error('Google login failure:', error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtnLoading(true);

    // Check if email is provided and matches the regex patternco
    // if (!AdminInfo.email || !emailRegex.test(AdminInfo.email)) {
    //   setError("Please provide a valid email address");
    //   setButtnLoading(false);
    //   return;
    // }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/authentication`,
        AdminInfo
      );
      // console.log("I am the best", res);

      if (res.success) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("authToken", res.token);
        const currentTimestamp = new Date();

        // Get day, month, year, hour, minute, and AM/PM components
        const day = currentTimestamp.getDate();
        const month = currentTimestamp.toLocaleString("en-US", {
          month: "long",
        });
        const year = currentTimestamp.getFullYear();
        const hours = currentTimestamp.getHours();
        const minutes = currentTimestamp.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;

        // Create the formatted timestamp string
        const formattedTimestamp = `${day}-${month.toLowerCase()}-${year}-${formattedHours}:${minutes} ${ampm}`;

        // Set the formatted timestamp in local storage
        localStorage.setItem("timestamp", formattedTimestamp);
        localStorage.setItem("Role", res.roles);

        Roles = res.roles;
        localStorage.setItem("Admin ID", JSON.stringify(res.id));
        localStorage.setItem("Admin Name", JSON.stringify(res.name));

        // console.log('This is...', res.roles);
        if (res.roles === "Admin" || res.roles === "Superadmin") {
          setSuccess(res.msg);
          navigate("/dashboard");
          // localStorage.removeItem("Rights");
        } else {
          setSuccess(res.msg);
          setTimeout(() => {
            navigate("/dashboard");
            // localStorage.removeItem("Rights");
          }, 3000);
        }
      } else {
        setError("Please Enter Email & Password");

        // setError("The Given Details")
        // setTimeout(() => {
        //   setError("Please Enter the Correct Password");
        // }, 3000);
      }

      setButtnLoading(false);
    } catch (error) {
      const code = error.split(" ")[error.split(" ").length - 1];
      // console.log("colled",code,error);
      // console.log("colled",code, error);
      if (code === "401") {
        setError("Invalid credentials. Please check your email and password.");
      } else if (code === "407") {
        setError("Please Enter a Correct Password");
      } else if (code === "405") {
        setError("Please Enter Email and Password");
      } else {
        setError("Please Enter Valid Credentials");
      }
      setButtnLoading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  document.title = "OPA | Login";

  return (
    <React.Fragment>
      <ParticlesAuth >
        <div className="auth-page-content  " >
          <Container >
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <img
                      src={logo}
                      alt="OPA"
                      style={{ maxHeight: "52px" }}
                    ></img>
                  </div>
                  {/* <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p> */}
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4 ">
                    <div className="text-center mt-2">
                      <h5 className="text-color text-primary abc1111 yammo-bold ">Welcome Back !</h5>
                      <p className="text-muted abc1111">
                        Sign in to continue to One Portal for All [OPA] System.
                      </p>
                    </div>
                    {Error && Error ? (
                      <Alert color="danger"> {Error} </Alert>
                    ) : null}
                    {Success && Success ? (
                      <Alert color="success"> {Success} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label abc1111">
                            Email
                          </Label>
                          <Input
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={AdminInfo.email}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          {Error &&
                            (!AdminInfo.email.match(/\.com$|\.net$/) ||
                              !AdminInfo.email.includes("@")) ? (
                            <small className="text-danger">Invalid Email</small>
                          ) : null}
                          {/* {Error && !AdminInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? (
        <small className="text-danger">Invalid email format</small>
      ) : null} */}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label abc1111"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              name="password"
                              type={confirmPasswordShow ? "text" : "password"}
                              value={AdminInfo.password}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() =>
                                setconfirmPasswordShow(!confirmPasswordShow)
                              }
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        {/* <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div> */}

                        {!buttnLoading ? (
                          <div className="mt-4 ">
                            <Button

                              color="success"
                              className=" btn btn-success w-100 abc1111"
                              type="submit"
                            >
                              Sign In
                            </Button>
                          </div>
                        ) : (
                          <Button
                            color="success"
                            className="btn-load  w-100 abc1111"
                            outline
                            disabled
                          >
                            <span className="d-flex align-items-center">
                              <Spinner size="sm" className="flex-shrink-0">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                              <span className="flex-grow-1 ms-2">
                                Loading...
                              </span>
                            </span>
                          </Button>
                        )}

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="yammo-bold fs-13 mb-4 title abc1111" style={{ background: '#e8f0fe' }}>Sign In with</h5>
                          </div>
                          <div className="btn_icon">
                            <GoogleLogin
                              clientId="388394949304-bmlvpqdssje2dl6kt72g02tcp6da9u3v.apps.googleusercontent.com"
                              render={(renderProps) => (
                                <button class="btn  btn-icon waves-effect waves-light"
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                // style={{ color: "red" }}
                                >
                                  <i
                                    className="fs-16 text-white ri-google-fill"
                                  //  style={{ color: "brown", fontSize: "30px" }}
                                  />
                                </button>
                              )}
                              onSuccess={handleGoogleSuccess}
                              onFailure={handleGoogleFailure}
                              cookiePolicy={"single_host_origin"}
                              prompt="select_account"
                              googleToken
                            />
                          </div>
                        </div>
                        {/* <div className="mt-4 text-center">
                          <p className="mb-0 abc1111">
                            Forgot Password ?{" "}
                            <Link
                              to="/forgot-password"
                              className="yummo_regular text-primary text-decoration-underline"
                            >
                              {" "}
                              
                              Forgot{" "}
                            </Link>{" "}
                          </p>
                        </div> */}
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <footer class="footer">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="text-center">
                      <p class="mb-0 text-muted">
                        &copy;2024 OPA. Design & Development By : <a href="https://www.barodaweb.com/" target="_blank">Barodaweb | The E-catalogue Designer</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};
export { Roles };
export default withRouter(Login);
