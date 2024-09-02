import React, { useEffect, useState } from "react";
import CustomTable from "../../components/custom/table";
import { getUserRecords } from "../../redux/Actions/userActions";
import { useDispatch } from "react-redux";

const UsersList = () => {
  const dispatch = useDispatch();
  const [records, setRecords] = useState([]);
  const [pageLength, setPageLength] = useState(5);
  const [loader, setLoader] = useState(false);
  const [totalRecord, setTotalRecords] = useState(0);

  const headers = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "userName", label: "Username" },
    { id: "role", label: "Role" },
  ];

  const fetchUsers = async (
    pageNumber = 0,
    pageLength = 5, // Remove pageLength default from here
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    setLoader(true);
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      const response = await dispatch(getUserRecords(params));

      if (response.payload?.list.length > 0) {
        setRecords(response.payload?.list);
        setTotalRecords(response.payload?.totalRecords);
      } else {
        setRecords([]);
        setTotalRecords(0);
      }

      setLoader(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <CustomTable
        headers={headers}
        records={records}
        totalRecords={totalRecord}
        pageLength={pageLength}
        onPageChange={fetchUsers}
        onPageLengthChange={setPageLength}
      />
    </>
  );
};

export default UsersList;
