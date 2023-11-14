import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../../../redux/adminSlice.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StepForm from "../../../Dynamic/Form/StepForm.js";
import { FormAddUserFormValidation } from "../../../validations/FormValidations.js";

const AddUser = () => {
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 13);

  const steps = [
    {
      name: "Users Information",
      fields: [
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
        { id: "contact", label: "Contact" },
        {
          id: "birthDate",
          label: "Date of Birth",
          type: "date",
          min: minDate.toISOString().split("T")[0],
        },
        {
          id: "gender",
          label: "Gender",
          type: "radio",
          options: ["Male", "Female"],
        },
      ],
    },
    {
      name: "Account Information",
      fields: [
        { id: "userName", label: "Username" },
        { id: "email", label: "Email", type: "email" },
        { id: "password", label: "Password", type: "password" },
        { id: "description", label: "About", type: "textarea" },
        {
          id: "role",
          label: "Select Role",
          type: "select",
          options: ["Select Role", "Admin", "Employee", "Customer", "Valet"],
        },
      ],
    },
    {
      name: "Users Address",
      fields: [
        {
          id: "country",
          label: "Select Country",
          type: "select",
          options: ["Canada", "United States"],
        },
        { id: "state", label: "State" },
        { id: "city", label: "City" },
        { id: "zipCode", label: "Zip code" },
        {
          id: "timezone",
          label: "Time Zone",
          type: "select",
          options: [
            "(GMT -8:00) Pacific Time (US & Canada)",
            "(GMT -7:00) Mountain Time (US & Canada)",
            "(GMT -6:00) Central Time (US & Canada), Mexico City",
            "(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima",
            "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",
            "(GMT -3:30) Newfoundland",
          ],
        },
      ],
    },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "Male",
      contact: "",

      userName: "",
      email: "",
      description: "",
      password: "",

      country: "Canada",
      state: "",
      city: "",
      zipCode: "",
      timezone: "-8:00",
    },
    validationSchema: FormAddUserFormValidation,
    onSubmit: async (values) => {
      console.log("values", values);
      setButtonDisabled(true);
      try {
        const response = await dispatch(addUserAction(values));
        if (addUserAction.fulfilled.match(response)) {
          if (response.payload.status) {
            toast.success(response.payload.message);
          } else {
            toast.error(response.payload.message);
          }
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setButtonDisabled(false);
      }
    },
  });

  return (
    <>
      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <StepForm
                steps={steps}
                formik={formik}
                disabled={isButtonDisabled}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
