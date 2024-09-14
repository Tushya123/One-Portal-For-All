import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";


// actions

import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const { updateAdmin, getSpecificAdmin } = useContext(SignContext);
  const [AdminInfo, setAdminInfo] = useState({ roles:"", status: "" });
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "roles") {
      setAdminInfo({ ...AdminInfo, [e.target.name]: [e.target.value] });
    } else if (e.target.name === "status") {
      setAdminInfo({ ...AdminInfo, status: e.target.value });
    } else {
      setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getspecificAdmin(id);
    const res = await updateAdmin(AdminInfo, id);
    // console.log(res);
    if (res.success) {
      setSuccess(res.msg)
      setTimeout(() => {
        // navigate("/users");
      }, 1000);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const getspecificAdmin = async (id) => {
    const res = await getSpecificAdmin(id);
    if (res.success) {
      setAdminInfo(res);
      // console.log("This is the message",res);
    } else {
      // console.log(res.msg);
    }
  };

  useEffect(() => {
    getspecificAdmin(id);
  }, []);

  document.title = "OPA|Profile";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {Error && Error ? <Alert color="danger">{Error}</Alert> : null}
              {Success ? (
                <Alert color="success">Username Updated To {AdminInfo.name}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={`${url}/${AdminInfo.image}`}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{AdminInfo.name}</h5>
                        <p className="mb-1">Email Id : {AdminInfo.email}</p>
                        <p className="mb-0">Id No : {AdminInfo._id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form onSubmit={(e) => handleSubmit(e)}
                className="form-horizontal"
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    type="text"
                    className="form-control mt-1"
                    id="name"
                    placeholder="name"
                    name="name"
                    value={AdminInfo.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
