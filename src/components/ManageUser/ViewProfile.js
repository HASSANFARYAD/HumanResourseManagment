import React, { useEffect, useMemo, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CustomButtons from "../global_component/CustomButtons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  designationHistory,
  salaryHistory,
  workTimeHistory,
  personalDocumentDataTable,
} from "../redux/AdminController";
import {
  updateDesignationHistory,
  updateSalaryHistory,
  updateWorkHistory,
  updateSalaryAllownces,
} from "../redux/UserHistoryController";
import { deleteRecord, downloadSalarySlip } from "../redux/GlobalActions";
import DataTableComponent from "../global_component/DataTableComponent";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import CustomModal from "../global_component/CustomModal";
import PaySlip from "../global_component/PaySlip";

const ViewProfile = () => {
  const location = useLocation();
  const getRecord = location.state;
  const id =
    getRecord.id != undefined && getRecord.id != ""
      ? getRecord.id
      : getRecord.userId;

  const dispatch = useDispatch();

  const defaultTab = getRecord.userId ? getRecord.tabId : "home";
  const [key, setKey] = useState(defaultTab);
  // const [key, setKey] = useState("home");

  const [isLoading, setLoading] = useState(false);
  const [deletedRow, setDeletedRow] = useState(null);
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);

  // Document Download List
  const [documentData, setDocumentData] = useState([]);
  const [totalDocumentRows, setTotalDocumentRows] = useState(0);

  // Designation History State
  const [designationData, setDesignationData] = useState([]);
  const [totalDesignationRows, setTotalDesignationRows] = useState(0);
  const [isUpdateDesignationModalVisible, setUpdateDesignationModalVisibility] =
    useState(false);

  // Salary History State
  const [isUpdateSalaryModalVisible, setUpdateSalaryModalVisibility] =
    useState(null);
  const [salaryData, setSalaryData] = useState([]);
  const [totalSalaryRows, setTotalSalaryRows] = useState(0);
  const [isSalaryModalVisible, isSalaryModalVisibleVisibility] = useState(0);
  const [salaryRowDataInPaySlip, viewSalaryRowDataInPaySlip] = useState(null);
  const [salaryDetailsModalVisibility, addSalaryDetailsModalVisibility] =
    useState(null);
  const [
    isUpdateAllowncesModalVisibility,
    setIsUpdateAllowncesModalVisibility,
  ] = useState(null);

  // Work History State
  const [isUpdateWorkModalVisible, setUpdateWorkModalVisibility] =
    useState(false);
  const [workData, setWorkData] = useState([]);
  const [totalWorkRows, setTotalWorkRows] = useState(0);

  //#region DataTable Configurations

  const salaryTableButtons = [
    {
      id: 1,
      title: "View",
      onClick: (row) => viewSalary(row),
      className: "btn btn-sm btn-danger me-1",
      icon: "bi bi-eye",
    },
    {
      id: 2,
      title: "Download",
      onClick: (row) => downloadSalary(row),
      className: "btn btn-sm btn-success me-1",
      icon: "bi bi-arrow-down",
    },
    {
      id: 3,
      title: "Update Allowances",
      onClick: (row) => updateAllownces(row),
      className: "btn btn-sm btn-warning me-1",
      icon: "bi bi-pencil",
    },
  ];

  const salaryTableColumns = useMemo(() => [
    {
      name: "Actions",
      sortable: false,
      cell: (row) => <CustomButtons buttons={salaryTableButtons} row={row} />,
    },
    {
      name: "Basic Salary",
      selector: (row) => row.grossSalary,
      sortable: false,
    },
    {
      name: "Provident Amount",
      selector: (row) => row.providentFund,
      sortable: false,
    },
    {
      name: "Income Tax",
      selector: (row) => row.incomeTax,
      sortable: false,
    },
    {
      name: "Pay Period",
      selector: (row) => row.payPeriod,
      sortable: false,
    },
  ]);

  const designationTableButtons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => onDeleteDesignation(row),
      className: "btn btn-sm btn-danger me-1",
      icon: "bi bi-trash",
    },
  ];

  const designationTableColumns = useMemo(() => [
    {
      name: "Actions",
      sortable: false,
      cell: (row) => (
        <CustomButtons buttons={designationTableButtons} row={row} />
      ),
    },
    {
      name: "Employement Status",
      selector: (row) => row.employementStatus,
      sortable: false,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: false,
    },
    {
      name: "From",
      selector: (row) => row.from,
      sortable: false,
    },
    {
      name: "To",
      selector: (row) => row.to,
      sortable: false,
    },
  ]);

  const workTableButtons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => onDeleteDesignation(row),
      className: "btn btn-sm btn-danger me-1",
      icon: "bi bi-trash",
    },
  ];

  const workTableColumns = useMemo(() => [
    {
      name: "Actions",
      sortable: false,
      cell: (row) => <CustomButtons buttons={workTableButtons} row={row} />,
    },
    {
      name: "CheckIn Time",
      selector: (row) => row.checkinTime,
      sortable: false,
    },
    {
      name: "CheckOut Time",
      selector: (row) => row.checkoutTime,
      sortable: false,
    },
    {
      name: "Relaxation Time",
      selector: (row) => row.relaxationTime,
      sortable: false,
    },
    {
      name: "From",
      selector: (row) => row.from,
      sortable: false,
    },
    {
      name: "To",
      selector: (row) => row.to,
      sortable: false,
    },
  ]);

  const documentDownloadColumns = useMemo(() => [
    {
      name: "Document Type",
      selector: (row) => row.documentType,
      sortable: true,
    },
    {
      name: "Download Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
  ]);

  //#endregion

  //#region Event Handles
  const handleDeleteSalary = (row) => {
    setDeletedRow(row);
    setDeleteModalVisibility(true);
    isSalaryModalVisibleVisibility(true);
  };

  const onDeleteDesignation = (row) => {
    setDeletedRow(row);
    setDeleteModalVisibility(true);
  };
  //#endregion

  //#region Data Fetching and Manipulation
  const fetchSalary = async (
    page = 1,
    size = 10,
    sortColumn = "",
    sortDirection = "",
    searchParam = "",
    userId,
    startDate = "",
    endDate = ""
  ) => {
    setLoading(true);
    const params = {
      page: page,
      size: size,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchParam: searchParam,
      userId: id,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await dispatch(salaryHistory(params));

      if (salaryHistory.fulfilled.match(response)) {
        setSalaryData(response?.payload?.list);
        setTotalSalaryRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDesignation = async (
    page = 1,
    size = 10,
    sortColumn = "",
    sortDirection = "",
    searchParam = "",
    userId,
    startDate = "",
    endDate = ""
  ) => {
    setLoading(true);
    const params = {
      page: page,
      size: size,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchParam: searchParam,
      userId: id,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await dispatch(designationHistory(params));

      if (designationHistory.fulfilled.match(response)) {
        setDesignationData(response?.payload?.list);
        setTotalDesignationRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchWorkHistory = async (
    page = 1,
    size = 10,
    sortColumn = "",
    sortDirection = "",
    searchParam = "",
    userId,
    startDate = "",
    endDate = ""
  ) => {
    setLoading(true);
    const params = {
      page: page,
      size: size,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchParam: searchParam,
      userId: id,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await dispatch(workTimeHistory(params));

      if (workTimeHistory.fulfilled.match(response)) {
        setWorkData(response?.payload?.list);
        setTotalWorkRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchDocumentList = async (
    page = 1,
    size = 10,
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    setLoading(true);
    const params = {
      page: page,
      size: size,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      searchParam: searchParam,
      userId: id,
    };

    try {
      const response = await dispatch(personalDocumentDataTable(params));

      if (personalDocumentDataTable.fulfilled.match(response)) {
        setDocumentData(response?.payload?.list);
        setTotalDocumentRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //#endregion

  const handleTabSelect = (selectedKey) => {
    // Add your logic here based on the selected tab key
    console.log(`Selected tab: ${selectedKey}`);

    // You can call different functions based on the selectedKey
    switch (selectedKey) {
      case "home":
        // Call function for Home tab
        break;
      case "designation-History":
        fetchDesignation();
        break;
      case "salary-History":
        fetchSalary();
        break;
      case "work-History":
        fetchWorkHistory();
        break;
      case "document-List":
        fetchDocumentList();
        break;
      default:
        break;
    }

    // Update the active key in state
    setKey(selectedKey);
  };

  useEffect(() => {
    handleTabSelect(defaultTab);
  }, [defaultTab]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: "",
      employeeId: "",
      email: "",
      joinDate: "",
      workingHours: "",
      employementStatus: "",
      designation: "",
      role: "",
      bankName: "",
      accountNumber: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(updateDesignationHistory(values));
      } catch (error) {
      } finally {
        handleCloseModal();
      }
    },
  });

  const updateDesignation = () => {
    setFieldValue("id", getRecord.id);
    setFieldValue("bankName", getRecord.bankName);
    setFieldValue("accountNumber", getRecord.accountNumber);
    setFieldValue("role", getRecord.role);
    setFieldValue("employeeId", getRecord.employeeId);
    setFieldValue("email", getRecord.email);
    setFieldValue("joinDate", getRecord.joinDate);
    setFieldValue("workingHours", getRecord.workingHours);
    setUpdateDesignationModalVisibility(true);
  };

  const handleCloseModal = () => {
    isUpdateDesignationModalVisible && handleTabSelect("designation-History");
    isUpdateAllowncesModalVisibility && handleTabSelect("salary-History");
    setUpdateDesignationModalVisibility(false);
    setUpdateSalaryModalVisibility(false);
    setUpdateSalaryModalVisibility(false);
    setDeleteModalVisibility(false);
    setUpdateWorkModalVisibility(false);
    addSalaryDetailsModalVisibility(false);
    setIsUpdateAllowncesModalVisibility(false);
  };

  const salaryHistoryForm = useFormik({
    initialValues: {
      id: "",
      bankName: "",
      accountNumber: "",
      currentSalary: "",
      providentAmount: "",
      taxAmount: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(updateSalaryHistory(values));
      } catch (error) {
      } finally {
        handleCloseModal();
      }
    },
  });

  const workHistoryForm = useFormik({
    initialValues: {
      userId: "",
      checkinTime: "",
      checkoutTime: "",
      relaxationTime: "",
      from: "",
      to: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(getRecord.id);
        await dispatch(updateWorkHistory(values));
      } catch (error) {
      } finally {
        handleCloseModal();
      }
    },
  });

  const updateSalaryAllownce = useFormik({
    initialValues: {
      id: "",
      taxableAllowance: "",
      nonCorporateAllowance: "",
      encashmentLeave: "",
      otherAllowance: "",
      corporateCarFacility: "",
      committee: "",
      otherCollection: "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(updateSalaryAllownces(values));
      } catch (error) {
      } finally {
        handleCloseModal();
      }
    },
  });

  const onUpdateWorkHistory = () => {
    workHistoryForm.setFieldValue("userId", getRecord.id);

    setUpdateWorkModalVisibility(true);
  };

  const updateSalary = () => {
    salaryHistoryForm.setFieldValue("id", getRecord.id);
    salaryHistoryForm.setFieldValue("currentSalary", getRecord.currentSalary);
    salaryHistoryForm.setFieldValue(
      "providentAmount",
      getRecord.providentAmount
    );
    salaryHistoryForm.setFieldValue("taxAmount", getRecord.taxAmount);
    setUpdateSalaryModalVisibility(true);
  };

  const deleteUserRecord = async (values) => {
    const endpoint =
      values !== "designation"
        ? `Admin/DeleteSalaryHistory?id=${deletedRow.id}`
        : `Admin/DeleteDesignationHistory?id=${deletedRow.id}`;

    await dispatch(deleteRecord(endpoint));
    if (values !== "designation") {
      fetchSalary();
    } else {
      fetchDesignation();
    }
    handleCloseModal();
  };

  const viewSalary = async (row) => {
    viewSalaryRowDataInPaySlip(row);
    setUpdateSalaryModalVisibility(true);
  };

  const addSalaryDetails = async () => {
    salaryHistoryForm.setFieldValue("id", getRecord.id);
    addSalaryDetailsModalVisibility(true);
  };

  const updateAllownces = async (row) => {
    updateSalaryAllownce.setFieldValue("id", row.id);
    setIsUpdateAllowncesModalVisibility(true);
  };

  const downloadSalary = async (row) => {
    await dispatch(downloadSalarySlip(row.id));
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
        {!getRecord.userId && (
          <Tab eventKey="home" title="Home">
            <Row>
              <Col md={3} sm={12} className="offset-md-9 text-end">
                <Button variant="primary" onClick={() => addSalaryDetails()}>
                  Add Salary Details
                </Button>
              </Col>
            </Row>
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
        )}
        <Tab eventKey="designation-History" title="Designation History">
          <Row>
            <Col md={3} className="offset-md-9 text-end">
              <Button variant="warning" onClick={() => updateDesignation()}>
                Add New Designation
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="o-hidden border-0 shadow-lg my-3">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={designationTableColumns}
                    data={designationData}
                    pagination
                    paginationServer
                    progressPending={isLoading}
                    paginationTotalRows={totalDesignationRows}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="salary-History" title="Salary History">
          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="o-hidden border-0 shadow-lg my-3">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={salaryTableColumns}
                    data={salaryData}
                    pagination
                    paginationServer
                    progressPending={isLoading}
                    paginationTotalRows={totalSalaryRows}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="work-History" title="Work History">
          <Row>
            <Col md={3} className="offset-md-9 text-end">
              <Button variant="primary" onClick={() => onUpdateWorkHistory()}>
                Add New Work History
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="o-hidden border-0 shadow-lg my-3">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={workTableColumns}
                    data={workData}
                    pagination
                    paginationServer
                    progressPending={isLoading}
                    paginationTotalRows={totalWorkRows}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="document-List" title="Document History">
          <Row className="justify-content-center">
            <Col md={12}>
              <Card className="o-hidden border-0 shadow-lg my-3">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={documentDownloadColumns}
                    data={documentData}
                    pagination
                    paginationServer
                    progressPending={isLoading}
                    paginationTotalRows={totalDocumentRows}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <CustomModal
        show={isUpdateDesignationModalVisible}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-warning text-white py-2"
        title={"Designation Record"}
        body={
          <>
            <form method="post" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label
                        className="form-label ml-1 text-bold"
                        htmlFor="exampleInputFirstName"
                      >
                        Designation Title
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputFirstName"
                        placeholder="Designation Title"
                        value={values.designation}
                        onBlur={handleBlur("designation")}
                        onChange={handleChange("designation")}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label
                        className="form-label ml-1 text-bold"
                        htmlFor="exampleInputLastName"
                      >
                        Employement Status
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputLastName"
                        placeholder="Employement Status"
                        value={values.employementStatus}
                        onBlur={handleBlur("employementStatus")}
                        onChange={handleChange("employementStatus")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Join Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-user"
                        value={values.joinDate}
                        onBlur={handleBlur("joinDate")}
                        onChange={handleChange("joinDate")}
                        disabled={values.joinDate ? true : false}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Working Hours
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-user"
                        value={values.workingHours}
                        onBlur={handleBlur("workingHours")}
                        onChange={handleChange("workingHours")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        value={values.bankName}
                        onBlur={handleBlur("bankName")}
                        onChange={handleChange("bankName")}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Account Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        value={values.accountNumber}
                        onBlur={handleBlur("accountNumber")}
                        onChange={handleChange("accountNumber")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button className="btn btn-warning" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />

      {isUpdateSalaryModalVisible && handleCloseModal ? (
        <CustomModal
          show={isUpdateSalaryModalVisible}
          onHide={handleCloseModal}
          size="xl"
          classes="bg-info text-white py-2"
          title={"Salary Slip"}
          body={
            <>
              <PaySlip paySlip={salaryRowDataInPaySlip} />
            </>
          }
        />
      ) : (
        <></>
      )}

      <CustomModal
        show={salaryDetailsModalVisibility}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-primary text-white py-2"
        title={"Work History"}
        body={
          <>
            <form method="post" onSubmit={salaryHistoryForm.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        className="form-control form-control-user"
                        value={salaryHistoryForm.values.bankName}
                        onBlur={salaryHistoryForm.handleBlur("bankName")}
                        onChange={salaryHistoryForm.handleChange("bankName")}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="12365MA75"
                        className="form-control form-control-user"
                        value={salaryHistoryForm.values.accountNumber}
                        onBlur={salaryHistoryForm.handleBlur("accountNumber")}
                        onChange={salaryHistoryForm.handleChange(
                          "accountNumber"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Current Salary
                      </label>
                      <input
                        placeholder="000"
                        type="number"
                        step="0.1"
                        min="0"
                        className="form-control form-control-user"
                        value={salaryHistoryForm.values.currentSalary}
                        onBlur={salaryHistoryForm.handleBlur("currentSalary")}
                        onChange={salaryHistoryForm.handleChange(
                          "currentSalary"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Provident Fund
                      </label>
                      <input
                        placeholder="000"
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control form-control-user"
                        value={salaryHistoryForm.values.providentAmount}
                        onBlur={salaryHistoryForm.handleBlur("providentAmount")}
                        onChange={salaryHistoryForm.handleChange(
                          "providentAmount"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Tax Amount
                      </label>
                      <input
                        placeholder="000"
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control form-control-user"
                        value={salaryHistoryForm.values.taxAmount}
                        onBlur={salaryHistoryForm.handleBlur("taxAmount")}
                        onChange={salaryHistoryForm.handleChange("taxAmount")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        show={isUpdateWorkModalVisible}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-primary text-white py-2"
        title={"Work History"}
        body={
          <>
            <form method="post" onSubmit={workHistoryForm.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Check-In Time
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control form-control-user"
                        value={workHistoryForm.values.checkinTime}
                        onBlur={workHistoryForm.handleBlur("checkinTime")}
                        onChange={workHistoryForm.handleChange("checkinTime")}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Check-Out Time
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control form-control-user"
                        value={workHistoryForm.values.checkoutTime}
                        onBlur={workHistoryForm.handleBlur("checkoutTime")}
                        onChange={workHistoryForm.handleChange("checkoutTime")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Relaxation Time (in minutes)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="120"
                        className="form-control form-control-user"
                        value={workHistoryForm.values.relaxationTime}
                        onBlur={workHistoryForm.handleBlur("relaxationTime")}
                        onChange={workHistoryForm.handleChange(
                          "relaxationTime"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">From</label>
                      <input
                        type="date"
                        className="form-control form-control-user"
                        value={workHistoryForm.values.from}
                        onBlur={workHistoryForm.handleBlur("from")}
                        onChange={workHistoryForm.handleChange("from")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        show={isUpdateAllowncesModalVisibility}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-warning text-white py-2"
        title={"Update Allownces"}
        body={
          <>
            <form method="post" onSubmit={updateSalaryAllownce.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Taxable Allowance
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.taxableAllowance}
                        onBlur={updateSalaryAllownce.handleBlur(
                          "taxableAllowance"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "taxableAllowance"
                        )}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Non-Corporate Allowance
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={
                          updateSalaryAllownce.values.nonCorporateAllowance
                        }
                        onBlur={updateSalaryAllownce.handleBlur(
                          "nonCorporateAllowance"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "nonCorporateAllowance"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Encashment Leaves
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.encashmentLeave}
                        onBlur={updateSalaryAllownce.handleBlur(
                          "encashmentLeave"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "encashmentLeave"
                        )}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Other Allowance
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.otherAllowance}
                        onBlur={updateSalaryAllownce.handleBlur(
                          "otherAllowance"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "otherAllowance"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Corporate Car Facility
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.corporateCarFacility}
                        onBlur={updateSalaryAllownce.handleBlur(
                          "corporateCarFacility"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "corporateCarFacility"
                        )}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Committee
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.committee}
                        onBlur={updateSalaryAllownce.handleBlur("committee")}
                        onChange={updateSalaryAllownce.handleChange(
                          "committee"
                        )}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Other Collection
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalaryAllownce.values.otherCollection}
                        onBlur={updateSalaryAllownce.handleBlur(
                          "otherCollection"
                        )}
                        onChange={updateSalaryAllownce.handleChange(
                          "otherCollection"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        show={isDeleteModalVisible}
        onHide={handleCloseModal}
        size="md"
        classes="bg-danger text-white py-2"
        title={"Delete"}
        body={
          <>
            <p>
              Are you absolutely certain you want to permanently delete this
              record? Please be aware that deleting this record is an
              irreversible action.
            </p>
            <p>Please reaffirm your decision to proceed.</p>
          </>
        }
        footer={
          <>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() =>
                isSalaryModalVisible
                  ? deleteUserRecord()
                  : deleteUserRecord("designation")
              }
            >
              Confirm
            </button>
          </>
        }
      />
    </>
  );
};

export default ViewProfile;
