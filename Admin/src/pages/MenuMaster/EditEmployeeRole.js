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
const EditEmployeeRole = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    EmployeeRole: Yup.string().required("Employee Role is required"),
  });
  const {
    GetEmployeeRoleByIdForEditing,
    setEditEmployeeRoleValues,
    GetallEmployeeRole,
  } = useContext(SignContext);
  const { id } = useParams();
  const [typeid1, settypeid1] = useState({
    departmentGroup: " ",
    departmentType: " ",
    EmployeeRole: " ",
    isActive: " ",
  });

  const gettingemprole = async (id) => {
    const res = await GetEmployeeRoleByIdForEditing(id);

    settypeid1(res.data);
  };
  const cancel = () => {
    GetallEmployeeRole();
    navigate("/employee-roles");
  };
  useEffect(() => {}, []);
  useEffect(() => {
    gettingemprole(id);
  }, []);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Employee Role"
            parent="OPA"
            child="Edit-EmployeeRole"
          />
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={typeid1}
                onSubmit={(values, { resetForm }) => {
                  if (typeid1.EmployeeRole !== "") {
                    const res = setEditEmployeeRoleValues(
                      id,
                      typeid1.departmentGroup._id,
                      typeid1.departmentType._id,
                      typeid1.EmployeeRole,
                      typeid1.isActive
                    );
                    if (res) {
                      toast.success("Employee Role Edited successfully!");
                      setTimeout(() => {
                        GetallEmployeeRole();
                        navigate("/employee-roles");
                      }, 3000);
                    }
                  }

                  // if(!typeid1.EmployeeRole){
                  //   toast.error("Please Enter all the details");
                  //   return ;

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
                      <form noValidate onSubmit={handleSubmit}>
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Employee Role</strong>
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
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentGroup"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                      >
                                        <option>
                                          {typeid1.departmentType.name}
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
                                      Employee Role
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="EmployeeRole"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) =>
                                          settypeid1((prev) => ({
                                            ...prev,
                                            EmployeeRole: e.target.value,
                                          }))
                                        }
                                        onBlur={handleBlur}
                                        value={typeid1.EmployeeRole}
                                      />
                                      {touched.EmployeeRole &&
                                        !typeid1.EmployeeRole && (
                                          <p className="error text-danger">
                                            Employee Role is required
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </Col>

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

export default EditEmployeeRole;
