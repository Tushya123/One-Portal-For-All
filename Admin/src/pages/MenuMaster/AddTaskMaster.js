// import React, { useState, useContext, useEffect } from "react";
// import BreadCrumb from "../../Components/Common/BreadCrumb";
// import UiContent from "../../Components/Common/UiContent";
// import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
// import { Link } from "react-router-dom";
// import logo from "../../assets/images/brands/slack.png";
// import DeleteModal from "../../common/DeleteModal";
// import { ToastContainer } from "react-toastify";
// import SearchComponent from "../../common/SearchComponent";
// import axios from "axios";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Input,
//   Label,
//   Table,
//   Container,
//   ListGroup,
//   ListGroupItem,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// import SignContext from "../../contextAPI/Context/SignContext";
// import { useNavigate } from "react-router-dom";

// const AddTaskMaster = () => {
//   const navigate = useNavigate();
//   const { GetallAddTask, DeleteAddTask } = useContext(SignContext);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [selectedForUpdate, setselectedForUpdate] = useState(null);
//   const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
//   const [originalAddtask, setOriginalAddTask] = useState(null);
//   const [task, setTask] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [itemsPerPage] = useState(5);


//   const [isChecked, setIsChecked] = useState(false);
//   const [pinnedItems, setPinnedItems] = useState([]);


//   const gettask = async () => {
//     const response = await GetallAddTask();
//     setTask(response.data);
//     setOriginalAddTask(response.data); // Update originalAddtask state
//   };

//   const handleDelete = (previewImage) => {
//     setselectedForUpdate(previewImage);
//     setDeleteModal(true);
//   };

//   const handleDeleteDepartmentType = async () => {
//     if (selectedForUpdate) {
//       setIsDeletebuttonLoading(true);

//       try {
//         await DeleteAddTask(selectedForUpdate);
//         gettask();
//       } catch (error) {
//         // Handle error if needed
//         // console.error("Error deleting department group:", error);
//       } finally {
//         setIsDeletebuttonLoading(false);
//         setDeleteModal(false);
//       }
//     }
//   };

//   const handleEdit = async (id) => {
//     navigate(`/edit-task/${id}`);
//   };

//   useEffect(() => {
//     gettask();
//   }, []);

//   const searchList = (e) => {
//     let inputVal = e.toLowerCase();
//     let filterData = originalAddtask.filter(
//       (el) =>
//         el.departmentType.name.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.taskType.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.accessLocation.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
//     );
//     setTask(filterData);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const userID = localStorage.getItem("Admin ID");
//   const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
//   useEffect(() => {
//     // Assuming you fetch pinned items and set it to the state
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`
//         );
//         setPinnedItems(response.data);

//         // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
//         if (response.data.length > 0) {
//           setIsChecked(response.data[0].AddTask);
//         }
//       } catch (error) {
//         console.error("Error fetching pinned items:", error);
//       }
//     };
//     fetchData();
//   }, [cleanedUserID]);

//   const handleCheckboxChange = async (event) => {
//     const checked = event.target.checked; // Get the new checked state directly from the event
//     setIsChecked(checked);

//     const userID = localStorage.getItem("Admin ID");
//     const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
//     // Assuming this is the ID you want to update
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/pin/updateAddTask/${cleanedUserID}`,
//         {
//           AddTask: checked, // Use the new checked state here for AddTask
//         }
//       );

//       console.log("Updated AddTask:", response.data);
//       // Optionally, you might want to handle the response or trigger further actions
//     } catch (error) {
//       console.error(
//         "Error updating AddTask:",
//         error.response ? error.response.data : error.message
//       );
//       setIsChecked(!checked); // Revert the checkbox state in case of an error
//       // Optionally, you might want to show an error message to the user
//     }
//   };

//   return (
//     <>
//       <ToastContainer closeButton={false} />
//       <DeleteModal
//         show={deleteModal}
//         isLoading={isDeletebuttonLoading}
//         onDeleteClick={() => handleDeleteDepartmentType()}
//         onCloseClick={() => setDeleteModal(false)}
//       />
//       <UiContent />
//       <div className="page-content">
//         <Container fluid={true}>
//         <div className="row">
//   <div className="col-12">
//     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//       <div className="d-flex align-items-center">
//         <h4 className="mb-0">Add Task</h4>
//         <Link to="/add-task" style={{ marginLeft: "1020px" }}>
//           <button className="custom_hover btn btn-primary btn-color" type="submit">
//             Add Task
//           </button>
//         </Link>
//       </div>
//       <div className="page-title-right">
//         <div className="form-check d-inline-block mb-0">
//           <input className="form-check-input" type="checkbox" id="formCheck1" style={{ visibility: 'hidden' }} />
//           {/* <label className="form-check-label" htmlFor="formCheck1">
//             <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
//           </label> */}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//           <Row>
//             <Col xl={12}>
//               <Card>

//               <div class="card-header align-items-center d-flex card-body">
//                                     <h4 class="card-title mb-0 flex-grow-1">Add Task Details</h4>  </div>

//                 <div className="d-flex flex-wrap justify-content-between align-items-center">

//                   <div>
//                     <input
//                       style={{
//                         visibility: "visible",
//                         width: "40px",
//                         marginRight: "10px",
//                         cursor: "pointer",
//                         zIndex: "1111",
//                         position: "absolute",
//                         marginLeft: "2px",
//                         width: "40px",
//                         height: "40px",
//                         opacity: "0",
//                       }}
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={handleCheckboxChange}
//                     />
//                     <label>
//                       <img
//                         src={
//                           "https://portfolio.barodaweb.com/Dev/OpaSystem.com/L1/assets/images/pin.png"
//                         }
//                         style={{
//                           width: "40px",
//                           marginRight: "10px",
//                           opacity: isChecked ? "1" : "0.4",
//                         }}
//                       />
//                     </label>
//                   </div>

//                 </div>

//                 <CardBody>
//                   <div className="live-preview">
//                     <SearchComponent searchList={searchList} />
//                     <div className="table-responsive">
//                       <Table className="align-middle table-nowrap mb-0 table-with-border">
//                         <thead className="table-light">
//                           <tr>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>ID</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Department Types Name</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Task Name </th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Task Types </th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Access Location</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Status</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentItems &&
//                             currentItems.map((type, index) => {
//                               return (
//                                 <tr key={type._id}>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{index + 1}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.departmentType.name}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.taskName}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.taskType}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.accessLocation}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>
//                                     {type.isActive ? (
//                                       <span className="badge bg-success">
//                                         Active
//                                       </span>
//                                     ) : (
//                                       <span className="badge bg-danger">
//                                         InActive
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td style={{ borderRight: '1px solid lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
//                                     <div className="d-flex gap-2 align-items-center">
//                                       <div className="flex-shrink-0">
//                                         <button
//                                           type="button"
//                                           className="btn btn-success btn-icon waves-effect waves-light"
//                                           onClick={() => handleEdit(type._id)}
//                                         >
//                                           <i className="ri-pencil-fill"></i>
//                                         </button>
//                                       </div>
//                                       <div className="flex-grow-1">
//                                         <button
//                                           type="button"
//                                           className="btn btn-danger btn-icon waves-effect waves-light"
//                                           onClick={() => handleDelete(type._id)}
//                                         >
//                                           <i className="ri-delete-bin-5-line"></i>
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                         </tbody>
//                       </Table>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>

//           {/* Pagination */}
//           <nav>
//             <ul className="pagination">
//               {task && task.length > itemsPerPage && (
//                 <>
//                   <li
//                     className={`page-item ${
//                       currentPage === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     >
//                       Previous
//                     </button>
//                   </li>
//                   {Array.from(
//                     { length: Math.ceil(task.length / itemsPerPage) },
//                     (_, i) => i + 1
//                   ).map((pageNumber) => (
//                     <li
//                       key={pageNumber}
//                       className={`page-item ${
//                         currentPage === pageNumber ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => paginate(pageNumber)}
//                         className="page-link"
//                       >
//                         {pageNumber}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       currentPage === Math.ceil(task.length / itemsPerPage)
//                         ? "disabled"
//                         : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage + 1)}
//                       disabled={
//                         currentPage === Math.ceil(task.length / itemsPerPage)
//                       }
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </nav>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default AddTaskMaster;
import React, { useState, useContext, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
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
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";

const AddTaskMaster = () => {
  const navigate = useNavigate();
  const { GetallAddTask, DeleteAddTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalAddtask, setOriginalAddTask] = useState(null);
  const [task, setTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1000);
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
  const gettask = async () => {
    const response = await GetallAddTask();
    setTask(response.data);
    setOriginalAddTask(response.data); // Update originalAddtask state
  };

  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteDepartmentType = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteAddTask(selectedForUpdate);
        fetchAddTask();
        gettask();
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
    navigate(`/edit-task/${id}`);
  };

  useEffect(() => {
    gettask();
  }, []);

  const searchList = (e) => {
    const inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Debugging
    // Call fetchAssignTask with the search term
    fetchAddTask(inputVal);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);

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
          setIsChecked(response.data[0].AddTask);
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
        `${process.env.REACT_APP_BASE_URL}/pin/updateAddTask/${cleanedUserID}`,
        {
          AddTask: checked, // Use the new checked state here for AddTask
        }
      );

      console.log("Updated AddTask:", response.data);
      // Optionally, you might want to handle the response or trigger further actions
    } catch (error) {
      console.error(
        "Error updating AddTask:",
        error.response ? error.response.data : error.message
      );
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  const fetchAddTask = async (searchTerm = "") => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }


      const defaultColumn = "Task Name";
      const defaultSortDirection = "asc";

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addtask/getassignlist`,
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

  const columns = [
    {
      name: 'ID',
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: {
        fontWeight: 'bold',
        fontFamily: 'cursive',
      },
      className: 'table-light',
    },
    {
      name: 'Department Types Name',
      selector: (row) => row.documentdepartmenttype.name,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: 'Tool Name',
      selector: (row) => row.taskName,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: 'Tool Type',
      selector: (row) => row.taskType,
      sortable: true,
      style: {
        fontFamily: 'cursive',
      },
    },
    {
      name: 'Access Location',
      selector: (row) => row.accessLocation,
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
    fetchAddTask();
  }, [pageNo, perPage, column, sortDirection,]);
  useEffect(() => {
    fetchAddTask();
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
                  <h4 className="mb-0 abc1111">Add Tool</h4>
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
                    <Link to="/add-task" >
                      <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
                        <i className="ri-add-line me-1 mb"></i>
                        <span className="abc1111">Add Tool</span>
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
                  <h4 class="card-title mb-0 flex-grow-1">Add Tool Details</h4>  </div>

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
                            <th scope="col">Department Types Name</th>
                            <th scope="col">Task Name </th>
                            <th scope="col">Task Types </th>
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
                                  <td>{type.departmentType.name}</td>
                                  <td>{type.taskName}</td>
                                  <td>{type.taskType}</td>
                                  <td>{type.accessLocation}</td>
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
                    <DataTable className="align-middle table-nowrap mb-0 table-with-border heading"
                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      sortServer
                      paginationPerPage={20}
                      pagination
                      paginationServer
                      paginationDefaultPage={currentPage}
                      paginationTotalRows={totalRows}
                      paginationRowsPerPageOptions={[20, 50, 100, totalRows]}
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

          {/* Pagination */}
          {/* <nav>
            <ul className="pagination">
              {task && task.length > itemsPerPage && (
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
                    { length: Math.ceil(task.length / itemsPerPage) },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(pageNumber)}
                        className="page-link"
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(task.length / itemsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(task.length / itemsPerPage)
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

export default AddTaskMaster;
