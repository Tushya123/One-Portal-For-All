
import React, { useState, useEffect, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import DataTable from "react-data-table-component";
import pinImage from '../../assets/images/pin.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
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
import { SignState } from "../../contextAPI/State/SignState";
import SignContext from "../../contextAPI/Context/SignContext";

const AdminUser = () => {
  useEffect(() => {
    fetchAdmin();
    getAdmin();
    GetallAdminname();
  }, [])
  const navigate = useNavigate();
  const { GetallAdminname, Deleteadmin } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAdmin, setOriginalAdmin] = useState(null);
  const [adminData, setAdminData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteAdminUser = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await Deleteadmin(selectedForUpdate);
        fetchAdmin();
        getAdmin();
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
    navigate(`/edit-admin/${id}`);
  };

  const getAdmin = async () => {
    try {
      const res = await GetallAdminname();
      setAdminData(res.data);
      setOriginalAdmin(res.data);
    } catch (error) {
      // console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    getAdmin();
    getAdmin();
  }, []);

  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalAdmin.filter(
      (el) =>
        el.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.email.toLowerCase().indexOf(inputVal) !== -1 ||
        el.departmentGroup.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.departmentType.name.toLowerCase().indexOf(inputVal) !== -1

    );
    setAdminData(filterData);
    setBGForm(filterData);
    setTotalRows(filterData.length);
    console.log(filterData)
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = adminData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userID = localStorage.getItem("Admin ID");
  const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
  useEffect(() => {
    // Assuming you fetch pinned items and set it to the state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`
        );
        setPinnedItems(response.data);

        // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
        if (response.data.length > 0) {
          setIsChecked(response.data[0].AdminUser);
        }
      } catch (error) {
        console.error("Error fetching pinned items:", error);
      }
    };
    fetchData();
  }, [cleanedUserID]);

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked; // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("Admin ID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
    // Assuming this is the ID you want to update
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pin/updateAdminUser/${cleanedUserID}`,
        {
          AdminUser: checked, // Use the new checked state here for AdminUser
        }
      );

      console.log("Updated AdminUser:", response.data);
      // Optionally, you might want to handle the response or trigger further actions
    } catch (error) {
      console.error(
        "Error updating AdminUser:",
        error.response ? error.response.data : error.message
      );
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  useEffect(() => {
    fetchAdmin();
    getAdmin();
    getAdmin();
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

      const defaultColumn = "Task Name";
      const defaultSortDirection = "asc";

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/listadmin`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
          sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
          match: "",
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

        setBGForm(paginatedData);
        setTotalRows(response.length);
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
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}/${uploadimage}`;
    return <img src={imageUrl} alt="Image" style={{ width: '75px', height: '75px', padding: "5px" }} />;
  };

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };

  const columns = [
    {
      name: "ID",
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: {
        fontWeight: "bold",
        fontFamily: 'cursive',
        width: "50px", // Reduced width
      },
      className: "table-light",
    },
    {
      name: "Image",
      selector: (row) => renderImage(row.image),
      sortable: true,
      style: {
        position: "relative",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: "Email || Password",
      selector: (row) => `${row.email} || ${row.password}`,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: "Type of Functions",
      selector: (row) => row.departmentGroup.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: "Department Type",
      selector: (row) => row.departmentType.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) =>
        row.status ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
      style: {
        width: "10px", // Reduced width
        textAlign: "center",
      },
    },
    {
      name: "Actions",
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

  // Ensure the table layout is set to auto
  const tableStyles = {
    tableLayout: 'auto',
    width: '100%',
  };

  useEffect(() => {
    fetchAdmin();
  }, [pageNo, perPage, column, sortDirection]);
  useEffect(() => {
    fetchAdmin();
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
  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteAdminUser()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <div className="row">
            <div >
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h4 className="mb-0 abc1111">Admin User</h4>
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
                    <Link to="/add-user" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Admin User</span>
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
                  <h4 class="card-title mb-0 flex-grow-1">Admin Details</h4>  </div>

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
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email|Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col">location</th>
                            <th scope="col">Group</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((admin, index) => (
                            <tr key={admin._id}>
                              <td>{index + 1}</td>
                              <td>
                                {admin.image ? (
                                  <img
                                    src={${process.env.REACT_APP_BASE_URL}/${admin.image}}
                                    alt="Admin"
                                    style={{ height: "50px", width: "50px" }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>
                              <td>{admin.name}</td>
                              <td>{${admin.email} | ${admin.password}}</td>
                              <td>{admin.roles && admin.roles.role}</td>
                              <td>
                                {admin.status === "Active" ? (
                                  <span className="badge bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">
                                    Inactive
                                  </span>
                                )}
                              </td>
                              <td>{admin.location && admin.location.name}</td>
                              <td>
                                {admin.departmentGroup &&
                                  admin.departmentGroup.name}
                              </td>
                              <td>
                                {admin.departmentType &&
                                  admin.departmentType.name}
                              </td>
                              <td>
                                <div className="d-flex gap-2 align-items-center">
                                  <div className="flex-shrink-0">
                                    <button
                                      type="button"
                                      className="btn btn-success btn-icon waves-effect waves-light"
                                      onClick={() => handleEdit(admin._id)}
                                    >
                                      <i className="ri-pencil-fill"></i>
                                    </button>
                                  </div>
                                  <div className="flex-grow-1">
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(admin._id)}
                                      className="btn btn-danger btn-icon waves-effect waves-light"
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
                    <div>
                      <div className="table-responsive table-card mt-1 mb-1 text-right">
                        <DataTable
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
                          onChangePage={handlePageChange}
                          onSort={handleSort}
                        />
                      </div>
                    </div>

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Pagination */}
          {/* <nav>
            <ul className="pagination">
              {adminData.length > itemsPerPage && (
                <>
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
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
                    { length: Math.ceil(adminData.length / itemsPerPage) },
                    (_, i) => {
                      if (i < 10) {
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
                      currentPage === Math.ceil(adminData.length / itemsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(adminData.length / itemsPerPage)
                      }
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

export default AdminUser;