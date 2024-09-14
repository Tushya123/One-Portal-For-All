import React, { useState, useEffect, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import { useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import pinImage from '../../assets/images/pin.png';
import DataTable from "react-data-table-component";
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

const CommunityUpdateMaster = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [
    originalCommunityRequiredDetails,
    setOriginalCommunityRequiredDetails,
  ] = useState([]);
  const { getReqCommDetails, DeleteCommunityMaster } = useContext(SignContext);

  const [communityRequiredDetails, setCommunityRequiredDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const getreqCommDetails = async () => {
    const res = await getReqCommDetails();
    return res;
    setCommunityRequiredDetails(res.data);
    setOriginalCommunityRequiredDetails(res.data);
  };

  const handleDelete = (previewImage) => {
    setSelectedForUpdate(previewImage);
    setDeleteModal(true);
  };
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  const handleDeleteDepartmentType = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteCommunityMaster(selectedForUpdate);
        // getreqCommDetails();
        getReqCommDetails();
        fetchCommunity();
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
    navigate(`/edit-communitymaster/${id}`);
  };

  useEffect(() => {
    getreqCommDetails();
  }, []);
  useEffect(() => {
    fetchCommunity();
    getReqCommDetails();
    getReqCommDetails();
    fetchCommunity();
  }, []);

  const searchList = (e) => {
    const inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Debugging
    // Call fetchAssignTask with the search term
    fetchCommunity(inputVal);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = communityRequiredDetails.slice(indexOfFirstItem, indexOfLastItem);

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
          setIsChecked(response.data[0].CommunityUpdateMaster);
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
        `${process.env.REACT_APP_BASE_URL}/pin/updateCommunityUpdateMaster/${cleanedUserID}`,
        {
          CommunityUpdateMaster: checked, // Use the new checked state here for CommunityUpdateMaster
        }
      );

      console.log("Updated CommunityUpdateMaster:", response.data);
      // Optionally, you might want to handle the response or trigger further actions
    } catch (error) {
      console.error(
        "Error updating CommunityUpdateMaster:",
        error.response ? error.response.data : error.message
      );
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  const fetchCommunity = async (searchTerm = "") => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

      const defaultColumn = "community name";
      const defaultSortDirection = "asc";

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/communitymaster/communitylist`,
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
  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}/${uploadimage}`;
    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: '75px', height: '75px', padding: "5px" }}
      />
    );
  };

  const columns = [
    {
      name: "ID",
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: {
        fontWeight: "bold",
        fontFamily: "curisve",
      },
      className: "table-light",
    },
    {
      name: "Image",
      selector: (row) => renderImage(row.uploadimage),
      sortable: true,
      style: {
        fontFamily: 'cursive',

      },
    },
    {
      name: "Community Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },

    {
      name: "Community Message",
      selector: (row) => row.message,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) =>
        row.isActive ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
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
  useEffect(() => {
    fetchCommunity();
  }, [pageNo, perPage, column, sortDirection]);

  useEffect(() => {
    fetchCommunity();
  }, [currentPage, itemsPerPage, column, sortDirection]);
  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteDepartmentType()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <div className="row">
            <div >
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h4 className="mb-0 abc1111">Community Update Master</h4>
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
                    <Link to="/add-community" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Community Update</span>
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
            <Col xl={14}>
              <Card>
                <div class="card-header align-items-center d-flex card-body">
                  <h4 class="card-title mb-0 flex-grow-1">Community Details</h4>  </div>

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
                            <th scope="col" width="12px">
                              Uploaded Images
                            </th>
                            <th scope="col" width="20px">
                              Community Title
                            </th>
                            <th scope="col">Community Message</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((type, index) => {
                            return (
                              <tr key={type._id}>
                                <td>{index + 1}</td>
                                <td>
                                  {type.uploadimage ? (
                                    <img
                                      src={${process.env.REACT_APP_BASE_URL}/${type.uploadimage}}
                                      alt="Admin"
                                      style={{ height: "75px", width: "75px" }}
                                    />
                                  ) : (
                                    "No Image"
                                  )}
                                </td>
                                <td style={{ padding: "10px" }}>{type.name}</td>
                                <td>{type.message}</td>
                                <td>
                                  {type.isActive ? (
                                    <span className="badge bg-success">Active</span>
                                  ) : (
                                    <span className="badge bg-danger">InActive</span>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex gap-2 align-items-center">
                                    <div className="flex-shrink-0">
                                      <button
                                        type="button"
                                        className="btn btn-success btn-icon waves-effect waves-light"
                                        onClick={() => handleEdit(type._id)}
                                      >
                                        <i className="ri-pencil-fill"></i>
                                      </button>
                                    </div>
                                    <div className="flex-grow-1">
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-icon waves-effect waves-light"
                                        onClick={() => handleDelete(type._id)}
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

                    {/* Pagination */}
                    {/* <nav>
                      <ul className="pagination">
                        {Array.from(
                          { length: Math.ceil(communityRequiredDetails.length / itemsPerPage) },
                          (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${currentPage === i + 1 ? "active" : ""
                                }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </nav> */}
                    {/* {fetchCommunity()} */}

                    <DataTable className=" align-middle table-nowrap mb-0 table-with-border heading"

                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      paginationPerPage={20}
                      sortServer
                      pagination
                      paginationServer
                      paginationDefaultPage={currentPage}
                      paginationTotalRows={totalRows}
                      paginationRowsPerPageOptions={[
                        10,
                        20,
                        50,
                        100,
                        totalRows,
                      ]}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
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

export default CommunityUpdateMaster;
