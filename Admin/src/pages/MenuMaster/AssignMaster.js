
import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import Example from "./FormOne";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import axios from "axios";
import pinImage from '../../assets/images/pin.png';
import DataTable from "react-data-table-component";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import '../MenuMaster/1.css'

const AssignMaster = () => {
  const navigate = useNavigate();
  const { GetallAssignTask, DeleteAssignTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAssignTask, setOriginalAssignTask] = useState(null);
  const [task, setTask] = useState(null);
  const [paginatetask, setpaginateTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([])
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  // const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const getalltask = async () => {
    const res = await GetallAssignTask();
    setOriginalAssignTask(res.data);
    setTask(res.data);
    setpaginateTask(res.data)
  };

  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteAssignTask = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteAssignTask(selectedForUpdate);
        fetchAssignTask();
        getalltask();

      } catch (error) {
        // Handle error if needed
        // console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit-assigntask/${id}`);
  };

  useEffect(() => {
    getalltask();
  }, []);

  const searchList = (e) => {
    const inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Debugging
    // Call fetchAssignTask with the search term
    fetchAssignTask(inputVal);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userID = localStorage.getItem("Admin ID");
  const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
  useEffect(() => {
    // Assuming you fetch pinned items and set it to the state
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`);
        setPinnedItems(response.data);

        // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
        if (response.data.length > 0) {
          setIsChecked(response.data[0].AssignMaster);
        }
      } catch (error) {
        console.error('Error fetching pinned items:', error);
      }
    };
    fetchData();
  }, [cleanedUserID]);

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked; // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("Admin ID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
    // Assuming this is the ID you want to update
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateAssignMaster/${cleanedUserID}`, {
        AssignMaster: checked, // Use the new checked state here for AssignTask
      });

      console.log('Updated AssignTask:', response.data);
      // Optionally, you might want to handle the response or trigger further actions

    } catch (error) {
      console.error('Error updating AssignTask:', error.response ? error.response.data : error.message);
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  useEffect(() => {
    fetchAssignTask();
  }, [])

  const fetchAssignTask = async (searchTerm = "") => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

      const defaultColumn = "Tool Name";
      const defaultSortDirection = "asc";

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/assigntask/assign1`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
          sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
          match: searchTerm, // Pass the search term in the payload
        }
      );

      console.log("Response:", response);

      console.log(Array.isArray(response));

      if (Array.isArray(response)) {
        setLoading(false);

        // Extract data for the current page
        const startIndex = skip;
        const endIndex = startIndex + perPage;
        const paginatedData = response.slice(startIndex, endIndex);

        setBGForm(response[0].data);
        setTotalRows(response[0].count);
      } else {
        // Handle non-200 status code or non-array data
        console.error("Invalid response:", response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  const columns = [
    {
      name: 'ID',
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: { fontWeight: 'bold', fontFamily: 'cursive' },
      className: 'table-light',
    },
    {
      name: 'Document Name',
      selector: (row) => row.documentname,
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Department Types Name',
      selector: (row) => row.documentdepartmenttype?.name,
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Tool Name',
      selector: (row) => row.tasktype?.taskName,
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Assigned By',
      selector: (row) => row.assignedby?.name || "Template",
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Assigned To',
      selector: (row) => row.employeeName?.name || "Template Tool",
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Document Type',
      selector: (row) => (row.documenttype === '' ? 'FormLink' : row.documenttype),
      sortable: true,
      style: { fontFamily: 'cursive' },
    },
    {
      name: 'Status',
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) => (
        row.isActive ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-2 align-items-center">
          <div className="flex-shrink-0">
            <button
              type="button"
              className="btn btn-success btn-icon waves-effect waves-light"
              onClick={() => handleEdit(row._id)}
            >
              <i className="ri-pencil-fill"></i>
            </button>
          </div>
          <div className="flex-grow-1">
            <button
              type="button"
              className="btn btn-danger btn-icon waves-effect waves-light"
              onClick={() => handleDelete(row._id)}
            >
              <i className="ri-delete-bin-5-line"></i>
            </button>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchAssignTask();
  }, [pageNo, perPage, column, sortDirection,]);
  useEffect(() => {
    fetchAssignTask();
  }, [currentPage, itemsPerPage, column, sortDirection]);
  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteAssignTask()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <div className="row">
            <div >
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h4 className="mb-0 abc1111">Assign Master</h4>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-end" >

                    <div>
                      <input
                        style={{
                          visibility: "visible",
                          width: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          zIndex: "1111",
                          position: "absolute",

                          width: "40px",
                          height: "40px",
                          opacity: "0",
                        }}
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label>
                        <img
                          src={pinImage}
                          style={{
                            width: "40px",
                            marginRight: "10px",
                            opacity: isChecked ? "1" : "0.4",
                          }}
                          alt="Pin"
                        />
                      </label>

                    </div>
                    <Link to="/assign-task" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Assign Tool</span>
                      </button>
                    </Link>
                  </div>
                </div>


                <div className="page-title-right">
                  <div className="form-check d-inline-block mb-0">
                    <input className="form-check-input" type="checkbox" id="formCheck1" style={{ visibility: 'hidden' }} />
                    {/* <label className="form-check-label" htmlFor="formCheck1">
            <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
          </label> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col xl={12}>
              <Card>
                <div class="card-header align-items-center d-flex card-body">
                  <h4 class="card-title mb-0 flex-grow-1">Assign Tool Details</h4>  </div>

                <CardBody className="mt-2">
                  <div className="mt-5">
                    <SearchComponent searchList={searchList} />
                  </div>
                  <div className="live-preview">
                    <div className="table-responsive">
                      {/* <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Document Name</th>
                            <th scope="col">Document Department Type</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Document Type</th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index + 1}</td>
                                  <td>{type.documentname}</td>
                                  <td>{type.documentdepartmenttype.name}</td>
                                  <td>{type.tasktypes.taskName}</td>
                                  <td>
                                    {type.documenttype === ""
                                      ? "FormLink"
                                      : type.documenttype}
                                  </td>
                                  <td>
                                    {!type.locationSchema.length
                                      ? "No"
                                      : "Yes"}

                                  </td>
                                  <td>
                                    {type.isActive ? (
                                      <span className="badge bg-success">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        InActive
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2 align-items-center">
                                      <div className="flex-shrink-0">
                                        <button
                                          type="button"
                                          className="btn btn-success btn-icon waves-effect waves-light"
                                          onClick={() =>
                                            handleEdit(type._id)
                                          }
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          onClick={() =>
                                            handleDelete(type._id)
                                          }
                                        >
                                          <i className="ri-delete-bin-5-line"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table> */}
                    </div>
                    <DataTable className="align-middle table-nowrap mb-0 table-with-border heading"
                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      paginationPerPage={20}
                      sortServer
                      pagination
                      paginationServer
                      paginationDefaultPage={currentPage}
                      paginationTotalRows={totalRows}
                      paginationRowsPerPageOptions={[10, 20, 50, 100, totalRows]}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={
                        handlePageChange

                      }
                      onSort={handleSort}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <nav>
            <ul className="pagination">
              {task && task.length > itemsPerPage && (
                <>
                  <li className={page-item ${currentPage === 1 ? 'disabled' : ''}}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: Math.ceil(task.length / itemsPerPage) }, (_, i) => i + 1).map(pageNumber => (
                    <li key={pageNumber} className={page-item ${currentPage === pageNumber ? 'active' : ''}}>
                      <button onClick={() => paginate(pageNumber)} className="page-link">
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li className={page-item ${currentPage === Math.ceil(task.length / itemsPerPage) ? 'disabled' : ''}}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(task.length / itemsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav> */}

        </Container>
      </div>
    </>
  );
};

export default AssignMaster;