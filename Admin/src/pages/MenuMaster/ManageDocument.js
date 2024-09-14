import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
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
const ManageDocument = () => {
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />

          <Row>
            <Col xl={12}>
              <Card>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="User Detail" />
                  <div className="mt-3 mb-2">
                    <Link to="/add-document">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Manage Document
                      </button>
                    </Link>
                  </div>
                </div>
                {/* <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            
                            <th scope="col">ID</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email|Password</th>
                            <th scope="col">Group</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#VZ2110</td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <div className="flex-shrink-0">
                                  <img
                                    src={logo}
                                    alt="img"
                                    className="avatar-xs rounded-circle"
                                  />
                                </div>
                              </div>
                            </td>
                            <td>Vaishal</td>
                            <td>vaishal123@gmail.com | 123444</td>
                            <td>Core Function</td>
                            <td>Coree</td>
                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                              <div className="d-flex gap-2 align-items-center">
                                <div className="flex-shrink-0">
                                  <button
                                    type="button"
                                    class="btn btn-danger btn-icon waves-effect waves-light"
                                  >
                                    <i class="ri-pencil-fill"></i>
                                  </button>
                                </div>
                                <div className="flex-grow-1">
                                  <button
                                    type="button"
                                    class="btn btn-success btn-icon waves-effect waves-light"
                                  >
                                    <i class=" ri-delete-bin-5-line"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  
                </CardBody> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ManageDocument;
