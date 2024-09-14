import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import FeatherIcon from "feather-icons-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SignContext from "../contextAPI/Context/SignContext";

const AssignDashboard = () => {
  const { GetAssignTaskBySpecDepartmentTypeandTaskType } = useContext(SignContext);
  document.title = "SubDashboard";
  const [tasks, setTasks] = useState([]);
  const [documents, setDocuments] = useState([]); // Array to store document paths or links
  const [loading, setLoading] = useState(true); // Loading state
  const { id1, id2 } = useParams();
  console.log("ID", id1, id2);

  const gettingid = async () => {
    setLoading(true); // Set loading to true when fetching data
    const res = await GetAssignTaskBySpecDepartmentTypeandTaskType(id1, id2);
    console.log("Is Megha Really Dumb??", res.success);
    setTasks(res.data);

    const documentsArray = []; // Temporary array to store document paths or links

    // Check if the response has data
    if (res.data && res.data.length > 0) {
      // Iterate through the data to find the relevant documents
      for (const item of res.data) {
        // Check for formlink
        if (item.formlink) {
          documentsArray.push(item.formlink);
        }
        // Check for uploaddocument
        else if (item.uploaddocument) {
          documentsArray.push(`${process.env.REACT_APP_BASE_URL}/${item.uploaddocument}`);
        }
        // Check for documentlink
        else if (item.documentlink) {
          documentsArray.push(item.documentlink);
        }
        else {
          documentsArray.push(null);
        }
      }
    }

    // Set the documents array to the state
    setDocuments(documentsArray);
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    gettingid();
  }, [id1, id2]);

  console.log("tasks", tasks);
  console.log("documents", documents);

  return (
    <div className="bg-white page-content">
      <Container fluid>
        <Row>
          <div className="d-flex justify-content-end">
            <Link to={`/subdashboard/${id1}`}>
              <button
                className="custom_hover btn btn-primary btn-color"
                type="submit"
                style={{
                  display: "flex",
                  fontSize: "18px",
                  width: "100%",
                }}
              >
                <i className="ri-function-line me-1 fs-18"></i>View Task
              </button>
              <br />
            </Link>
          </div>
          <div className="d-flex flex-wrap">
            {loading ? (
              <div>Loading...</div>
            ) : tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Col md={4} key={task._id} className="px-2">
                  <a href={documents[index]} target="_blank" rel="noopener noreferrer" className="card-link">
                    <div className="col-lg-12 col-lg-4">
                      <Card className="card-animate card-res" style={{ borderRadius: "15px" }}>
                        <CardBody className="rounded-20">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-semibold new-class fs-16 mb-0">
                                {task.documentdescription}
                              </p>
                              <ul className="ps-0 fs-14 mt-3" style={{ fontWeight: '800', listStyleType: 'none', color: "#495057" }}>
                                <li>{task.tasktypes.taskName}</li>
                                {/* <li>{task.documentdescription}</li> */}
                                {/* <li>{task.assignedby?.name}</li> */}
                                {/* <li>{task.documentname}</li> */}
                                <li>Assigned To : {task.employeeName && task.employeeName.length > 0 ? task.employeeName[0].name : "Template"}</li>
                              </ul>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title rounded-circle fs-2">
                                <FeatherIcon icon="file-text" className="text-white" />
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </a>
                </Col>
              ))
            ) : (
              <div>No Tools Assigned</div>
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default AssignDashboard;
