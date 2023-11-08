import React, { useEffect, useState } from "react";
import Datatable from "../../../Dynamic/Datatable/Datatable";
import { useDispatch } from "react-redux";
import { usersListAction } from "../../../../redux/adminSlice";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";

function UserList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setsortColumn] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [searchParam, setSearchParam] = useState("");

  const fetchUsers = async (
    page,
    size = perPage,
    sortColumn,
    sortOrder,
    searchParam
  ) => {
    setLoading(true);

    try {
      const response = await dispatch(
        usersListAction({
          Role: 3,
          page,
          size,
          sortColumn,
          sortOrder,
          searchParam,
        })
      );

      if (usersListAction.fulfilled.match(response)) {
        setData(response?.payload?.data?.data);
        setTotalRows(response?.payload?.data.total);
      } else {
        toast.error(response?.payload?.message);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, perPage, sortColumn, sortDirection, searchParam);
  }, [currentPage, perPage, sortColumn, sortDirection, searchParam]);

  const handlePageChange = (page) => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleSort = (column, direction) => {
    setsortColumn(column.selector);
    setSortDirection(direction === "asc" ? "asc" : "desc");
  };

  const handleSearch = (e) => {
    setSearchParam(e.target.value ? e.target.value : "");
  };

  const handleAction1 = (row) => {
    // Handle the first action for the selected row
    // For example, you can open a modal or perform some other action
  };

  const handleAction2 = (row) => {
    // Handle the second action for the selected row
  };

  const handleAction3 = (row) => {
    // Handle the third action for the selected row
  };

  const columns = [
    {
      name: "Actions",
      sortable: false,
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAction1(row)}>
              Action 1
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction2(row)}>
              Action 2
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction3(row)}>
              Action 3
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "User Name",
      selector: "userName",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
    },
    {
      name: "Country",
      selector: "country",
      sortable: true,
    },
    {
      name: "State",
      selector: "state",
      sortable: true,
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
    },
    {
      name: "Timezone",
      selector: "timezone",
      sortable: true,
    },
    {
      name: "Birth Date",
      selector: "birthDate",
    },
  ];

  return (
    <>
      <div className="card p-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 offset-md-8 col-sm-12">
              <div class=" mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-1 small"
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
                <Datatable
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
    </>
  );
}

export default UserList;
