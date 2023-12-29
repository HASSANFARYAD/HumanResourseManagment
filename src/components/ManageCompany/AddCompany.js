import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addCompany, updateRecord } from "../redux/AdminController";
import Spinner from "react-bootstrap/Spinner";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import defaultImageSrc from "../../assets/images/users/user1.jpg";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

function AddCompany() {
  const dispatch = useDispatch();
  const location = useLocation();
  const getUpdateData = location.state;
  const [isUpdateCall, setIsUpdate] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (getUpdateData) {
      setIsUpdate(true);
    }
  }, [getUpdateData]);

  console.log("");

  const initialValues = {
    id: getUpdateData ? getUpdateData.id : "",
    companyName: getUpdateData ? getUpdateData.companyName : "",
    companyContact: getUpdateData ? getUpdateData.companyContact : "",
    companyAddress: getUpdateData ? getUpdateData.companyAddress : "",
    profilePicture: getUpdateData ? getUpdateData.profilePicture : null,
    isUpdate: !!getUpdateData,
  };

  const validateAddCompany = Yup.object().shape({
    companyName: Yup.string()
      .min(3, "Company name must be atleast 3 characters.")
      .required("Company Name is required."),
    companyContact: Yup.string()
      .min(9, "Company Contact must be atleast 9 numbers")
      .max(15, "Company Contact must be maximum 15 numbers")
      .required("Company Contact is required."),
    companyAddress: Yup.string()
      .min(3, "Company Address must be atleast 3 characters.")
      .required("Company Address is required."),
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
  });

  const handleFileChange = ({ event, name }) => {
    const file = event.currentTarget.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setPreviewImage(URL.createObjectURL(file));
      setFieldValue("profilePicture", file);
    } else {
      setPreviewImage(defaultImageSrc);
      setFieldValue("profilePicture", null);
      fileInputRef.current.value = "";
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
    validationSchema: validateAddCompany,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setShowSpinner(true);
        if (isUpdateCall) {
          await dispatch(updateRecord(values));
        } else {
          await dispatch(addCompany(values));
        }
      } catch (error) {
      } finally {
        setShowSpinner(false);
      }
    },
  });

  console.log("values::", values?.profilePicture);

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
                        {isUpdateCall ? "Update Company " : "Add Company "}
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <input type="hidden" value={values.id} />

                      <div className="form-group col-lg-12">
                        <label
                          className="form-label ml-1 text-bold"
                          htmlFor="exampleInputCompanyName"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputCompanyName"
                          placeholder="Enter Name"
                          value={values.companyName}
                          onBlur={handleBlur("companyName")}
                          onChange={handleChange("companyName")}
                        />
                        {errors.companyName && (
                          <small className="text-danger">
                            {errors.companyName}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-lg-12">
                        <label
                          className="form-label ml-1 text-bold"
                          htmlFor="exampleInputCompanyContact"
                        >
                          Company Contact
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputCompanyContact"
                          placeholder="Enter Contact"
                          value={values.companyContact}
                          onBlur={handleBlur("companyContact")}
                          onChange={handleChange("companyContact")}
                        />
                        {errors.companyContact && (
                          <small className="text-danger">
                            {errors.companyContact}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-lg-12">
                        <label
                          className="form-label ml-1 text-bold"
                          htmlFor="exampleInputCompanyAddress"
                        >
                          Company Address
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="exampleInputCompanyAddress"
                          placeholder="Enter Address"
                          value={values.companyAddress}
                          onBlur={handleBlur("companyAddress")}
                          onChange={handleChange("companyAddress")}
                        />
                        {errors.companyAddress && (
                          <small className="text-danger">
                            {errors.companyAddress}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-lg-12">
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
                              name="profilePicture"
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
                            <>
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
                            </>
                            {/* )} */}
                          </div>
                        </div>
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
                        to="/company-list"
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

export default AddCompany;
