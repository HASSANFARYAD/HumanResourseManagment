import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  addUser,
  companyListDropdown,
  departmentListDropdown,
  updateUserPersonalDetail,
} from "../redux/AdminController";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import defaultImageSrc from "../../assets/images/users/user1.jpg";
import defaultImageCNICSrc from "../../assets/images/users/defaultImageCNICSrc.jpg";
import Spinner from "react-bootstrap/Spinner";
import { GetRolesDropdown } from "./GetRolesDropdown";

function AddUser() {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);
  const location = useLocation();
  const [isUpdateCall, setIsUpdate] = useState(false);
  const [rolesDropdown, setRolesDropdown] = useState([]);
  //#region fetch compnay list
  const [showSpinner, setShowSpinner] = useState(true);
  const [companyDropdown, setCompanyDropdown] = useState([]);
  const [departmentDropdown, setDepartmentDropdown] = useState([]);

  const getRecord = location.state;
  console.log(getRecord);

  const fetchCompaniesList = async () => {
    setShowSpinner(true);
    try {
      const response = await dispatch(companyListDropdown());

      if (companyListDropdown.fulfilled.match(response)) {
        setCompanyDropdown(response?.payload);
      }
      setShowSpinner(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setShowSpinner(false);
    }
  };
  const fetchDepartmentList = async () => {
    setShowSpinner(true);
    try {
      const response = await dispatch(departmentListDropdown());

      if (departmentListDropdown.fulfilled.match(response)) {
        setDepartmentDropdown(response?.payload);
      }
      setShowSpinner(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    if (getRecord) {
      setIsUpdate(true);
    }
    fetchCompaniesList();
    fetchDepartmentList();
    const roles = GetRolesDropdown(userAuth.role);
    if (userAuth && userAuth.role) {
      setRolesDropdown(roles);
    } else {
      setRolesDropdown([]);
    }
  }, [getRecord]);
  //#endregion

  const initialValues = {
    companyId: getRecord?.companyId || "",
    departmentId: getRecord?.departmentId || "",
    id: getRecord?.id || "",
    role: getRecord?.role || "",
    firstName: getRecord?.firstName || "",
    lastName: getRecord?.lastName || "",
    userName: getRecord?.userName || "",
    email: getRecord?.email || "",
    password: getRecord?.password || "",
    cpassword: getRecord?.cpassword || "",
    phoneNumber: getRecord?.primaryContact || "",
    address: getRecord?.address || "",
    dob: getRecord?.dob || "",
    employeeId: getRecord?.employeeId || "",
    gender: getRecord?.gender || "Male",
    profilePicture: getRecord?.profile || null,
    cnicFrontScan: getRecord?.cnicFront || null,
    cnicBackScan: getRecord?.cnicBack || null,
    isUpdate: !!getRecord,
  };

  if (userAuth.role !== "SuperAdmin") {
    initialValues.companyId = userAuth.companyId;
  } else {
    initialValues.role = "2";
  }

  const validateAddUser = Yup.object().shape({
    isUpdate: Yup.bool().required(),
    role: Yup.string().required("Please select role"),
    companyId: Yup.string().required("Please select company"),
    departmentId: Yup.string().when(["role"], (roleId, schema) => {
      //console.log("roleId when department : ", roleId);
      return parseInt(roleId[0]) < 4
        ? schema.optional()
        : schema.min(3).required("Please select department");
    }),
    firstName: Yup.string().min(3).required("Please enter first name"),
    lastName: Yup.string().min(3).required("Please enter last name"),
    userName: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema.min(3).required("Please enter user name");
    }),
    email: Yup.string()
      // .email("Please enter valid email")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        "Please enter a valid email"
      )
      .required("Please enter email"),
    password: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema.min(3).required("Please enter password");
    }),
    cpassword: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema
            .oneOf([Yup.ref("password")], "Password not matched")
            .required("Please enter password");
    }),
    phoneNumber: Yup.string()
      .min(6, "Phone Number must be at leat 6 charactors")
      .required("Please enter phone number"),
    dob: Yup.date().required("Please select your date of birth"),
    employeeId: Yup.string().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema
            .min(1, "Employee Id must be at leat 1 digit")
            .required("Please enter employee id");
    }),
    gender: Yup.string().required("Please select your gender"),
    profilePicture: Yup.mixed().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema
            .required("Profile picture is required")
            .test("fileSize", "File size must be less than 2MB", (value) => {
              console.log("file", value);
              if (!value) return true; // No file selected, consider it valid
              const isFileSizeValid = value.size <= 2 * 1024 * 1024; // 2 MB limit
              if (!isFileSizeValid) {
                throw new Yup.ValidationError(
                  "File size must be less than 2MB",
                  value,
                  "profilePicture"
                );
              }
              return isFileSizeValid;
            });
    }),
    cnicFrontScan: Yup.mixed().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema
            .required("CNIC Front Image is required")
            .test("fileSize", "File size must be less than 2MB", (value) => {
              console.log("file", value);
              if (!value) return true; // No file selected, consider it valid
              const isFileSizeValid = value.size <= 2 * 1024 * 1024; // 2 MB limit
              if (!isFileSizeValid) {
                throw new Yup.ValidationError(
                  "File size must be less than 2MB",
                  value,
                  "cnicFrontScan"
                );
              }
              return isFileSizeValid;
            });
    }),
    cnicBackScan: Yup.mixed().when(["isUpdate"], (isUpdate, schema) => {
      return isUpdate[0]
        ? schema.optional()
        : schema
            .required("CNIC Back Image is required")
            .test("fileSize", "File size must be less than 2MB", (value) => {
              console.log("file", value);
              if (!value) return true; // No file selected, consider it valid
              const isFileSizeValid = value.size <= 2 * 1024 * 1024; // 2 MB limit
              if (!isFileSizeValid) {
                throw new Yup.ValidationError(
                  "File size must be less than 2MB",
                  value,
                  "cnicBackScan"
                );
              }
              return isFileSizeValid;
            });
    }),
  });

  const fileInputRef = useRef(null);
  const fileInputCNICFRef = useRef(null);
  const fileInputCNICBRef = useRef(null);

  const handleFileChange = ({ event, name }) => {
    const file = event.currentTarget.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFieldValue("profilePicture", file);
    } else {
      setFieldValue("profilePicture", null);
      fileInputRef.current.value = "";
      alert("File Size exceeds from 2MB");
    }
  };

  const handleCNICFileChange = ({ event, name }) => {
    const file = event.currentTarget.files[0];
    console.log(name);
    if (file && file.size <= 2 * 1024 * 1024) {
      setFieldValue(name, file);
    } else {
      setFieldValue(name, null);
      if (name === "cnicFrontScan") {
        fileInputCNICFRef.current.value = "";
      } else if (name === "cnicBackScan") {
        fileInputCNICBRef.current.value = "";
      }
      alert("File Size exceeds from 2MB");
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateAddUser,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        if (isUpdateCall) {
          await dispatch(updateUserPersonalDetail(values));
        } else {
          await dispatch(addUser(values));
        }
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-3">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center fw-bold">
                      {isUpdateCall ? "Update User " : "Add User "}
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <input type="hidden" value={values.id} />
                      {userAuth.role === "SuperAdmin" ? (
                        <div className="row">
                          <div className="form-group col-lg-12">
                            <label
                              className="form-label ml-1"
                              htmlFor="exampleInputSComp"
                            >
                              Select Company
                              {showSpinner && (
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
                              disabled={showSpinner || isUpdateCall}
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
                        </div>
                      ) : (
                        <div className="row">
                          <div className="form-group col-lg-6 col-sm-12">
                            <label
                              className="form-label ml-1 text-bold"
                              htmlFor="exampleInputSRole"
                            >
                              Select Role
                            </label>
                            <select
                              disabled={isUpdateCall}
                              className="form-control"
                              id="exampleInputSRole"
                              value={values.role}
                              onBlur={handleBlur("role")}
                              onChange={handleChange("role")}
                            >
                              {rolesDropdown &&
                                rolesDropdown.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    selected={values.id === item.id}
                                  >
                                    {item.roleName}
                                  </option>
                                ))}
                            </select>
                            {errors.role && (
                              <small className="text-danger">
                                {errors.role}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-lg-6 col-sm-12">
                            <label
                              className="form-label ml-1"
                              htmlFor="exampleInputSDep"
                            >
                              Select Department
                              {showSpinner && (
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
                              disabled={showSpinner || isUpdateCall}
                              className="form-control"
                              id="exampleInputSDep"
                              value={values.departmentId}
                              onBlur={handleBlur("departmentId")}
                              onChange={handleChange("departmentId")}
                            >
                              <option
                                selected={isUpdateCall ? false : true}
                                disabled="true"
                                value=""
                              >
                                Select Department
                              </option>
                              {departmentDropdown &&
                                departmentDropdown.map((item) => (
                                  <option
                                    key={item.id}
                                    value={item.id}
                                    selected={values.departmentId === item.id}
                                  >
                                    {item.departmentName}
                                  </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                              <small className="text-danger">
                                {errors.departmentId}
                              </small>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="row">
                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputFirstName"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputFirstName"
                            placeholder="Enter First Name"
                            value={values.firstName}
                            onBlur={handleBlur("firstName")}
                            onChange={handleChange("firstName")}
                          />
                          {errors.firstName && (
                            <small className="text-danger">
                              {errors.firstName}
                            </small>
                          )}
                        </div>

                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputLastName"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputLastName"
                            placeholder="Enter Last Name"
                            value={values.lastName}
                            onBlur={handleBlur("lastName")}
                            onChange={handleChange("lastName")}
                          />
                          {errors.lastName && (
                            <small className="text-danger">
                              {errors.lastName}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputUserName"
                          >
                            User Name
                          </label>
                          <input
                            type="text"
                            readOnly={isUpdateCall}
                            className="form-control form-control-user"
                            id="exampleInputUserName"
                            placeholder="Enter User Name"
                            value={values.userName}
                            onBlur={handleBlur("userName")}
                            onChange={handleChange("userName")}
                          />
                          {errors.userName && (
                            <small className="text-danger">
                              {errors.userName}
                            </small>
                          )}
                        </div>

                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputEmail"
                          >
                            Email
                          </label>
                          <input
                            className="form-control form-control-user"
                            type="email"
                            readOnly={isUpdateCall}
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
                      </div>

                      <div className="row">
                        <div
                          className="form-group col-lg-12"
                          style={{ display: isUpdateCall ? "none" : "block" }}
                        >
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputPassword"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Enter Password"
                            value={values.password}
                            onBlur={handleBlur("password")}
                            onChange={handleChange("password")}
                          />
                          {errors.password && (
                            <small className="text-danger">
                              {errors.password}
                            </small>
                          )}
                        </div>

                        <div
                          className="form-group col-lg-12"
                          style={{ display: isUpdateCall ? "none" : "block" }}
                        >
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputCPassword"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputCPassword"
                            placeholder="Enter Confirm Password"
                            value={values.cpassword}
                            onBlur={handleBlur("cpassword")}
                            onChange={handleChange("cpassword")}
                          />
                          {errors.cpassword && (
                            <small className="text-danger">
                              {errors.cpassword}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputNumber"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputNumber"
                            placeholder="Enter Phone Number"
                            value={values.phoneNumber}
                            onBlur={handleBlur("phoneNumber")}
                            onChange={handleChange("phoneNumber")}
                          />
                          {errors.phoneNumber && (
                            <small className="text-danger">
                              {errors.phoneNumber}
                            </small>
                          )}
                        </div>

                        <div className="form-group col-lg-6 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputAddress"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputAddress"
                            placeholder="Enter Address"
                            value={values.address}
                            onBlur={handleBlur("address")}
                            onChange={handleChange("address")}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="form-group col-lg-4 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputDOB"
                            title="Date Of Birth"
                          >
                            DOB
                          </label>
                          <input
                            type="date"
                            className="form-control form-control-user"
                            id="exampleInputDOB"
                            value={values.dob}
                            onChange={handleChange("dob")}
                          />
                          {errors.dob && (
                            <small className="text-danger">{errors.dob}</small>
                          )}
                        </div>

                        <div className="form-group col-lg-4 col-sm-12">
                          <label
                            className="form-label ml-1 text-bold"
                            htmlFor="exampleInputEmployeeId"
                          >
                            Employee Id
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputEmployeeId"
                            placeholder="Enter Employee Id"
                            value={values.employeeId}
                            onBlur={handleBlur("employeeId")}
                            onChange={handleChange("employeeId")}
                            disabled={isUpdateCall}
                          />
                          {errors.employeeId && (
                            <small className="text-danger">
                              {errors.employeeId}
                            </small>
                          )}
                        </div>

                        <div className="form-group col-lg-4 col-sm-12">
                          <label className="form-label ml-1 text-bold">
                            Gender
                          </label>
                          <div className="ml-1">
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="customCheckMale"
                                name="GenderRadioCheck"
                                value="Male"
                                checked={values.gender === "Male"}
                                onChange={handleChange("gender")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheckMale"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                className="form-check-input"
                                id="customCheckFemale"
                                name="GenderRadioCheck"
                                value="Female"
                                checked={values.gender === "Female"}
                                onChange={handleChange("gender")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheckFemale"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                          {errors.gender && (
                            <small className="text-danger">
                              {errors.gender}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="form-group col-lg-12"
                          style={{ display: isUpdateCall ? "none" : "block" }}
                        >
                          <div className="row">
                            <div className="col-lg-8">
                              <label
                                className="form-label ml-1 text-bold"
                                htmlFor="exampleInputPP"
                              >
                                Profile Picture
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="exampleInputPP"
                                ref={fileInputRef}
                                onChange={(event) =>
                                  handleFileChange({
                                    event,
                                    name: "profilePicture",
                                  })
                                }
                              />
                              {errors.profilePicture && (
                                <small className="text-danger">
                                  {errors.profilePicture}
                                </small>
                              )}
                            </div>
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              <img
                                src={
                                  values.profilePicture instanceof Blob
                                    ? URL.createObjectURL(values.profilePicture)
                                    : values.profilePicture
                                    ? values.profilePicture
                                    : defaultImageSrc
                                }
                                className="rounded-circle"
                                width={100}
                                height={100}
                                alt="user-profile"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-lg-12">
                          <div className="row">
                            <div className="col-lg-8">
                              <label
                                className="form-label ml-1 text-bold"
                                htmlFor="exampleInputFCNIC"
                              >
                                CNIC Front Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="exampleInputFCNIC"
                                ref={fileInputCNICFRef}
                                onChange={(event) =>
                                  handleCNICFileChange({
                                    event,
                                    name: "cnicFrontScan",
                                  })
                                }
                              />
                              {errors.cnicFrontScan && (
                                <small className="text-danger">
                                  {errors.cnicFrontScan}
                                </small>
                              )}
                            </div>
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              <img
                                src={
                                  values.cnicFrontScan instanceof Blob
                                    ? URL.createObjectURL(values.cnicFrontScan)
                                    : values.cnicFrontScan
                                    ? values.cnicFrontScan
                                    : defaultImageCNICSrc // Assume values.profilePicture is the file path
                                }
                                className="rounded-circle"
                                width={100}
                                height={100}
                                alt="user-profile"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group col-lg-12">
                          <div className="row">
                            <div className="col-lg-8">
                              <label
                                className="form-label ml-1 text-bold"
                                htmlFor="exampleInputBCNIC"
                              >
                                CNIC Back Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="exampleInputBCNIC"
                                ref={fileInputCNICBRef}
                                onChange={(event) =>
                                  handleCNICFileChange({
                                    event,
                                    name: "cnicBackScan",
                                  })
                                }
                              />
                              {errors.cnicBackScan && (
                                <small className="text-danger">
                                  {errors.cnicBackScan}
                                </small>
                              )}
                            </div>
                            <div
                              className="col-lg-4"
                              style={{ textAlign: "center" }}
                            >
                              <img
                                src={
                                  values.cnicBackScan instanceof Blob
                                    ? URL.createObjectURL(values.cnicBackScan)
                                    : values.cnicBackScan
                                    ? values.cnicBackScan
                                    : defaultImageCNICSrc // Assume values.profilePicture is the file path
                                }
                                className="rounded-circle"
                                width={100}
                                height={100}
                                alt="user-profile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="hidden" value={values.role} />
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
                        to="/user-list"
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
    </div>
  );
}

export default AddUser;
