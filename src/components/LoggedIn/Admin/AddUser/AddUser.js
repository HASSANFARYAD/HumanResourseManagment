import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUserAction } from "../../../../redux/adminSlice.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      timezone: "-8:00",
      gender: "Male",
      description: "",
      contact: "",
      password: "",
      birthDate: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      userName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .required("Last Name is required")
        .email("Invalid email format"),
      country: Yup.string().required("Country is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
      zipCode: Yup.string().required("Zipcode is required"),
      timezone: Yup.string().required("Timezone is required"),
      description: Yup.string().required("Description is required"),
      contact: Yup.string().required("contact is required"),
      password: Yup.string().required("password is required"),
      birthDate: Yup.string().required("birthDate is required"),
    }),
    onSubmit: async (values) => {
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
        toast.error(error);
      } finally {
        setButtonDisabled(false);
        setIsAdding(false);
      }
    },
  });
  return (
    <>
      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-body">
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.userName}
                      onChange={formik.handleChange("userName")}
                      onBlur={formik.handleBlur("userName")}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.contact}
                      onChange={formik.handleChange("contact")}
                      onBlur={formik.handleBlur("contact")}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange("birthDate")}
                      onBlur={formik.handleBlur("birthDate")}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">Select Country</label>
                    <select
                      id="country"
                      name="country"
                      className="form-select"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                    >
                      <option value="">Select Country</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.state}
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="fw-semibold">Zip code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange("zipCode")}
                      onBlur={formik.handleBlur("zipCode")}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="fw-semibold p">Gender</label>
                    </div>
                    <div className="col-md-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="Male"
                          value="Male"
                          checked={formik.values.gender === "Male"}
                          onChange={formik.handleChange("gender")}
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="Female"
                          value="Female"
                          checked={formik.values.gender === "Female"}
                          onChange={formik.handleChange("gender")}
                        />
                        <label className="form-check-label">Female</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">About </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="I am Developer"
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      onBlur={formik.handleBlur("description")}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Time Zone</label>
                    <select
                      name="timezone_offset"
                      id="timezone-offset"
                      className="form-select"
                      value={formik.values.timezone}
                      onChange={formik.handleChange("timezone")}
                    >
                      <option value="-08:00">
                        (GMT -8:00) Pacific Time (US &amp; Canada)
                      </option>
                      <option value="-07:00">
                        (GMT -7:00) Mountain Time (US &amp; Canada)
                      </option>
                      <option value="-06:00">
                        (GMT -6:00) Central Time (US &amp; Canada), Mexico City
                      </option>
                      <option value="-05:00">
                        (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
                      </option>
                      <option value="-04:00">
                        (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
                      </option>
                      <option value="-03:50">(GMT -3:30) Newfoundland</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="text-danger text-right h6">
                {formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : formik.touched.lastName && formik.errors.lastName
                  ? formik.errors.lastName
                  : formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : formik.touched.userName && formik.errors.userName
                  ? formik.errors.userName
                  : formik.touched.contact && formik.errors.contact
                  ? formik.errors.contact
                  : formik.touched.state && formik.errors.state
                  ? formik.errors.state
                  : formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : formik.touched.zipCode && formik.errors.zipCode
                  ? formik.errors.zipCode
                  : formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : formik.touched.gender && formik.errors.gender
                  ? formik.errors.gender
                  : formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : formik.touched.birthDate && formik.errors.birthDate
                  ? formik.errors.birthDate
                  : ""}
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  Add New User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
