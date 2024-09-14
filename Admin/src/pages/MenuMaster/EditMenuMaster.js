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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const EditMenuMaster = () => {
  const navigate = useNavigate();
  const { setEditMenuMastervalues,GetSpecificMenuMaster } =
    useContext(SignContext);
  const { id } = useParams();
  const [menuid, setmenuid] = useState({
    menugroup: " ",
    menuname: " ",
    isActive: " ",
  });

  const gettingmenumaster = async (id) => {
    const res = await GetSpecificMenuMaster(id);
    setmenuid(res.data);
  };
  const getallmenumaster=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/menu/getallmenumaster`)
    return res;
  }
  
  useEffect(() => {
    gettingmenumaster(id);
    getallmenumaster();
  }, []);
  const cancel=()=>{
    navigate('/menumaster')
  }
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Menu Master"
            parent="OPA"
            child="Edit-MenuMaster"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={menuid}
                onSubmit={(values, { resetForm }) => {
                  const res = setEditMenuMastervalues(
                    id,
                    menuid.menugroup,
                    menuid.menuname,
                    menuid.isActive
                  );
                  if(!menuid.menuname){
                    toast.error("Please Enter all the Details");
                    return ;
                  }
                  if (res) {
                    getallmenumaster();
                    navigate("/menumaster");
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
                                    <strong>Edit Menu Master</strong>
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
                                      value={menuid.menugroup}
                                      onChange={(e) => setmenuid((prev) => ({ ...prev, menugroup: e.target.value }))}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Set Up">Set Up</option>
                                      <option value="Master">Master</option>
                                      <option value="Department Master">Department Master</option>
                                      <option value="Task Master">Task Master</option>
                                      <option value="CMS Master">CMS Master</option>
                                    </select>
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
                                      onChange={(e) => setmenuid((prev) => ({ ...prev, menuname: e.target.value }))}
                                      onBlur={handleBlur}
                                      value={menuid.menuname}
                                    />
                                  </div>

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
                                      checked={menuid.isActive}
                                      onChange={(e) =>
                                        setmenuid({
                                          ...menuid,
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
              <ToastContainer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditMenuMaster;
