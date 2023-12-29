import React, { useState } from "react";
import { Card, Col, Form, Row, Tabs, Tab } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const CompanyProfile = () => {
  const location = useLocation();
  const getRecord = location.state;
  console.log("getRecord", getRecord);
  const [key, setKey] = useState("company-Profile");

  const handleTabSelect = (selectedKey) => {
    console.log(`Selected tab: ${selectedKey}`);

    switch (selectedKey) {
      case "company-Profile":
        break;
      case "user-Profile":
        break;
      default:
        break;
    }

    setKey(selectedKey);
  };
  return (
    <>
      <Tabs
        id="justify-tab-example"
        activeKey={key}
        onSelect={handleTabSelect}
        className="mb-3"
        justify
      >
        <Tab eventKey="company-Profile" title="Company Profile">
          <Row>
            <Col md={3} sm={12} className="offset-md-9 text-end">
              <NavLink className="btn btn-primary btn-sm" to="/add-company">
                <i className="bi bi-building-add"></i>
                <span> Add New Company </span>
              </NavLink>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col md={3}>
                <Card className="o-hidden border-0 shadow-lg p-3 mt-3">
                  <img
                    src={getRecord.companyProfile}
                    className="img-fluid"
                    style={{ width: "100%", height: "250px" }}
                  />
                </Card>
              </Col>
              <Col md={9}>
                <Card className="o-hidden border-0 shadow-lg p-3 mt-3">
                  <Row>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.companyName || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.companyContact || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.companyAddress || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </Tab>
        <Tab eventKey="user-Profile" title="User Profile">
          <Form>
            <Row>
              <Col md={3}>
                <Card className="o-hidden border-0 shadow-lg my-3">
                  <img src={getRecord.profile} />
                </Card>
                <Card className="o-hidden border-0 shadow-lg my-3">
                  <img src={getRecord.cnicFront} />
                </Card>
                <Card className="o-hidden border-0 shadow-lg my-3">
                  <img src={getRecord.cnicBack} />
                </Card>
              </Col>

              <Col md={9}>
                <Card className="o-hidden border-0 shadow-lg p-3 mt-3">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.firstName || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.lastName || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.userName || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.email || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.dob || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.gender || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Primary Contact</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.primaryContact || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Secondary Contact</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.secondaryContact || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.address || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.employeeId || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Join Date</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.joinDate || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Designation</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.designation || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Employement Status</Form.Label>
                        <Form.Control
                          type="text"
                          value={getRecord.employementStatus || ""}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </Tab>
      </Tabs>
    </>
  );
};

export default CompanyProfile;
