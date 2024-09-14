import React,{ useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { Card, CardHeader, Col, Container, Input, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { TagsInput } from "react-tag-input-component";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from 'react-router-dom';
const AddMenu = () => {
  const validationSchema = Yup.object().shape({
    
    menugroup: Yup.string().required("Please Select a Menu Group"),
  menuname: Yup.string().required("MenuName is required"),

    
    });
  const { addMenu,GetallMenuMaster } = useContext(SignContext);
  const navigate=useNavigate();
  const addMenudata = async (values) => {
    const response = await addMenu(values);
  };
  const cancel=()=>{
    navigate('/menumaster')
  }

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="OPA"
            child="Add-Menu"
          />
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  menugroup: "",
                  menuname:"",
                  isActive: true,
                }}
                onSubmit={(values , { resetForm }) => {
                  const res=addMenudata(values);
if(res){
  GetallMenuMaster();
  navigate('/menumaster')


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
                                    <strong>Add Menu Master</strong>
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
                                    Menu Group
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="menugroup"
                                      onBlur={handleBlur}
                                      value={values.menugroup}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Set Up">Set Up</option>
                                      <option value="Master">Master</option>
                                      <option value="Department Master">Department Master</option>
                                      <option value="Task Master">Task Master</option>
                                      <option value="CMS Master">CMS Master</option>
                                    </select>
                                    <ErrorMessage
              name="menugroup"
              component="div"
              className="text-danger"/>
                                  </div>
                                  <p className="error text-danger">
                                    {/* {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType} */}
                                  </p>
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Menu name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="menuname"
                                      aria-label="orders"
                                      ar
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.menuname}
                                    />
                                  </div>
                                  <ErrorMessage
              name="menuname"
              component="div"
              className="text-danger"/>

                                  <p className="error text-danger">
                                    {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
                                  </p>
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
                            <button
                              className="btn btn-danger w-sm"
                              onClick={cancel}
                              style={{marginLeft:'3px'}}
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}




export default AddMenu
