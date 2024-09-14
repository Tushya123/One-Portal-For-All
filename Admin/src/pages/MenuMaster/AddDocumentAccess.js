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
import Select from "react-select";
const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];
const AddDocumentAccess = () => {
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [selectedNoSortingGroup, setSelectedNoSortingGroup] = useState(null);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  function handleSelectGroups(selectedGroup) {
    setSelectedGroup(selectedGroup);
  }

  function handleSelectGroups2(selectedGroup2) {
    setSelectedGroup2(selectedGroup2);
  }

  function handleSelectNoSortingGroup(selectedNoSortingGroup) {
    setSelectedNoSortingGroup(selectedNoSortingGroup);
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }

  function handleMulti2(selectedMulti2) {
    setselectedMulti2(selectedMulti2);
  }

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3);
  }

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Company Master"
            child="Add-Company"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={
                  {
                    //   checkupName: "",
                    //   checkupNumber: "",
                    //   checkupDate: "",
                    //   checkupType: "",
                  }
                }
                onSubmit={(values, { resetForm }) => {
                  //   addCheckupDetails(values);
                  //   resetForm();
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
                                    <strong>Add Document Access</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                              <Col lg={4}>
                              <div className="mb-3">
                        <Label for="validationDefault04" className="form-label">Employee Name</Label>
                        <select className="form-select" id="validationDefault04" required>
                          <option>--select--</option>
                          <option>abc</option>
                          <option>def</option>
                          <option>ghi</option>
                        </select>
                        </div>
                              </Col>
                              <Col lg={4}>
                              <div className="mb-3">
                        <Label for="validationDefault04" className="form-label">Department Type</Label>
                        <select className="form-select" id="validationDefault04" required>
                          <option>--select--</option>
                          <option>abc</option>
                          <option>def</option>
                          <option>ghi</option>
                        </select>
                        </div>
                              </Col>
                            <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Department Group
                                    </Label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={() => {
                                        handleMulti();
                                      }}
                                      options={SingleOptions}
                                    />
                                  </div>
                            </Col>

                            <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Department Type
                                    </Label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={() => {
                                        handleMulti();
                                      }}
                                      options={SingleOptions}
                                    />
                                  </div>
                            </Col>    

                            <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Task Name
                                    </Label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={() => {
                                        handleMulti();
                                      }}
                                      options={SingleOptions}
                                    />
                                  </div>
                            </Col>

                            <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Task Type
                                    </Label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={() => {
                                        handleMulti();
                                      }}
                                      options={SingleOptions}
                                    />
                                  </div>
                            </Col>  
                                

                                <Col lg={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="active"
                                      checked={values.active}
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddDocumentAccess;
