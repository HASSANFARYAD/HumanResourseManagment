import { Component, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/AuthController";

const initialValues = {
  email: "",
};

const validateForgotPassword = Yup.object({
  email: Yup.string()
    // .email("Please enter valid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Please enter email"),
});

function ForgotPassword() {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForgotPassword,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setShowSpinner(true);
        const response = await dispatch(forgotPassword(values));
        if (response) {
          setShowSpinner(false);
          console.log("email success sent: ", response);
        }
      } catch (error) {
      } finally {
      }
    },
  });

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6 mt-lg-5">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p className="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            value={values.email}
                            onBlur={handleBlur("email")}
                            onChange={handleChange("email")}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>
                        {/* <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Confirm
                        </button> */}
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          disabled={showSpinner}
                        >
                          {showSpinner ? (
                            <span>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      </form>
                      <hr />
                      {/* <div className="text-center">
                        <NavLink className="small" to="/register">
                          Create an Account!
                        </NavLink>
                      </div> */}
                      <div className="text-center">
                        <NavLink className="small" to="/">
                          Already have an account? Login!
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
