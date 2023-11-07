import React, { useEffect, useState } from "react";
import Datatable from "../../../Dynamic/Datatable/Datatable";
import { useDispatch } from "react-redux";
import { usersListAction } from "../../../../redux/adminSlice";
import { toast } from "react-toastify";

function UserList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page, size = perPage, sortColumn, sortOrder) => {
    setLoading(true);

    try {
      const response = await dispatch(
        usersListAction({
          Role: 3,
          page,
          size,
          sortColumn,
          sortOrder,
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
    fetchUsers(1);
  }, []);

  const handlePageChange = (page) => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleSort = (column, direction) => {
    const sortColumn = column.selector;
    const sortDirection = direction === "asc" ? "asc" : "desc";
    fetchUsers(currentPage, perPage, sortColumn, sortDirection);
  };

  const handleSearch = (e) => {
    console.log("e:", e.target.value);
    const filterArray = data.filter((item) =>
      item.first_name.includes(e.target.value)
    );
    console.log("filterArray:", filterArray);
    setData(filterArray);
  };

  const columns = [
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
    <div className="table-responsive">
      <Datatable
        title="Users Lists"
        columns={columns}
        data={data}
        progressPending={loading}
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        onSort={handleSort}
      />
    </div>
  );
}

export default UserList;
