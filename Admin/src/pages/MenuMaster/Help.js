import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Table } from "antd";
import DataTable from "react-data-table-component";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { listLogin } from "../../functions/MPStakeHolder/ShLogin";

import {
  createLayoutImage,
  updateLayout,
  deleteLayout,
  getLayout,
} from "../../../src/functions/ImageLayout/ImageLayout";
import { listProspect } from "../../functions/Prospects/Prospect";

const initialState = {
  stakeholderID: "",
  layoutImageName: "",
  layoutImageUpload: "",
  guidelines: "",
  IsActive: false,
};

const ImageLayout = () => {
  const [formErrors, setFormErrors] = useState({});
  const [layoutName, setLayoutName] = useState("");
  const [layoutImage, setLayoutImage] = useState("");
  const [description, setDEscription] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [filter, setFilter] = useState(true);
  const [_id, set_Id] = useState("");
  const [stakeholders, setStakeholders] = useState([]);

  const [remove_id, setRemove_id] = useState("");
  const [ContentForm, setContentForm] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const [values, setValues] = useState(initialState);
  const {
    stakeholderID,
    layoutImageName,
    layoutImageUpload,
    guidelines,
    IsActive,
  } = values;

  // DISPLAY
  const [showForm, setShowForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  //search and pagination state
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();

  const loadStakeholders = () => {
    listProspect().then((res) => setStakeholders(res));
  };

  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, []);

  useEffect(() => {
    fetchContent();
  }, [pageNo, perPage, column, sortDirection, query, filter]);

  const fetchContent = async () => {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

    await axios
      .post(${process.env.REACT_APP_API_URL_MARWIZ}/api/auth/list-layouts, {
        skip: skip,
        per_page: perPage,
        sorton: column,
        sortdir: sortDirection,
        match: query,
        isActive: filter,
      })
      .then((response) => {
        console.log("res", response);
        //console.log("respo",response.length);
        if (response.data.length > 0) {
          console.log("nd njdjd");
          //let res = response[0];
          setLoading(false);
          console.log("response.data", response.data);
          setContentForm(response.data);
          console.log("count", response.data.length);
          setTotalRows(response.data.length);
        } else if (response.data.length === 0) {
          setContentForm([]);
        }
        // console.log(res);
      });

    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleFilter = (e) => {
    setFilter(e.target.checked);
  };

  //search
  const keys = ["ContentFor"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some(
        (key) =>
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(query)
      )
    );
  };

  //ck editor image handle
  function uploadAdapter(loader) {
    // return {
    //   upload: () => {
    //     return new Promise((resolve, reject) => {
    //       const body = new FormData();
    //       loader.file
    //         .then((file) => {
    //           body.append("uploadImg", file);
    //           uploadImage(body)
    //             .then((res) => {
    //               console.log(res.url);
    //               resolve({
    //                 default: ${process.env.REACT_APP_API_URL_MARWIZ}/uploads/content/${res.url},
    //               });
    //             })
    //             .catch((err) => console.log(err));
    //         })
    //         .catch((err) => reject(err));
    //     });
    //   },
    // };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const columns = [
    {
      name: "Image Name",
      selector: (row) => row.layoutImageName,
      sortable: true,
      sortField: "layoutImageName",
    },
    {
      name: "Description",
      selector: (row) => row.guidelines,
      sortable: true,
      sortField: "guidelines",
    },
    {
      name: "Status",
      selector: (row) => {
        return <p>{row.IsActive ? "Active" : "InActive"}</p>;
      },
      sortable: false,
      sortField: "Status",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <React.Fragment>
            <div className="d-flex gap-2">
              <div className="edit">
                <button
                  className="btn btn-sm btn-success edit-item-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#showModal"
                  onClick={() => handleTog_edit(row._id)}
                >
                  Edit
                </button>
              </div>

              <div className="remove">
                <button
                  className="btn btn-sm btn-danger remove-item-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteRecordModal"
                  onClick={() => tog_delete(row._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      },
      sortable: false,
    },
  ];

  //   useEffect(() => {
  //     loadContentForm();
  //   }, []);
  const [image, setImage] = useState();
  const [newProfileImageSelected, setNewProfileImageSelected] = useState(false);
  const [checkImage, setCheckImage] = useState(false);
  const [isImageValid, setIsImageValid] = useState(false);
  const imageUpload = (e) => {
    if (e.target.files.length > 0) {
      let imageurl = URL.createObjectURL(e.target.files[0]);
      setImage(imageurl);
      setValues({ ...values, layoutImageUpload: e.target.files[0] });
      setNewProfileImageSelected(true);
      setCheckImage(true);
      setIsImageValid(true);
    }
  };

  useEffect(() => {
    loadStakeholders();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("no errors");
    }
  }, [formErrors, isSubmit]);

  //   const loadContentForm = () => {
  //     listContent().then((res) => setContentForm(res));
  //   };

  const [modal_delete, setmodal_delete] = useState(false);
  const tog_delete = (_id) => {
    setmodal_delete(!modal_delete);
    setRemove_id(_id);
  };

  const handleAddCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsSubmit(false);
    setUpdateForm(false);
    setValues(initialState);
    setLayoutImage("");
  };
  const handleUpdateCancel = (e) => {
    e.preventDefault();
    setShowForm(false);
    setUpdateForm(false);
    setIsSubmit(false);
    setLayoutImage("");
  };

  const [modal_edit, setmodal_edit] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    // Assuming validation passes and you proceed to form submission
    if (Object.keys(errors).length === 0 && isSubmit)
    {
      const formData = new FormData();
      formData.append("layoutImageName", values.layoutImageName);
      formData.append("stakeholderID", values.stakeholderID);
      formData.append("guidelines", values.guidelines);
      formData.append("layoutImage", values.layoutImageUpload);
      formData.append("IsActive", values.IsActive);

      // Check if the layoutImageUpload is a file object before appending
      // if (
      //   values.layoutImageUpload &&
      //   values.layoutImageUpload instanceof File
      // ) {
      //   formData.append("layoutImage", values.layoutImageUpload); // Appends the file
      // } else {
      //   console.log(
      //     "No image file is selected or the file is not in the correct format."
      //   );
      // }

      console.log(
        "Form submission with image and data",
        values.layoutImageUpload
      );
      console.log("Layout ID", _id);

      try {
        const res = await updateLayout(_id, formData);
        console.log("Update success", res);

        // Resetting form and state after successful update
        setShowForm(false);
        setLayoutName("");
        setUpdateForm(false);
        setmodal_edit(!modal_edit);
        setLayoutImage("");
        setIsSubmit(false);
        setDEscription("");
        setFormErrors({});
        fetchContent(); // Assuming this fetches the updated list of layouts
      } catch (err) {
        console.error("Update failed", err);
      }
    }
  };

  const [photoAdd, setPhotoAdd] = useState();
  const [checkImagePhoto, setCheckImagePhoto] = useState(false);
  const PhotoUpload = (e) => {
    if (e.target.files.length > 0) {
      const image = new Image();

      let imageurl = URL.createObjectURL(e.target.files[0]);
      console.log("img", e.target.files[0]);

      setPhotoAdd(imageurl);
      // setValues({ ...values, blogImage: e.target.files[0] });
      setLayoutImage(e.target.files[0]);
      setCheckImagePhoto(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);
    console.log("values", values);

    const selectedStakeholder = stakeholders.find(
      (stakeholder) => stakeholder.name === values.stakeholderName
    );
    const stakeholderIDD = selectedStakeholder ? selectedStakeholder._id : null;

    if (Object.keys(errors).length === 0) {
    const formData = new FormData();
    formData.append("layoutImageName", values.layoutImageName);
    formData.append("stakeholderID", values.stakeholderID);
    formData.append("guidelines", values.guidelines);
    formData.append("layoutImage", values.layoutImageUpload); // Assuming 'layoutImage' is the name of the file input field
    formData.append("IsActive", values.IsActive);
    createLayoutImage(formData)
      .then((res) => {
        setShowForm(false);
        setLayoutName("");
        setUpdateForm(false);
        setmodal_edit(!modal_edit);
        setLayoutImage("");
        setIsSubmit(false);
        setDEscription("");
        setFormErrors({});
        fetchContent();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Team Role", remove_id);
    deleteLayout(remove_id)
      .then((res) => {
        console.log("deleted", res);
        setmodal_delete(!modal_delete);
        //loadContentForm();
        fetchContent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [errCF, setErrCF] = useState(false);
  const [errCT, setErrCT] = useState(false);
  const [errURL, setErrURL] = useState(false);
  const [errAd, setErrAd] = useState(false);
  const [errAddImage, setErrAddImage] = useState(false);

  const validClassCF =
    errCF && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassCT =
    errCT && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassAddImage =
    errAddImage && isSubmit ? "form-control is-invalid" : "form-control";
  const validClassAd =
    errAd && isSubmit ? "form-control is-invalid" : "form-control";

  const validClassURL =
    errURL && isSubmit ? "form-control is-invalid" : "form-control";

  const validate = (values) => {
    const errors = {};
    if (!values.layoutImageName) {
      errors.layoutImageName = "Image Name required";
      setErrCF(true);
    }
    if (values.layoutImageName) {
      setErrCF(false);
    }

    if (!values.stakeholderID) {
      errors.stakeholderID = "Stake Holder Name required";
      setErrAd(true);
    }
    if (values.stakeholderID) {
      setErrAd(false);
    }
    if (!values.layoutImageUpload) {
      errors.layoutImageUpload = "Image is required";
      setErrAddImage(true);
    }
    if (values.layoutImageUpload) {
      setErrAddImage(false);
    }
    if (!values.guidelines) {
      errors.guidelines = "GuideLines is required";
      setErrURL(true);
    }
    return errors;
  };

  const handleTog_edit = (_id) => {
    setUpdateForm(true);
    setmodal_edit(!modal_edit);
    setIsSubmit(false);
    getLayout(_id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          layoutImageName: res.layoutImageName,
          stakeholderID: res.stakeholderID,
          guidelines: res.guidelines,
          layoutImageUpload: res.layoutImageUpload,
        });
        set_Id(_id);
        // console.log(res.IsActive);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const errors = {};
  document.title = "Content | Marwiz";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            maintitle="Marwiz Setup"
            title="Content"
            pageTitle="CMS"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row className="g-4 mb-1">
                    <Col className="col-sm" lg={4} md={6} sm={6}>
                      <h2 className="card-title mb-0 fs-4 mt-2">
                        Content Editor
                      </h2>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div
                        style={{
                          display: showForm || updateForm ? "none" : "",
                        }}
                      >
                        <div className="text-end mt-2">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            name="filter"
                            value={filter}
                            defaultChecked={true}
                            onChange={handleFilter}
                          />
                          <Label className="form-check-label ms-2">
                            Active
                          </Label>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto" lg={4} md={12} sm={12}>
                      <div className="d-flex justify-content-sm-end">
                        {/* <div> */}
                        <div
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <div className="ms-2">
                            <Button
                              color="success"
                              className="add-btn me-1"
                              onClick={() => {
                                setShowForm(!showForm);
                                setValues(initialState);
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* </Col>
                            </Row>
                          </div> */}

                        <div
                          style={{
                            display: showForm || updateForm ? "" : "none",
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <div className="text-end">
                                <button
                                  className="btn bg-success text-light mb-3 "
                                  onClick={() => {
                                    setValues(initialState);
                                    setShowForm(false);
                                    setUpdateForm(false);
                                    // setFileId(Math.random() * 100000);
                                  }}
                                >
                                  <i class="ri-list-check align-bottom me-1"></i>{" "}
                                  List
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        {/* </div> */}

                        <div
                          className="search-box ms-2"
                          style={{
                            display: showForm || updateForm ? "none" : "",
                          }}
                        >
                          <input
                            className="form-control search"
                            placeholder="Search..."
                            onChange={(e) => setQuery(e.target.value)}
                          />
                          <i className="ri-search-line search-icon "></i>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>

                {/* ADD TEXT EDITOR */}
                {/* <Row> */}
                {/* {showForm && ( */}
                <div
                  style={{
                    display: showForm && !updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col lg={12}>
                        <Card className="">
                          <CardBody>
                            {/* <h3 className="mb-4">Content Editor</h3> */}
                            <div className="live-preview">
                              <Form onSubmit={handleSubmit}>
                                <Row>
                                  {/* Ttile */}
                                  <Col md={6}>
                                    {/* <label>
                                      Image Layout name{" "}
                                      <span className="text-danger">*</span>
                                    </label> */}
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className={validClassCF}
                                        placeholder="Product Rate"
                                        id="rolefloatingInput"
                                        onWheel={(e) => e.target.blur()}
                                        required
                                        name="layoutImageName"
                                        value={layoutImageName}
                                        onChange={handleChange}
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.layoutImageName}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Layout Image Name
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>
                                  {/* URL */}
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="select"
                                        className={validClassAd}
                                        name="stakeholderID"
                                        value={stakeholderID}
                                        onChange={handleChange}
                                      >
                                        <option>Select StakeHolder</option>

                                        {stakeholders.map((c) => {
                                          return (
                                            <React.Fragment key={c._id}>
                                              {c.IsActive && (
                                                <option value={c._id}>
                                                  {c.CompanyName}
                                                </option>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </Input>
                                      <Label>
                                        Stakeholder
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.advertisements}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Content Editor{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"guidelines" + _id}
                                          editor={ClassicEditor}
                                          className = {validClassURL}
                                          data={guidelines}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();
                                            // handleChange();
                                            setValues({
                                              ...values,
                                              guidelines: data,
                                            });
                                            // console.log(guidelines);
                                          }}
                                        />
                                        {/* </Form> */}
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.guidelines}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <div className="container">
                                    <div className="row">
                                      <div className="col-12 col-md-6">
                                        {" "}
                                        {/* Adjusts for mobile (full width) and medium devices (half width) */}
                                        <label>
                                          Product Image{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="file"
                                          name="layoutImageUpload"
                                          className={validClassAddImage}
                                          accept=".jpg, .jpeg, .png"
                                          onChange={imageUpload}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.layoutImageUpload}
                                          </p>
                                        )}
                                        {
                                          newProfileImageSelected ? (
                                            <img
                                              src={photoAdd}
                                              alt="Profile"
                                              width="200"
                                              height="160"
                                            />
                                          ) : null /* Removed empty <img /> for cleaner handling of no-image state */
                                        }
                                      </div>
                                    </div>
                                  </div>

                                  <Col lg={6}>
                                    <div className="form-check mb-3">
                                      <Input
                                        key={"IsActive_" + _id}
                                        type="checkbox"
                                        name="IsActive"
                                        //value={IsActive}
                                        // onChange={handleCheckContent}
                                        onChange={(e) => {
                                          setValues({
                                            ...values,
                                            IsActive: e.target.checked,
                                          });
                                        }}
                                        //checked={IsActive}
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="activeCheckBox"
                                      >
                                        Is Active
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.IsActive}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="text-end">
                                      <button
                                        onClick={handleSubmit}
                                        className="btn btn-success  m-1"
                                      >
                                        Submit
                                      </button>
                                      <button
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleAddCancel}

                                        // onClick={() => {
                                        //   setShowForm(false);
                                        //   setIsSubmit(false);
                                        //   setValues(initialState);
                                        // }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </React.Fragment>
                  </CardBody>
                </div>
                {/* )} */}

                {/* update form */}

                {/* <ContentEdit
                  key={"editform_" + _id}
                  fetchContent={fetchContent}
                  validate={validate}
                  contentfor={ContentFor}
                
                  active={IsActive}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  updateform={updateForm}
                  setupdateform={setUpdateForm}
                  valueContent={values}
                  setvalueContent={setValues}
                  formerror={formErrors}
                  setformerror={setFormErrors}
                  issubmit={isSubmit}
                  setissubmit={setIsSubmit}
                  ID={_id}
                /> */}
                <div
                  style={{
                    display: !showForm && updateForm ? "block" : "none",
                  }}
                >
                  <CardBody>
                    <React.Fragment>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <div className="live-preview">
                              <Form>
                                <Row>
                                  <Col md={6}>
                                    {/* <label>
                                      Image Layout name{" "}
                                      <span className="text-danger">*</span>
                                    </label> */}
                                    <div className="form-floating mb-3">
                                      <input
                                        type="text"
                                        className={validClassCF}
                                        placeholder="Product Rate"
                                        id="rolefloatingInput"
                                        onWheel={(e) => e.target.blur()}
                                        required
                                        name="layoutImageName"
                                        value={layoutImageName}
                                        onChange={handleChange}
                                      />
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.layoutImageName}
                                        </p>
                                      )}

                                      <label
                                        htmlFor="role-field"
                                        className="form-label"
                                      >
                                        Layout Image Name
                                        <span className="text-danger">*</span>
                                      </label>
                                    </div>
                                  </Col>
                                  {/* URL */}
                                  <Col lg={6}>
                                    <div className="form-floating mb-3">
                                      <Input
                                        type="select"
                                        className={validClassAd}
                                        name="stakeholderID"
                                        value={stakeholderID}
                                        onChange={handleChange}
                                      >
                                        <option>Select Media</option>

                                        {stakeholders.map((c) => {
                                          return (
                                            <React.Fragment key={c._id}>
                                              {c.IsActive && (
                                                <option value={c._id}>
                                                  {c.CompanyName}
                                                </option>
                                              )}
                                            </React.Fragment>
                                          );
                                        })}
                                      </Input>
                                      <Label>
                                        StakeHolder
                                        <span className="text-danger">*</span>
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.advertisements}
                                        </p>
                                      )}
                                    </div>
                                  </Col>

                                  <Col lg={12}>
                                    <Card>
                                      <Label>
                                        Content Editor{" "}
                                        <span className="text-danger">*</span>
                                      </Label>
                                      <CardBody>
                                        {/* <Form method="post"> */}
                                        <CKEditor
                                          key={"guidelines" + _id}
                                          editor={ClassicEditor}
                                          data={guidelines}
                                          config={{
                                            extraPlugins: [uploadPlugin],
                                          }}
                                          onChange={(event, editor) => {
                                            const data = editor.getData();
                                            // handleChange();
                                            setValues({
                                              ...values,
                                              guidelines: data,
                                            });
                                            // console.log(guidelines);
                                          }}
                                        />
                                        {/* </Form> */}
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.guidelines}
                                          </p>
                                        )}
                                      </CardBody>
                                    </Card>
                                  </Col>

                                  <div className="container">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <label>
                                          Product Image{" "}
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="file"
                                          name="layoutImageUpload"
                                          className={validClassAddImage}
                                          accept=".jpg, .jpeg, .png"
                                          onChange={imageUpload}
                                        />
                                        {isSubmit && (
                                          <p className="text-danger">
                                            {formErrors.layoutImageUpload}
                                          </p>
                                        )}
                                        {values.layoutImageUpload ? (
                                          <img
                                            src={
                                              newProfileImageSelected
                                                ? image
                                                : ${process.env.REACT_APP_API_URL_MARWIZ}/${values.layoutImageUpload}
                                            }
                                            alt="Profile"
                                            width="200"
                                            height="160"
                                          />
                                        ) : (
                                          <img alt="Placeholder" />
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <Col lg={6}>
                                    <div className="form-check mb-3">
                                      <Input
                                        key={"IsActive_" + _id}
                                        type="checkbox"
                                        name="IsActive"
                                        //value={IsActive}
                                        // onChange={handleCheckContent}
                                        onChange={(e) => {
                                          setValues({
                                            ...values,
                                            IsActive: e.target.checked,
                                          });
                                        }}
                                        //checked={IsActive}
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="activeCheckBox"
                                      >
                                        Is Active
                                      </Label>
                                      {isSubmit && (
                                        <p className="text-danger">
                                          {formErrors.IsActive}
                                        </p>
                                      )}
                                    </div>
                                  </Col>
                                  <Col lg={12}>
                                    <div className=" text-end">
                                      <button
                                        type="submit"
                                        className="btn btn-success  m-1"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-outline-danger m-1"
                                        onClick={handleUpdateCancel}

                                        // onClick={() => setupdateform(false)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </CardBody>{" "}
                        </Card>
                      </Col>
                    </React.Fragment>

                    {/* )} */}
                  </CardBody>
                </div>

                {/* NEW LIST */}
                <div
                  style={{ display: showForm || updateForm ? "none" : "block" }}
                >
                  <CardBody>
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
                          columns={columns}
                          data={ContentForm}
                          progressPending={loading}
                          sortServer
                          // onRowClicked={(row,e)=>{
                          //   debugger
                          // }}
                          onSort={(column, sortDirection, sortedRows) => {
                            handleSort(column, sortDirection);
                          }}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationRowsPerPageOptions={[
                            10,
                            50,
                            100,
                            totalRows,
                          ]}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                        />
                      </div>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Remove Modal */}
      <Modal
        isOpen={modal_delete}
        toggle={() => {
          tog_delete();
        }}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => {
            setmodal_delete(false);
          }}
        >
          Remove Content
        </ModalHeader>
        <form>
          <ModalBody>
            <div className="mt-2 text-center">
              <lord-icon
                src="https://cdn.lordicon.com/gsqxdxog.json"
                trigger="loop"
                colors="primary:#f7b84b,secondary:#f06548"
                style={{ width: "100px", height: "100px" }}
              ></lord-icon>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                <h4>Are you sure ?</h4>
                <p className="text-muted mx-4 mb-0">
                  Are you Sure You want to Remove this Record ?
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="submit"
                className="btn btn-danger"
                id="add-btn"
                onClick={handleDelete}
              >
                Remove
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setmodal_delete(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ImageLayout;