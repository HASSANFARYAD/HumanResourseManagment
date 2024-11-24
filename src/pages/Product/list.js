import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRecord } from "../../redux/Actions/apiActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getProducts } from "../../redux/Actions/productActions";
import CustomTable from "../../components/custom/table";
import DraggableDialog from "../../components/custom/dialoge";
import { deleteContent } from "../../utils/_constants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    { id: "0", label: "Action", column: "Action" },
    { id: "0", label: "Image", column: "image" },
    { id: "name", label: "Name", column: "name" },
    { id: "0", label: "Parent", column: "parentName" },
    { id: "description", label: "Description", column: "description" },
  ];

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `Product/DeleteRecord/${isDelete}`;
    await dispatch(deleteRecord(endpoint));
    fetchRecords(0, pageLength);
    handleClose();
  };

  const onUpdate = (row) => {
    navigate("/add-categories", { state: row });
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
    pageLength = 5,
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
      dispatch(getProducts(params))
        .then((response) => {
          console.log(response);
          setRecords(response.payload?.list);
          setTotalRecords(response.payload?.totalRecords);
        })
        .then(() => {
          setRecords([]);
          setTotalRecords(0);
        });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchRecords(0, pageLength);
  }, [pageLength]);

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
          content={deleteContent}
          actions={actions}
          onClose={handleClose}
          loader={deleteLoader}
        />
      </Fragment>
    </>
  );
};

export default ProductList;
