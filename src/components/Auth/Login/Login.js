import React, { useEffect, useState } from "react";
import "./Login.css";
import { NavLink, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../../../redux/authSlice";
import SweetAlert from "../../Dynamic/SweetAlert/SweetAlert";

const Login = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email/Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const action = dispatch(loginUserAction(values));
        const resultAction = await action;
        if (loginUserAction.rejected.match(resultAction)) {
          setMessage(resultAction?.payload?.message);
        }
      } catch (error) {}
    },
  });

  const data = useSelector((state) => state?.auth?.userAuth);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    setMessage("");
  }, []);

  if (data) {
    return <Navigate to="/dashboard" />;
  }
  console.log(message);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>

                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="text-center">
                              <i
                                className="fas fa-cubes fa-2x me-3"
                                style={{ color: "#ff6219" }}
                              ></i>
                              <span className="h1 fw-bold mb-0 text-center">
                                Logo
                              </span>
                            </div>

                            <h5
                              className="fw-normal mb-3 pb-3 text-center"
                              style={{ letterSpacing: "1px" }}
                            >
                              Sign into your account
                            </h5>

                            <div className="form-outline mb-4">
                              <label
                                className="form-label"
                                htmlFor="form2Example17"
                              >
                                Email/Username
                              </label>
                              <input
                                type="text"
                                id="form2Example17"
                                className="form-control form-control"
                                placeholder="example@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                              />
                            </div>

                            <div className="form-outline mb-4">
                              <label
                                className="form-label"
                                htmlFor="form2Example27"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                id="form2Example27"
                                className="form-control form-control"
                                placeholder="*****"
                                value={formik.values.password}
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                              />
                            </div>
                            <div className="mb-2 text-right text-red-400">
                              {(formik.touched.email && formik.errors.email) ||
                                (formik.touched.password &&
                                  formik.errors.password)}
                            </div>

                            <div>
                              <div className="text-end">
                                <NavLink
                                  className="small text-muted text-end"
                                  to="/forgot-password"
                                >
                                  Forgot password?
                                </NavLink>
                              </div>
                              {loading ? (
                                <button
                                  className="btn btn-dark btn-block w-100"
                                  type="submit"
                                  disabled
                                >
                                  Loading...
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="btn btn-dark btn-block w-100"
                                    type="submit"
                                  >
                                    Login
                                  </button>
                                  {message && (
                                    <>
                                      <SweetAlert
                                        params={{
                                          type: "error",
                                          title: message,
                                        }}
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </div>

                            <div>
                              <p
                                className="mb-5 pb-lg-2"
                                style={{ color: "#393f81" }}
                              >
                                Don't have an account?{" "}
                                <NavLink
                                  to="/register"
                                  style={{ color: "#0d6efd" }}
                                >
                                  Register here
                                </NavLink>
                              </p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
