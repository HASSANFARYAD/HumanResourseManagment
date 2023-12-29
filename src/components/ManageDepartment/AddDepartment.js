import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  addDepartment,
  companyListDropdown,
  updateDepartment,
} from "../redux/AdminController";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

function AddDepartment() {
  const dispatch = useDispatch();
  const location = useLocation();
  const getUpdateData = location.state;
  const [isUpdateCall, setIsUpdate] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSpinnerCompany, setShowSpinnerGetCompany] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState([]);

  const fetchCompaniesList = async () => {
    setShowSpinnerGetCompany(true);
    try {
      const response = await dispatch(companyListDropdown());

      if (companyListDropdown.fulfilled.match(response)) {
        setCompanyDropdown(response?.payload);
      }
      setShowSpinnerGetCompany(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setShowSpinnerGetCompany(false);
    }
  };

  useEffect(() => {
    if (getUpdateData) {
      setIsUpdate(true);
    }
    fetchCompaniesList();
  }, [getUpdateData]);

  console.log("");

  const initialValues = {
    id: getUpdateData ? getUpdateData.id : "",
    departmentName: getUpdateData ? getUpdateData.departmentName : "",
    companyId: getUpdateData?.companyId || "",
    isUpdate: !!getUpdateData,
  };

  const validateAddDepartment = Yup.object().shape({
    departmentName: Yup.string()
      .min(3, "Department name must be atleast 3 charactors.")
      .required("Department Name is required."),
    companyId: Yup.string().required("Please select company"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validateAddDepartment,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setShowSpinner(true);
        if (isUpdateCall) {
          await dispatch(updateDepartment(values));
        } else {
          await dispatch(addDepartment(values));
        }
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-3">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h3 text-gray-900 mb-4">
                        {isUpdateCall
                          ? "Update Department "
                          : "Add Department "}
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <input type="hidden" value={values.id} />

                      <div className="form-group col-lg-12">
                        <label
                          className="form-label ml-1 fw-bold"
                          htmlFor="exampleInputSComp"
                        >
                          Select Company
                          {showSpinnerCompany && (
                            <span>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </label>
                        <select
                          disabled={showSpinnerCompany || isUpdateCall}
                          className="form-control"
                          id="exampleInputSComp"
                          value={values.companyId}
                          onBlur={handleBlur("companyId")}
                          onChange={handleChange("companyId")}
                        >
                          <option
                            selected={isUpdateCall ? false : true}
                            disabled="true"
                            value=""
                          >
                            Select Company
                          </option>
                          {companyDropdown &&
                            companyDropdown.map((item) => (
                              <option
                                key={item.id}
                                value={item.id}
                                selected={values.companyId === item.id}
                              >
                                {item.companyName}
                              </option>
                            ))}
                        </select>
                        {errors.companyId && (
                          <small className="text-danger">
                            {errors.companyId}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-lg-12">
                        <label
                          className="form-label ml-1 text-bold fw-bold"
                          htmlFor="exampleInputDepartmentName"
                        >
                          Department Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputDepartmentName"
                          placeholder="Enter Name"
                          value={values.departmentName}
                          onBlur={handleBlur("departmentName")}
                          onChange={handleChange("departmentName")}
                        />
                        {errors.departmentName && (
                          <small className="text-danger">
                            {errors.departmentName}
                          </small>
                        )}
                      </div>

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
                        ) : isUpdateCall ? (
                          "Update "
                        ) : (
                          "Add "
                        )}
                      </button>
                      <hr />
                      <NavLink
                        className="btn btn-primary btn-user btn-block"
                        to="/department-list"
                      >
                        Back To list
                      </NavLink>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDepartment;
