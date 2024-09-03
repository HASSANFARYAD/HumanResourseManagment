import React, { Fragment, useEffect, useState } from "react";
import CustomTable from "../../components/custom/table";
import { getUserRecords } from "../../redux/Actions/userActions";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DraggableDialog from "../../components/custom/dialoge";
import { Box } from "@mui/material";
import { deleteRecord } from "../../redux/Actions/apiActions";

const UsersList = () => {
  const dispatch = useDispatch();
  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState();

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOpen(row.id),
      variant: "outlined",
      color: "error", // 'error' for red buttons in MUI
      icon: <DeleteIcon />, // Use MUI's Delete icon
    },
    {
      id: 2,
      title: "Update",
      onClick: (row) => onUpdate(row),
      variant: "outlined",
      color: "success", // 'success' for green buttons in MUI
      icon: <EditIcon />, // Use MUI's Edit icon
    },
  ];

  const headers = [
    { id: "0", label: "Action" },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "userName", label: "Username" },
    { id: "role", label: "Role" },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `User/DeleteRecord?id=${isDelete}`;
    const response = await dispatch(deleteRecord(endpoint));
    handleClose();
  };

  const onUpdate = () => {};

  const handleOpen = (id) => {
    setIsDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteLoader(false);
    setIsDelete("");
    setOpen(false);
  };

  const actions = [
    {
      label: "Cancel",
      onClick: handleClose,
      color: "secondary",
      variant: "contained",
    },
    {
      label: "Delete",
      onClick: handleDelete,
      color: "error",
      variant: "contained",
    },
  ];

  const fetchUsers = async (
    pageNumber = 0,
    pageLength = 5, // Remove pageLength default from here
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      setLoader(true);
      const response = await dispatch(getUserRecords(params));

      if (response.payload?.list.length > 0) {
        setRecords(response.payload?.list);
        setTotalRecords(response.payload?.totalRecords);
      } else {
        setRecords([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers(0, pageLength);
  }, [pageLength]);

  const content = [
    {
      color: "error",
      text: (
        <>
          Are you sure you want to permanently delete this record?
          <br />
          Once deleted, this information will no longer be accessible.
          <br />
          Do you wish to continue?
        </>
      ),
    },
  ];

  return (
    <>
      <CustomTable
        headers={headers}
        records={records}
        totalRecords={totalRecord}
        pageLength={pageLength}
        buttons={buttons}
        onPageChange={fetchUsers}
        onPageLengthChange={setPageLength}
        loader={loader}
      />

      <Fragment>
        <DraggableDialog
          open={open}
          title="Delete"
          content={content}
          actions={actions}
          onClose={handleClose}
          loader={deleteLoader}
        />
      </Fragment>
    </>
  );
};

export default UsersList;
