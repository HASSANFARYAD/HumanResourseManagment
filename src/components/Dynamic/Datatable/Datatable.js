import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { usersListAction } from "../../../redux/adminSlice";
import { toast } from "react-toastify";

const Datatable = ({ ...props }) => {
  return (
    <>
      <DataTable {...props} />
    </>
  );
};

export default Datatable;
