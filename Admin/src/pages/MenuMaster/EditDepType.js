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
const EditDepType = () => {
  const navigate = useNavigate();
  const {
    GetDepTypeByIdForEditing,
    setEditDepTypeValues,
    GetallDepartmentType,
  } = useContext(SignContext);
  const { id } = useParams();
  const [typeid1, settypeid1] = useState({
    departmentGroup: " ",
    name: " ",
    isActive: " ",
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("department Type is required"),
  });

  const gettingdeptype = async (id) => {
    const res = await GetDepTypeByIdForEditing(id);
    settypeid1(res.data);
  };
  const cancel = () => {
    GetallDepartmentType();
    navigate("/department-type");
  };
  useEffect(() => {}, []);
  useEffect(() => {
    gettingdeptype(id);
  }, []);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Department Type"
            parent="OPA"
            child="Edit-DepartmentType"
          />
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={typeid1}
                onSubmit={(values, { resetForm }) => {
                  // if (typeid1.name == "") {
                  //   toast.error("please fill");
                  //   return;
                  // }
                  if (typeid1.name !== "") {
                    const res = setEditDepTypeValues(
                      id,
                      typeid1.departmentGroup._id,
                      typeid1.name,
                      typeid1.isActive
                    );
                    if (res) {
                      toast.success("Department Type Edited successfully!");
                      setTimeout(() => {
                        GetallDepartmentType();
                        navigate("/department-type");
                      }, 2500);
                    }
                  }
                  // if (!typeid1.name) {
                  //   toast.error("Please Fill all the Details");
                  //   return;
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
                }) => (
                  <div className="login">
                    <div className="form">
                      {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                      <form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Department Type</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
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
                                        onChange={handleChange}
                                      >
                                        <option>
                                          {typeid1.departmentGroup.name}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Department Type
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="name"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) =>
                                          settypeid1((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                          }))
                                        }
                                        onBlur={handleBlur}
                                        value={typeid1.name}
                                      />
                                      {touched.name && !typeid1.name && (
                                        <p className="error text-danger">
                                          Department Type is required
                                        </p>
                                      )}

                                      <p className="error text-danger">
                                        <ErrorMessage
                                          component="p"
                                          name="name"
                                        />
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}></Col>
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

export default EditDepType;
