import React from "react";

const Datatable = ({ data, fields }) => {
  return (
    <table className="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.name}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {fields.map((field) => (
              <td key={field.name}>{item[field.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
