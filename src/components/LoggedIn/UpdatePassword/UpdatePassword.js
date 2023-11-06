import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { updatePasswordAction } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import SweetAlert from "../../Dynamic/SweetAlert/SweetAlert";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [errorType, setErrorType] = useState("");

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const action = dispatch(updatePasswordAction(values));
        const resultAction = await action;
        if (updatePasswordAction.rejected.match(resultAction)) {
          setMessage(resultAction?.payload?.message);
          setErrorType("error");
        } else if (updatePasswordAction.fullfilled.match(resultAction)) {
          setMessage(resultAction?.payload?.message);
          setErrorType("success");
        }
      } catch (error) {}
    },
  });

  const isPasswordMatch =
    formik.values.password === formik.values.confirmPassword;
  const updateButtonDisabled = !isPasswordMatch;
  const passwordMismatchMessage = !isPasswordMatch && (
    <div className="text-danger text-end">
      Passwords & Confirm Password do not match!
    </div>
  );
  return (
    <>
      {message && errorType && (
        <>
          <SweetAlert
            params={{
              type: errorType,
              title: message,
            }}
          />
        </>
      )}
      <div className="row col-md-8 offset-md-2">
        <div className="card">
          <div className="card-body">
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={formik.values.oldPassword}
                      onChange={formik.handleChange("oldPassword")}
                      onBlur={formik.handleBlur("oldPassword")}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="fw-semibold">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange("confirmPassword")}
                      onBlur={formik.handleBlur("confirmPassword")}
                    />
                  </div>
                </div>
                {passwordMismatchMessage}
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <NavLink
                  className="btn btn-danger me-md-2"
                  to="/update-profile"
                >
                  Update Profile
                </NavLink>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={updateButtonDisabled}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
