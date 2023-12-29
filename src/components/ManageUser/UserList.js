import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import DataTableComponent from "../global_component/DataTableComponent";
import CustomButtons from "../global_component/CustomButtons";
import {
  usersList,
  salaryHistory,
  designationHistory,
} from "../redux/AdminController";
import { deleteRecord, generateSalarySlip } from "../redux/GlobalActions";
import CustomModal from "../global_component/CustomModal";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  updateDesignationHistory,
  updateSalaryHistory,
} from "../redux/UserHistoryController";
import { Button } from "react-bootstrap";
import DocumentDownload from "../ManageDocument/DocumentDownload";

const UsersList = () => {
  //#region State and Constants
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Form Buttons
  const [disableButton, setDisableButton] = useState(false);
  const [sendEmailButton, setSendEmailButton] = useState(false);

  // User List State
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setsortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToUpdateDesignation, setRowToUpdateDesignation] = useState(null);
  const [showUpdateDesignationModal, setShowUpdateDesignationModal] =
    useState(null);
  const [showUpdateSalaryModal, setShowUpdateSalaryModal] = useState(null);

  // Salary History State
  const [salaryData, setSalaryData] = useState([]);
  const [salaryTotalRows, setSalaryTotalRows] = useState(0);
  const [showSalaryModal, setShowSalaryModal] = useState(false);

  // Designation History State
  const [designationData, setDesignationData] = useState([]);
  const [designationTotalRows, setDesignationTotalRows] = useState(0);
  const [showDesignationModal, setShowDesignationModal] = useState(false);

  //Documents
  const [userId, setUserId] = useState(null);
  const [showDocumentDownloadModal, setshowDocumentDownloadModal] =
    useState(null);

  //#endregion

  //#region DataTable Configurations
  const { userAuth } = useSelector((state) => state.authentication);
  let buttons;
  if (userAuth.role === "SuperAdmin") {
    buttons = [
      {
        id: 1,
        title: "Delete",
        onClick: (row) => onDelete(row),
        className: "btn btn-sm btn-danger me-1 rounded-circle",
        icon: "bi bi-trash",
      },
      {
        id: 2,
        title: "Update",
        onClick: (row) => onUpdate(row),
        className: "btn btn-sm btn-success me-1 rounded-circle",
        icon: "bi bi-pencil-square",
      },
      {
        id: 3,
        title: "View Profile",
        onClick: (row) => ViewProfileButton(row),
        className: "btn btn-sm btn-dark me-1 rounded-circle",
        icon: "bi bi-eye",
      },
    ];
  } else {
    buttons = [
      {
        id: 1,
        title: "Delete",
        onClick: (row) => onDelete(row),
        className: "btn btn-sm btn-danger me-1 rounded-circle",
        icon: "bi bi-trash",
      },
      {
        id: 2,
        title: "Update",
        onClick: (row) => onUpdate(row),
        className: "btn btn-sm btn-success me-1 rounded-circle",
        icon: "bi bi-pencil-square",
      },
      {
        id: 3,
        title: "Document Download",
        onClick: (row) => onDocumentDownload(row),
        className: "btn btn-sm btn-info me-1 rounded-circle",
        icon: "bi bi-file-earmark-medical",
      },
      {
        id: 4,
        title: "View Profile",
        onClick: (row) => ViewProfileButton(row),
        className: "btn btn-sm btn-dark me-1 rounded-circle",
        icon: "bi bi-eye",
      },
    ];
  }

  const columns = useMemo(() => {
    return userAuth.role === "SuperAdmin"
      ? [
          {
            name: "Actions",
            sortable: false,
            cell: (row) => <CustomButtons buttons={buttons} row={row} />,
          },
          {
            name: "CompanyName",
            selector: (row) => row.companyName,
            sortable: false,
          },
          {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Primary Contact",
            selector: (row) => row.primaryContact,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Profile Picture",
            cell: (row) => (
              <>
                <a
                  href={row.profile ? row.profile : "img/undraw_profile.svg"}
                  target="_blank"
                >
                  <img
                    src={row.profile ? row.profile : "img/undraw_profile.svg"}
                    alt={row.firstName + " " + row.lastName}
                    width="25"
                    height="25"
                  />
                </a>
              </>
            ),
          },
        ]
      : [
          {
            name: "Actions",
            style: { width: "800px" },
            sortable: false,
            cell: (row) => <CustomButtons buttons={buttons} row={row} />,
          },
          {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Primary Contact",
            selector: (row) => row.primaryContact,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Designation",
            selector: (row) => row.designation,
            sortable: true,
            sortFunction: () => [],
          },
          {
            name: "Profile Picture",
            cell: (row) => (
              <>
                <a
                  href={row.profile ? row.profile : "img/undraw_profile.svg"}
                  target="_blank"
                >
                  <img
                    src={row.profile ? row.profile : "img/undraw_profile.svg"}
                    alt={row.firstName + " " + row.lastName}
                    width="25"
                    height="25"
                  />
                </a>
              </>
            ),
          },
        ];
  }, [userAuth.role]);

  const salaryTableButtons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => onDeleteSalary(row),
      className: "btn btn-sm btn-danger me-1",
      icon: "bi bi-trash",
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
      selector: (row) => row.basicSalary,
      sortable: false,
    },
    {
      name: "Provident Amount",
      selector: (row) => row.providentAmount,
      sortable: false,
    },
    {
      name: "Tax Amount",
      selector: (row) => row.taxAmount,
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

  const designationTableButtons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => onDeleteSalary(row),
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
  //#endregion

  //#region Data Fetching and Manipulation
  const fetchUsers = async (
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
    };

    try {
      const response = await dispatch(usersList(params));

      if (usersList.fulfilled.match(response)) {
        setData(response?.payload?.list);
        setTotalRows(response?.payload?.totalRecords);
        if (response?.payload?.list[0].sendEmailActivationButton) {
          setSendEmailButton(true);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await dispatch(salaryHistory(params));

      if (salaryHistory.fulfilled.match(response)) {
        setSalaryData(response?.payload?.list);
        setSalaryTotalRows(response?.payload?.totalRecords);
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
      userId: userId,
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await dispatch(designationHistory(params));

      if (designationHistory.fulfilled.match(response)) {
        setDesignationData(response?.payload?.list);
        setDesignationTotalRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    console.log("currentPage::", currentPage, perPage);
    const params = {
      page: currentPage,
      size: perPage,
      sortColumn,
      sortDirection,
      searchParam,
    };
    fetchUsers(currentPage, perPage, sortColumn, sortDirection, searchParam);
  }, [currentPage, perPage, sortColumn, sortDirection, searchParam]);
  //#endregion

  //#region Event Handlers

  const handlePageChange = (page) => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleSort = (column, direction) => {
    if (column.name === "Name") {
      setsortColumn("FirstName");
    } else {
      setsortColumn(column.name);
    }
    setSortDirection(direction === "asc" ? "asc" : "desc");
  };

  const handleSearch = (e) => {
    setSearchParam(e.target.value ? e.target.value : "");
  };

  const onDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  const onDeleteSalary = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setRowToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteUserRecord = async () => {
    let endpoint = "";
    if (showSalaryModal) {
      endpoint = `Admin/DeleteSalaryHistory?id=${rowToDelete.id}`;
    } else if (showDesignationModal) {
      endpoint = `Admin/DeleteDesignationHistory?id=${rowToDelete.id}`;
    } else {
      endpoint = `Admin/DeleteUser?id=${rowToDelete.id}`;
    }
    await dispatch(deleteRecord(endpoint));
    await fetchUsers();
    handleCloseDeleteModal();
    handleCloseModal();
  };

  const onUpdate = (row) => {
    navigate("/add-user", { state: row });
  };

  const handleCloseModal = () => {
    setShowSalaryModal(false);
    setShowDesignationModal(false);
    setShowUpdateDesignationModal(false);
    setShowUpdateSalaryModal(false);
    setshowDocumentDownloadModal(false);
  };

  const ViewProfileButton = (row) => {
    if (userAuth.role === "SuperAdmin") {
      navigate(`/company-profile`, { state: row });
    } else {
      navigate(`/view-profile`, { state: row });
    }
  };

  const GenerateSalarySlips = async () => {
    const response = await dispatch(generateSalarySlip());
    if (response) {
      setSendEmailButton(true);
    }
  };

  //#endregion

  //#region FormHandlers
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
        setDisableButton(true);
        await dispatch(updateDesignationHistory(values));
      } catch (error) {}
    },
  });

  const onUpdateDesignation = (row) => {
    setRowToUpdateDesignation(row);
    setFieldValue("id", row.id);
    setFieldValue("designation", row.designation);
    setFieldValue("employementStatus", row.employementStatus);
    setFieldValue("bankName", row.bankName);
    setFieldValue("accountNumber", row.accountNumber);
    setFieldValue("role", row.role);
    setFieldValue("employeeId", row.employeeId);
    setFieldValue("email", row.email);
    setFieldValue("joinDate", row.joinDate);
    setFieldValue("workingHours", row.workingHours);
    setShowUpdateDesignationModal(true);
  };

  const updateSalary = useFormik({
    initialValues: {
      id: "",
      currentSalary: "",
      providentAmount: "",
      taxAmount: "",
    },
    onSubmit: async (values) => {
      try {
        setDisableButton(true);
        await dispatch(updateSalaryHistory(values));
      } catch (error) {}
    },
  });
  //#endregion

  //#region Documents
  const onDocumentDownload = (row) => {
    setUserId(row.id);
    setshowDocumentDownloadModal(true);
  };
  //#endregion

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card o-hidden border-0 shadow-lg my-3">
            <div
              className="card-body"
              style={{ borderBottom: "1px solid #e9e9e9" }}
            >
              <div className="row justify-content-center">
                <div className="col-md-4 offset-md-4 col-sm-12">
                  <h3 className="text-center">User List</h3>
                </div>
                <div className="col-md-4 col-sm-12 text-end">
                  <NavLink
                    className="btn btn-sm btn-primary me-1 rounded-circle"
                    to="/add-user"
                    title="Add New User"
                  >
                    <i className="bi bi-person-add"></i>
                  </NavLink>
                  {userAuth.role !== "SuperAdmin" ? (
                    <Button
                      className="btn btn-sm btn-success me-1 rounded-circle"
                      onClick={() => GenerateSalarySlips()}
                      variant="secondary"
                      title="Generate Slips"
                    >
                      <i className="bi bi-receipt"></i>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 offset-md-8 col-sm-12">
                  <div className=" mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-1 small"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="table-responsive">
                    <DataTableComponent
                      columns={columns}
                      data={data}
                      pagination
                      paginationServer
                      progressPending={loading}
                      paginationTotalRows={totalRows}
                      paginationDefaultPage={currentPage}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      onSort={handleSort}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
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
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteUserRecord()}
            >
              Confirm
            </button>
          </>
        }
      />

      <CustomModal
        show={showSalaryModal}
        onHide={handleCloseModal}
        size="xl"
        classes="bg-primary text-white py-2"
        title={"Salary History"}
        body={
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={salaryTableColumns}
                    data={salaryData}
                    pagination
                    paginationServer
                    progressPending={loading}
                    paginationTotalRows={salaryTotalRows}
                  />
                </div>
              </div>
            </div>
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
          </>
        }
      />

      <CustomModal
        show={showDesignationModal}
        onHide={handleCloseModal}
        size="xl"
        classes="bg-primary text-white py-2"
        title={"Designation History"}
        body={
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <DataTableComponent
                    columns={designationTableColumns}
                    data={designationData}
                    pagination
                    paginationServer
                    progressPending={loading}
                    paginationTotalRows={designationTotalRows}
                  />
                </div>
              </div>
            </div>
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
          </>
        }
      />

      <CustomModal
        show={showUpdateDesignationModal}
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

      <CustomModal
        show={showUpdateSalaryModal}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-info text-white py-2"
        title={"Salary Record"}
        body={
          <>
            <form method="post" onSubmit={updateSalary.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Salary Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-user"
                        placeholder="5200.00"
                        value={updateSalary.values.currentSalary}
                        onBlur={updateSalary.handleBlur("currentSalary")}
                        onChange={updateSalary.handleChange("currentSalary")}
                      />
                    </div>

                    <div className="form-group col-lg-6 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Provident Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-user"
                        placeholder="36.55"
                        value={updateSalary.values.providentAmount}
                        onBlur={updateSalary.handleBlur("providentAmount")}
                        onChange={updateSalary.handleChange("providentAmount")}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-12 col-sm-12">
                      <label className="form-label ml-1 text-bold">
                        Tax Amount
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-user"
                        value={updateSalary.values.taxAmount}
                        onBlur={updateSalary.handleBlur("taxAmount")}
                        onChange={updateSalary.handleChange("taxAmount")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button className="btn btn-info" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </>
        }
      />

      <CustomModal
        show={showDocumentDownloadModal}
        onHide={handleCloseModal}
        size="lg"
        classes="bg-info text-white py-2"
        title={"Download Document"}
        body={
          <>
            <DocumentDownload
              userId={userId}
              onSuccessModal={setshowDocumentDownloadModal}
            />
          </>
        }
      />
    </>
  );
};

export default UsersList;
