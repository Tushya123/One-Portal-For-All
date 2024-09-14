
import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import pinImage from '../../assets/images/pin.png';
import DataTable from "react-data-table-component";
import axios from 'axios';
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


const DepartmentGroup = () => {

  const { GetallDepartmentGroup, deletegrp } = useContext(SignContext);
  const [depgroup, setDepgroup] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalDepgroup, setOriginalDepgroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);


  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10); // Update to display 10 records per page

  // const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [currentItems, setCurrentItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([])


  // Step 3: Implement the onChange handler
  // const handleCheckboxChange = async () => {
  //   setIsChecked(!isChecked); // First, optimistically toggle the checkbox state
  //   const userId = '65e5630e77f3528f390e386e'; // Assuming this is the ID you want to update
  //   try {
  //     const response = await axios.patch(http://localhost:8007/pin/updateDepartmentGrp/${userId}, {
  //       DepartmentGroup: !isChecked, // Toggle based on the previous state
  //     });

  //     // If the request fails, Axios will throw an error, so if this line is reached,
  //     // it means the update was successful.
  //     console.log('Updated DepartmentGroup:', response.data);
  //     // Optionally, you might want to refetch your department groups list here to reflect the changes
  //   } catch (error) {
  //     console.error('Error updating DepartmentGroup:', error.response ? error.response.data : error.message);
  //     setIsChecked(isChecked); // Revert the checkbox state in case of an error
  //   }
  // };
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
          setIsChecked(response.data[0].DepartmentGroup);
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

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateDepartmentGrp/${cleanedUserID}`, {
        DepartmentGroup: checked,
      });

      console.log('Updated DepartmentGroup:', response.data);
      // Optionally, you might want to refetch your department groups list here to reflect the changes
    } catch (error) {
      console.error('Error updating DepartmentGroup:', error.response ? error.response.data : error.message);
      setIsChecked(!checked); // Revert the checkbox state in case of an error
    }
  };




  // const [loading, setLoading] = useState(false);
  // const fetchDepartmentGroups = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(${process.env.REACT_APP_BASE_URL}/departmentgroup/getdepartmentGroups, {
  //       skip: (currentPage - 1) * itemsPerPage,
  //       per_page: itemsPerPage,
  //       sorton: column || 'name',
  //       sortdir: sortDirection || 'asc',
  //       match: '',
  //     });


  //     const data = response.data;
  //     const count = response.data.length;

  //     setTotalRows(count);
  //     setCurrentItems(data);
  //   } catch (error) {
  //     console.error('Error fetching department groups:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchDepartmentGroups();
  }, [])
  useEffect(() => {
    fetchDepartmentGroups();
  }, [pageNo, perPage, column, sortDirection,]);

  const fetchDepartmentGroups = async () => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

      // Initialize column and sortDirection with default values
      const defaultColumn = "employeeName"; // Change this to your default column
      const defaultSortDirection = "asc"; // Change this to your default sort direction

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/departmentgroup/getdepartmentGroups`,
        {
          skip: skip,
          per_page: perPage,
          sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
          sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
          match: "",
        }
      );

      console.log("Response:", response);
      setDepgroup(response);
      setOriginalDepgroup(response);

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

  useEffect(() => {
    fetchDepartmentGroups();
  }, [currentPage, itemsPerPage, column, sortDirection]);

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
      selector: (_, index) => `DG${index + 1}`,
      sortable: true,
      style: {
        fontFamily: 'cursive', // Replace with your desired font-family
      },


    },
    {
      name: 'Type of Functions',
      selector: (row) => row.name,
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

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setPerPage(newPerPage);

  //   // If it's the first page, use the user-selected value; otherwise, set it to 4
  //   const newItemsPerPage = page === 1 ? newPerPage : 4;
  //   setItemsPerPage(newItemsPerPage);

  //   setCurrentPage(page); // Add this line to update the currentPage
  // };
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };
  // const handlePageChange = async (page) => {
  //   setCurrentPage(page);
  // };
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteDepartmentGroup = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await deletegrp(selectedForUpdate);
        fetchDepartmentGroups();
      } catch (error) {
        // Handle error if needed
        // console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit_dggroup/${id}`);
  };

  useEffect(() => {
    fetchDepartmentGroups();
  }, []);

  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    console.log("val", inputVal)

    let filterData = originalDepgroup.filter(
      (el) =>
        el.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setDepgroup(filterData);
    console.log("Filter", filterData)
    setBGForm(filterData);
    setTotalRows(filterData.length);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = depgroup.slice(indexOfFirstItem, indexOfLastItem);
  console.log(depgroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteDepartmentGroup()}
        onCloseClick={() => setDeleteModal(false)}
      />

      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <div className="row">
            <div >
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <div className="col-6">
                  <h4 className="mb-0 abc1111">Type of Function</h4>
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
                    <Link to="/add-dgroup" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Type of Functions</span>
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
                  <h4 class="card-title mb-0 flex-grow-1">Type of Function Details</h4>  </div>


                <CardBody className="mt-2">
                  <div className="mt-5">
                    <SearchComponent searchList={searchList} />
                  </div>
                  <div className="live-preview">

                    {/* Pagination */}
                    <DataTable className=" align-middle table-nowrap mb-0 table-with-border heading custom-table"
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
        </Container>
      </div>
    </>
  );


};

export default DepartmentGroup;