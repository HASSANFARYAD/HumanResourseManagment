import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { usersListAction } from "../../../redux/adminSlice";
import { toast } from "react-toastify";

const Datatable = (prop) => {
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
      // Handle any errors here
      console.error("Error fetching users:", error);
      toast.error("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

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
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Username",
      selector: "userName",
      sortable: true,
    },
    {
      cell: (row) => <button>Delete</button>,
    },
  ];

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

  return (
    <>
      <input type="text" onChange={handleSearch} />
      <DataTable
        title={prop.title}
        columns={prop.columns}
        data={prop.data}
        progressPending={prop.loading}
        pagination
        paginationServer
        paginationTotalRows={prop.totalRows}
        paginationDefaultPage={prop.currentPage}
      />
    </>
  );
};

export default Datatable;
