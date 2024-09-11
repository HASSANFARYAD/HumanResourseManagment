import React, { Fragment, useEffect, useState } from "react";
import CustomTable from "../../components/custom/table";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DraggableDialog from "../../components/custom/dialoge";
import { Box } from "@mui/material";
import { deleteRecord } from "../../redux/Actions/apiActions";
import { Navigate, useNavigate } from "react-router";
import { getCategoriesRecords } from "../../redux/Actions/categoryAction";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState();
  const [updateRecord, setUpdateRecord] = useState(null);

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
    { id: "Image", label: "Image" },
    { id: "name", label: "Name" },
    { id: "parentId", label: "Parent" },
    { id: "description", label: "Description" },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `Category/DeleteRecord?id=${isDelete}`;
    await dispatch(deleteRecord(endpoint));
    fetchRecords(0, pageLength);
    handleClose();
  };

  const onUpdate = (row) => {
    setUpdateRecord(row);
    navigate("/add", { state: row });
  };

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

  const fetchRecords = async (
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
      const response = await dispatch(getCategoriesRecords(params));

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
    fetchRecords(0, pageLength);
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
        onPageChange={fetchRecords}
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

export default Categories;
