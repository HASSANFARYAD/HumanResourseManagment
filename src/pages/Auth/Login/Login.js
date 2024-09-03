import * as Yup from "yup";
import { useFormik } from "formik";
import { postLogin } from "../../../redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink, Navigate } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress as Spinner,
} from "@mui/material";

const initialValues = {
  email: "",
  password: "",
};

const validateLogin = Yup.object().shape({
  email: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .required("Please enter User Name or Email"),
  password: Yup.string().required("Please enter password"),
});

function Login() {
  const dispatch = useDispatch();

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateLogin,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: (values) => {
        try {
          dispatch(postLogin(values));
        } catch (error) {
          console.log("login-page api call error: " + error);
        }
      },
    });

  const data = useSelector((state) => state?.authentication?.userAuth);
  const loading = useSelector((state) => state?.authentication?.loading);

  if (data && data.id) {
    if (data.role == "0") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
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
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <Typography variant="h5" gutterBottom align="center">
              Welcome Back!
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="UserName or Email"
                value={values.email}
                onBlur={handleBlur("email")}
                onChange={handleChange("email")}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Password"
                type="password"
                value={values.password}
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </form>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </Typography>
              <Typography variant="body2" mt={2}>
                Don't have an account?{" "}
                <NavLink to="/register">Sign Up!</NavLink>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
