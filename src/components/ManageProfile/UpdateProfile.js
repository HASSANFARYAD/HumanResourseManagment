import React, { useEffect, useState } from "react";
import userIcon from "../../assets/images/users/user1.jpg";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getLoggedInUser,
  updateProfile,
  updateProfileImage,
} from "../redux/AuthController";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image !== null && image !== undefined && image !== "") {
      if (image && image.size <= 2 * 1024 * 1024) {
        setSelectedImage(image);
        setIsUpdateDisabled(false);
      } else {
        toast.warning("Image must be less than 2 MB.");
        e.target.value = null; // Clear the file input className="form-control"
      }
    } else {
      setSelectedImage(false);
      e.target.value = null;
    }
  };

  const handleDeleteAndUpdateImage = async (action) => {
    setIsUpdateDisabled(true);
    setIsDeleteDisabled(true);
    setIsUploading(true);
    const formData = {
      Id: loggedInUser.id,
      file: selectedImage,
    };

    if (action === "deleted") {
      formData.isDeleted = true;
    }
    try {
      const response = await dispatch(updateProfileImage(formData));
      if (response?.payload) {
        setValues({
          profile: response?.payload?.profile,
        });
      }
    } catch (error) {
      // Handle request error
      toast.error("Failed to update image");
    } finally {
      setIsUpdateDisabled(false);
      setIsDeleteDisabled(false);
      setIsUploading(false);
    }
  };

  const handleDeleteImage = () => {
    handleDeleteAndUpdateImage("deleted");
  };

  const handleUpdateImage = () => {
    handleDeleteAndUpdateImage("udpated");
  };

  const handleDispatch = async (action) => {
    try {
      const resultAction = await dispatch(action);
      const response = resultAction.payload;
      setValues({
        id: response.id || "",
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        email: response.email || "",
        address: response.address || "",
        primaryContact: response.primaryContact || "",
        secondaryContact: response.secondaryContact || "",
        DOB: response.dob || "",
        gender: response.gender || "",
        profile: response.profile || "",
      });
      if (response.profile != null && response.profile) {
        setIsDeleteDisabled(false);
      } else {
        setIsDeleteDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedInUser.id) {
      handleDispatch(getLoggedInUser(loggedInUser.id));
    }
  }, []);

  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    primaryContact: "",
    secondaryContact: "",
    address: "",
    gender: "",
    profile: "",
  };
  const validateUpdateProfile = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    address: Yup.string().required("Address is required"),
    primaryContact: Yup.string().required("Primary Contact is required"),
    secondaryContact: Yup.string().required("Secondary Contact is required"),
    DOB: Yup.string().required("DOB is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const { values, handleBlur, handleChange, handleSubmit, setValues, errors } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateUpdateProfile,
      onSubmit: async (values) => {
        try {
          setShowSpinner(true);
          const action = dispatch(updateProfile(values));
          const resultAction = await action;
          console.log(resultAction);
        } catch (error) {
        } finally {
          setShowSpinner(false);
        }
      },
    });

  return (
    <>
      <div className="row px-5 pb-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center mt-4">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    className="rounded-circle"
                    width={150}
                    height={150}
                    alt="Selected"
                  />
                ) : (
                  <img
                    src={values.profile ? values.profile : userIcon}
                    className="rounded-circle"
                    width={150}
                    height={150}
                    alt="user-profile"
                  />
                )}
                <div className="my-3 d-md-flex justify-content-md-center">
                  <input
                    className="form-control w-75"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="mt-3 gap-2 d-md-flex justify-content-md-center">
                <button
                  type="button"
                  className="btn-sm btn-danger"
                  onClick={handleDeleteImage}
                  disabled={isDeleteDisabled || isUploading}
                >
                  Delete Image
                </button>

                <button
                  className="btn-sm btn-primary"
                  type="submit"
                  onClick={handleUpdateImage}
                  disabled={isUpdateDisabled || isUploading || !selectedImage}
                >
                  Update Image
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form className="" method="put" onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="hidden"
                  value={values.id}
                />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Email</label>
                      <input
                        className="form-control"
                        name="firstName"
                        type="firstName"
                        autoComplete="on"
                        value={values.firstName}
                        onChange={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                      />
                      {errors.firstName && (
                        <small className="text-danger">
                          {errors.firstName}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        className="form-control"
                        name="lastName"
                        type="lastName"
                        autoComplete="on"
                        value={values.lastName}
                        onChange={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                      />
                      {errors.lastName && (
                        <small className="text-danger">{errors.lastName}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        autoComplete="on"
                        value={values.email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        className="form-control"
                        name="DOB"
                        type="date"
                        autoComplete="off"
                        value={values.DOB}
                        onChange={handleChange("DOB")}
                      />
                      {errors.DOB && (
                        <small className="text-danger">{errors.DOB}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Primary Contact</label>
                      <input
                        className="form-control"
                        name="primaryContact"
                        type="text"
                        autoComplete="off"
                        value={values.primaryContact}
                        onChange={handleChange("primaryContact")}
                        onBlur={handleBlur("primaryContact")}
                      />
                      {errors.primaryContact && (
                        <small className="text-danger">
                          {errors.primaryContact}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Secondary Contact</label>
                      <input
                        className="form-control"
                        name="secondaryContact"
                        type="text"
                        autoComplete="off"
                        value={values.secondaryContact}
                        onChange={handleChange("secondaryContact")}
                        onBlur={handleBlur("secondaryContact")}
                      />
                      {errors.secondaryContact && (
                        <small className="text-danger">
                          {errors.secondaryContact}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        className="form-control"
                        name="address"
                        type="text"
                        autoComplete="off"
                        value={values.address}
                        onChange={handleChange("address")}
                        onBlur={handleBlur("address")}
                      />
                      {errors.address && (
                        <small className="text-danger">{errors.address}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <label>Gender: </label>
                    <div className="form-group" tag="fieldset">
                      <div
                        className="form-group form-check-inline"
                        check
                        inline
                      >
                        <label check>
                          <input
                            className=""
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={values.gender === "Male"}
                            onChange={handleChange("gender")}
                          />{" "}
                          Male
                        </label>
                      </div>
                      <div className="form-group form-check-inline">
                        <label check>
                          <input
                            className=""
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={values.gender === "Female"}
                            onChange={handleChange("gender")}
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <small className="text-danger">{errors.gender}</small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={showSpinner}
                    >
                      {showSpinner && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
