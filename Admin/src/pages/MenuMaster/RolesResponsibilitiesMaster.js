
import React, { useState, useEffect, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import toast, { Toaster } from 'react-hot-toast';
import pinImage from '../../assets/images/pin.png';
import DataTable from "react-data-table-component";
import {
  Button,
  Card,
  CardBody,
  Col,
  Table,
  Container,
  Row,
} from "reactstrap";
import SignContext from "../../contextAPI/Context/SignContext";
import axios from "axios";
// import { getRolesResponsibilities } from "../../api"; // Import your API function

const RolesResponsibilities = () => {
  const navigate = useNavigate();
  const { getRolesResponsibilities, DeleteRolesResponsibility } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalRolesResponsibilities, setOriginalRolesResponsibilities] = useState([]);
  const [rolesResponsibilities, setRolesResponsibilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Update to display 10 records per page
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);

  ///
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const getRolesResponsibilitiesData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`)
      setOriginalRolesResponsibilities(res.rolesresponsibilities);
      setRolesResponsibilities(res.rolesresponsibilities);
    } catch (error) {
      // console.error("Error fetching roles and responsibilities:", error);
    }
  };

  const handleDelete = (id) => {
    setselectedForUpdate(id);
    setDeleteModal(true);
  };

  const handleDeleteRolesResponsibility = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteRolesResponsibility(selectedForUpdate);
        getRolesResponsibilitiesData();
        fetchRole();
      } catch (error) {
        // Handle error if needed
        // console.error("Error deleting roles responsibility:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit-rolesresponsibility/${id}`);
  };

  useEffect(() => {
    getRolesResponsibilitiesData();
  }, []);

  const searchList = (e) => {
    const inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Debugging
    // Call fetchAssignTask with the search term
    fetchRole(inputVal);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = rolesResponsibilities.slice(indexOfFirstItem, indexOfLastItem);
  //console.log(currentItems);

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
          setIsChecked(response.data[0].RolesResponsibility);
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateRolesResponsibility/${cleanedUserID}`, {
        RolesResponsibility: checked, // Use the new checked state here for RolesResponsibility
      });

      console.log('Updated RolesResponsibility:', response.data);
      // Optionally, you might want to handle the response or trigger further actions

    } catch (error) {
      console.error('Error updating RolesResponsibility:', error.response ? error.response.data : error.message);
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  useEffect(() => {
    fetchRole();
    getRolesResponsibilitiesData();
  }, []);

  const fetchRole = async (searchTerm = "") => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }


      const defaultColumn = "Task Name";
      const defaultSortDirection = "asc";

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/listroles`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
          sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
          match: searchTerm,
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
  useEffect(() => {
    fetchRole();
  }, []);

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const columns = [
    {
      name: 'ID',
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: {
        fontWeight: 'bold',
        fontFamily: 'curisve',
      },
      className: 'table-light',
    },
    {
      name: 'Employee Role Name',
      selector: (row) => row.employeeRole.EmployeeRole,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: 'Employee Name',
      selector: (row) => row.employeeName.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
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
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  useEffect(() => {
    fetchRole();
  }, [pageNo, perPage, column, sortDirection,]);
  useEffect(() => {
    fetchRole();
  }, [currentPage, itemsPerPage, column, sortDirection]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  // Set timeout for automatic logout after 1 hour
  useEffect(() => {
    let timeoutId;

    const startTimer = () => {
      timeoutId = setTimeout(() => {
        handleLogout();
        toast.warn("You have been logged out due to inactivity.");
      }, 600000); // 1 hour = 3600000 milliseconds
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      startTimer();
    };

    // Start the timer when the component mounts
    startTimer();

    // Reset the timer whenever there is user interaction
    const handleUserInteraction = () => {
      resetTimer();
      // You can also perform other actions on user interaction if needed
    };

    document.addEventListener("mousemove", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);
    document.addEventListener("mousedown", handleUserInteraction);
    document.addEventListener("scroll", handleUserInteraction);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousemove", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
      document.removeEventListener("mousedown", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    getRolesResponsibilitiesData();
  }, []);
  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteRolesResponsibility()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <div className="row">
            <div >
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h4 className="mb-0 abc1111">Roles & Responsibility</h4>
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
                    <Link to="/add-rolesresponsibility" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Roles & Responsibility</span>
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
                  <h4 class="card-title mb-0 flex-grow-1">Roles & Responsibility Details</h4>  </div>

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
                            <th scope="col">EmployeeRole</th>
                            <th scope="col">EmployeeName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((role, index) => (
                            <tr key={role._id}>
                              <td>{index + 1}</td>
                              <td>{role.employeeRole.EmployeeRole}</td>
                              <td>
                               {role.employeeName.name}
                              </td>
                              <td>
                                {role.email}
                              </td>
                              <td>
                                {role.isActive ? (
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
                                      onClick={() => handleEdit(role._id)}
                                    >
                                      <i className="ri-pencil-fill"></i>
                                    </button>
                                  </div>
                                  <div className="flex-grow-1">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-icon waves-effect waves-light"
                                      onClick={() => handleDelete(role._id)}
                                    >
                                      <i className="ri-delete-bin-5-line"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table> */}
                    </div>

                    {/* Pagination */}
                    {/* <nav>
                      <ul className="pagination">
                        {rolesResponsibilities.length > itemsPerPage && (
                          <>
                            <li
                              className={page-item ${currentPage === 1 ? "disabled" : ""}}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from(
                              { length: Math.ceil(rolesResponsibilities.length / itemsPerPage) },
                              (_, i) => {
                                if (i < 5) {
                                  return (
                                    <li
                                      key={i}
                                      className={`page-item ${
                                        currentPage === i + 1 ? "active" : ""
                                      }`}
                                    >
                                      <button
                                        className="page-link"
                                        onClick={() => paginate(i + 1)}
                                      >
                                        {i + 1}
                                      </button>
                                    </li>
                                  );
                                }
                              }
                            )}
                            <li
                              className={`page-item ${
                                currentPage ===
                                Math.ceil(rolesResponsibilities.length / itemsPerPage)
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                  currentPage ===
                                  Math.ceil(rolesResponsibilities.length / itemsPerPage)
                                }
                              >
                                Next
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav> */}
                    <DataTable className=" align-middle table-nowrap mb-0 table-with-border heading"
                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      sortServer
                      paginationPerPage={20}
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
        </Container>
      </div>
    </>
  );
};

export default RolesResponsibilities;
