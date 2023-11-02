import React from "react";
import Datatable from "../../../Dynamic/Datatable/Datatable";

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  // Add more data as needed
];

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "age", label: "Age", type: "number" },
];

function UserList() {
  return (
    <div className="table-responsive">
      <Datatable data={data} fields={fields} />
    </div>
  );
}

export default UserList;
