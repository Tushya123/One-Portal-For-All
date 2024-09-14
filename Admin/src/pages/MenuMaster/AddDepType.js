import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
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
const validationSchema = Yup.object().shape({
  departmentGroup: Yup.string().required("Type of Functions is required"),
  name: Yup.string().required("name is required"),
});
const AddDepType = () => {
  const [depgroup, setDepgroup] = useState(null);

  const { GetallDepartmentGroup, addDepType, GetallDepartmentType } = useContext(SignContext);
  const navigate = useNavigate();
  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();
    setDepgroup(response.data);
  };
  const getdeptype = async (values) => {
    const res = await GetallDepartmentType(values);

  }
  const adddeptype = async (values) => {
    const response = await addDepType(values);
  };
  const cancel = () => {
    navigate('/department-type')
  }
  useEffect(() => {
    getdepgroup();
    getdeptype();
  }, []);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <div className="row">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <div className="col-6">
                <h4 className="mb-0">Department Type</h4>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center justify-content-end">
                  <Link to="/department-type">
                    <button
                      className="custom_hover btn btn-primary btn-color"
                      type="submit"
                      style={{
                        display: "flex",
                        fontSize: "18px",
                        width: "100%",
                      }}
                    >
                      <i className="ri-function-line me-1 fs-18"></i>View Menu
                    </button>
                  </Link>
                </div>
              </div>

              <div className="page-title-right">
                <div className="form-check d-inline-block mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="formCheck1"
                    style={{ visibility: "hidden" }}
                  />
                  {/* <label className="form-check-label" htmlFor="formCheck1">
            <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
          </label> */}
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  departmentGroup: "",
                  name: "",
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  const res = adddeptype(values);
                  // getdepgroup();
                  if (res) {
                    toast.success("Department Added successfully!");
                    setTimeout(() => {
                      getdeptype();
                      navigate('/department-type')
                    }, 2000)
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
                      <form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Add Department Type</strong>
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
                                      Type of Functions                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentGroup"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                      >
                                        <option value="">--select--</option>
                                        {depgroup && depgroup.length > 0 ? (
                                          depgroup.filter(type => type.isActive === true)

                                            .map((type) => (
                                              <option key={type} value={type._id}>
                                                {type.name}
                                              </option>
                                            ))
                                        ) : (
                                          <option value="" disabled>
                                            No locations available
                                          </option>
                                        )}
                                      </select>
                                      <ErrorMessage
                                        name="departmentGroup"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                      />
                                      <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-danger"
                                      />
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
                                      checked={values.isActive}
                                      onChange={handleChange}
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
                              Submit
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

export default AddDepType;
