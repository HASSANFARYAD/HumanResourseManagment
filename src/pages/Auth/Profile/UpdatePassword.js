import React, { useState } from "react";
import PasswordField from "../../../components/custom/password-field";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../redux/Actions/authActions";
import { Box, Button, Container, Typography } from "@mui/material";
import PasswordChecklist from "react-password-checklist";

const UpdatePassword = () => {
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: loggedInUser.id,
      oldPassword: "",
      newpassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      newpassword: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        const response = await dispatch(updatePassword(values));
        if (response) {
          setShowSpinner(false);
        }
      } catch (error) {
      } finally {
      }
    },
  });

  const isPasswordMatch =
    formik.values.newpassword === formik.values.confirmPassword;
  const updateButtonDisabled = !isPasswordMatch;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Update Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <input type="hidden" name="id" value={loggedInUser.id} />
          <PasswordField
            label="Old Password"
            name="oldPassword"
            placeholder="Enter your old password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
          />
          {formik.errors.oldPassword && (
            <Typography color="error" variant="body2" align="right">
              {formik.errors.oldPassword}
            </Typography>
          )}

          <PasswordField
            label="New Password"
            name="newpassword"
            placeholder="Enter new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newpassword}
          />
          {formik.errors.newpassword && (
            <Typography color="error" variant="body2" align="right">
              {formik.errors.newpassword}
            </Typography>
          )}
          <label className="font-weight-bold">
            Password Must Contain
          </label>
          <PasswordChecklist
            rules={[
              "minLength",
              "lowercase",
              "capital",
              "number",
              "specialChar",
            ]}
            minLength={8}
            value={formik.values.newpassword}
            onChange={(isValid) => {}}
          />

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && (
            <Typography color="error" variant="body2" align="right">
              {formik.errors.confirmPassword}
            </Typography>
          )}
          
          {!isPasswordMatch && (
            <Typography color="error" variant="body2" align="right">
              Password & Confirm Password do not match!
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={showSpinner || updateButtonDisabled}
            sx={{ mt: 2 }}
          >
            {showSpinner ? (
              <span>
                put spinner here
              </span>
            ) : (
              "Update Password"
            )}
          </Button>
          {!isPasswordMatch && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              Password & Confirm Password do not match!
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default UpdatePassword;
