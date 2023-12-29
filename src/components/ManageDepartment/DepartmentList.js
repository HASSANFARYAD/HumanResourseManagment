import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomButtons from "../global_component/CustomButtons";
import DataTableComponent from "../global_component/DataTableComponent";
import { departmentList } from "../redux/AdminController";
import { deleteRecord } from "../redux/GlobalActions";
import { useEffect, useMemo, useState } from "react";
import defaultImageSrc from "../../assets/images/users/user1.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import CustomModal from "../global_component/CustomModal";

const DepartmentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);

  const [showSpinner, setShowSpinner] = useState(false);

  //#region Datatables
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [searchParam, setSearchParam] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => onDelete(row),
      className: "btn btn-sm btn-danger me-1",
      icon: "bi bi-trash",
      label: "",
    },
    {
      id: 2,
      title: "Update",
      onClick: (row) => onUpdate(row),
      className: "btn btn-sm btn-success me-1",
      icon: "bi bi-pencil-square",
      label: "",
    },
  ];

  const columns = useMemo(
    () => [
      {
        name: "Actions",
        sortable: false,
        cell: (row) => <CustomButtons buttons={buttons} row={row} />,
      },
      {
        name: "Department Name",
        selector: "departmentName",
        sortable: true,
        sortFunction: () => [],
      },
      {
        name: "Created By",
        cell: (row) => row.createdBy,
        //   <>
        //     {loggedInUser &&
        //     loggedInUser.id &&
        //     loggedInUser.id === row.createdId
        //       ? "You"
        //       : row.createdBy}
        //   </>
      },
    ],
    []
  );

  const fetchDepartmentList = async (
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
      const response = await dispatch(departmentList(params));

      if (departmentList.fulfilled.match(response)) {
        //   setData(response?.payload?.list);
        const updatedList = response?.payload?.list?.map((item) => {
          // Check if the column value is null
          if (item && item.createdById === loggedInUser?.id) {
            item.createdBy = "You";
          }
          return item;
        });
        setData(updatedList);
        setTotalRows(response?.payload?.totalRecords);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    console.log("currentPage::", currentPage, perPage);
    fetchDepartmentList(
      currentPage,
      perPage,
      sortColumn,
      sortDirection,
      searchParam
    );
  }, [currentPage, perPage, sortColumn, sortDirection, searchParam]);

  const handlePageChange = (page) => {
    fetchDepartmentList(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchDepartmentList(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleSort = (column, direction) => {
    if (column.selector && typeof column.selector === "string") {
      const colName =
        column.selector.charAt(0).toUpperCase() + column.selector.slice(1);
      console.log("colName: ", colName);
      setSortColumn(() => colName);
    }
    // setsortColumn(column.selector);
    setSortDirection(direction === "asc" ? "asc" : "desc");
  };

  const handleSearch = (e) => {
    setSearchParam(e.target.value ? e.target.value : "");
  };

  const onDelete = (row) => {
    setRowToDelete(row);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setRowToDelete(null);
    setShowDeleteModal(false);
  };

  const deleteDepartment = async () => {
    const endpoint = `Admin/DeleteDepartment?id=${rowToDelete.id}`;
    await dispatch(deleteRecord(endpoint));
    handleCloseDeleteModal();
    fetchDepartmentList();
  };

  const onUpdate = async (row) => {
    navigate("/add-department", { state: row });
  };

  //#endregion

  //#region DatatTable

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col md="12" className="text-end">
              <NavLink
                to="/add-department"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                <Button variant="primary">Add New</Button>
              </NavLink>
            </Col>
          </Row>
        </Card.Header>
        <CardBody>
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
        </CardBody>
      </Card>

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
            <Row>
              <Col className="text-end">
                <Button
                  onClick={() => deleteDepartment()}
                  variant="outline-danger"
                >
                  Confirm.
                </Button>
              </Col>
            </Row>
          </>
        }
      />
    </>
  );

  //#endregion
};

export default DepartmentList;
