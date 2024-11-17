import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { forgotPassword } from "../../../redux/Actions/authActions";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";

const initialValues = {
  email: "",
};

const validateForgotPassword = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Please enter email"),
});

function ForgotPassword() {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        setShowSpinner(true);
        const response = await dispatch(forgotPassword(values));
        if (response) {
          setShowSpinner(false);
          console.log("Email successfully sent:", response);
        }
      } catch (error) {
        console.error("Forgot password error:", error);
      } finally {
        setShowSpinner(false);
      }
    },
  });

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
              Forgot Your Password?
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              We get it, stuff happens. Just enter your email address below
              and we'll send you a link to reset your password!
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Enter Email Address"
                value={values.email}
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
              />
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
                  "Confirm"
                )}
              </Button>
            </form>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Back to{" "}
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  Sign In
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgotPassword;
