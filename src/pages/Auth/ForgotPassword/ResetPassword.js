import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../redux/Actions/authActions";
import PasswordField from "../../../components/custom/password-field";
import { NavLink, Navigate, useLocation, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PasswordChecklist from "react-password-checklist";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const query = useQuery();
  const token = query.get("token");
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = {
    token: token  ? token  : "",
    newpassword: "",
    confirmPassword: "",
  };

  const validateResetPassword = Yup.object({
    newpassword: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Please enter password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newpassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validateResetPassword,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        const response = await dispatch(resetPassword(values));
        if (response) {
          setShowSpinner(false);
        }
      } catch (error) {
        console.error("Reset password error:", error);
      } finally {
        setShowSpinner(false);
      }
    },
  });

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Grid container sx={{ height: "100%", display: "flex" }}>
        <Grid
          item
          xs={false}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url('https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
          }}
        />

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            height: "100%",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)", // Shadow on the right side
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px"
            }}
          >
            <Typography variant="h5" gutterBottom align="center">
              Reset Your Password
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Just enter your new password and continue with your account!
            </Typography>

            <form onSubmit={handleSubmit}>
              <PasswordField
                label=""
                name="newpassword"
                placeHolder="New Password"
                onChange={handleChange("newpassword")}
                onBlur={handleBlur("newpassword")}
                value={values.newpassword}
              />
              {errors.newpassword && (
                <Typography color="error" variant="caption">
                  {errors.newpassword}
                </Typography>
              )}
              <Typography>
                Password Must Contain
              </Typography>
              <PasswordChecklist
                rules={[
                  "minLength",
                  "lowercase",
                  "capital",
                  "number",
                  "specialChar",
                ]}
                minLength={8}
                value={values.newpassword}
                onChange={(isValid) => {}}
              />

              <PasswordField
                label=""
                name="confirmPassword"
                placeHolder="Confirm Password"
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && (
                <Typography color="error" variant="caption">
                  {errors.confirmPassword}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={showSpinner}
                sx={{ mt: 2 }}
              >
                {showSpinner ? (
                  <CircularProgress size={24} />
                ) : (
                  "Reset Password"
                )}
              </Button>
              <Box mt={2}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Button fullWidth variant="outlined" color="primary">
                    Back To Login
                  </Button>
                </NavLink>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResetPassword;
