import classnames from "classnames";
import { Form, Formik } from "formik";

import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import * as Yup from "yup";

import { companies } from "../../common/data";
import SignContext from "../../contextAPI/Context/SignContext";

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  // const res1 = allcompany.find(({ _id }) => _id === companyId);
  // console.log("res",res1)
  // seta1(res1.companyJobCategorys)
  // setDepartment(res1.companyDepartments);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  //   const handleSavedcat = async (Values) => {
  //     const data1 = { ...Values, companyId, employeeId: empId };
  //     const res = await AddContact(data1);
  //     console.log("--------------data-------");
  //     console.log(res);
  //     navigate('/form');
  //   };

  return (
    <React.Fragment>
      <div className="flex-grow-1 mt-3 " style={{ marginLeft: "0px" }}>
        <button
          type="button"
          class="btn btn-primary btn-icon waves-effect waves-light"
          onClick={handleShow}
        >
          <i class="ri-eye-line"></i>
        </button>
      </div>

      <Modal size="xl" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <h5>Task Detail of HR Policy</h5>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6} md={12}>
              <div className="live-preview">
                <div className="table-responsive">
                  <Table className="align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th
                          scope="col"
                          colSpan={2}
                          style={{ textAlign: "center" }}
                        >
                          Task Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Task Name</td>
                        <td>Hr Policy</td>
                      </tr>
                      <tr>
                        <td>
                          Document
                          <br></br>Type
                        </td>
                        <td>File</td>
                      </tr>
                      <tr>
                        <td>Document File</td>
                        <td>
                          <a href="">View</a>
                        </td>
                      </tr>
                      <tr>
                        <td>Document Link</td>
                        <td>N/A</td>
                      </tr>
                      <tr>
                        <td>
                          Text
                          <br></br>Description
                        </td>
                        <td>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Velit, eius? .
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="live-preview">
                <div className="table-responsive">
                  <Table className="align-middle table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th
                          scope="col"
                          colSpan={2}
                          style={{ textAlign: "center" }}
                        >
                          Task Access
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Location</td>
                        <td>abc</td>
                      </tr>
                      <tr>
                        <td>
                          Department
                          <br></br>Group
                        </td>
                        <td>abc</td>
                      </tr>
                      <tr>
                        <td>Employee Roles</td>
                        <td>abc</td>
                      </tr>
                      <tr>
                        <td>
                          Employee
                          <br></br> Access
                        </td>
                        <td>abc || abc</td>
                      </tr>
                      <tr>
                        <td>
                          Employee
                          <br></br>Roles
                        </td>
                        <td>N/A</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>Active</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default Example;
