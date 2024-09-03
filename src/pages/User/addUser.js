import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  FormLabel,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import CustomCard from "../../theme-styles/customCard";
import BreadCrumb from "../../components/custom/breadCrumb";
import PasswordChecklist from "react-password-checklist";
import PasswordField from "../../components/custom/password-field";
import { addNewUser } from "../../redux/Actions/userActions";

const AddUser = () => {
  const dispatch = useDispatch();

  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    contactNumber: "",
    address: "",
    gender: "",
    latitude: "",
    longitude: "",
    profile: "",
  };

  const validateUpdateProfile = Yup.object().shape({
    firstName: Yup.string()
      .min(4, "First Name must be at least 4 characters long.")
      .required("First Name is a required field."),
    lastName: Yup.string()
      .min(4, "Last Name must be at least 4 characters long.")
      .required("Last Name is a required field."),
    userName: Yup.string()
      .min(4, "Username must be at least 4 characters long and unique.")
      .required("Username is a required field."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is a required field."),
    contactNumber: Yup.string()
      .min(11, "Phone Number must be at least 11 digits long.")
      .required("Phone Number is a required field."),
    DOB: Yup.date()
      .required("Date of Birth is a required field.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old."
      ),
    password: Yup.string().required("Password is a required field."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is a required field."),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateUpdateProfile,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: async (values) => {
        try {
          await dispatch(addNewUser(values));
        } catch (error) {
        } finally {
        }
      },
    });

  const isPasswordMatch = values.password === values.confirmPassword;
  const updateButtonDisabled = !isPasswordMatch;
  console.log("errors:: ", errors);
  return (
    <>
      <BreadCrumb pageName="Profile" />

      <Container maxWidth="lg">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <CustomCard>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="User Name"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.userName && Boolean(errors.userName)}
                      helperText={touched.userName && errors.userName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <PasswordField
                      label="New Password"
                      name="password"
                      placeholder="Enter new password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Typography color="error" variant="body2" align="right">
                        {errors.password}
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
                      value={values.password}
                      onChange={(isValid) => {}}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <PasswordField
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Typography color="error" variant="body2" align="right">
                        {errors.confirmPassword}
                      </Typography>
                    )}

                    {!isPasswordMatch && (
                      <Typography color="error" variant="body2" align="right">
                        Password & Confirm Password do not match!
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.contactNumber && Boolean(errors.contactNumber)
                      }
                      helperText={touched.contactNumber && errors.contactNumber}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="DOB"
                      value={values.DOB}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.DOB && Boolean(errors.DOB)}
                      helperText={touched.DOB && errors.DOB}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      name="latitude"
                      value={values.latitude}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.latitude && Boolean(errors.latitude)}
                      helperText={touched.latitude && errors.latitude}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      name="longitude"
                      value={values.longitude}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.longitude && Boolean(errors.longitude)}
                      helperText={touched.longitude && errors.longitude}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        row
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </Box>
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        padding: "6px 16px",
                      }}
                    >
                      Add User
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </CustomCard>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default AddUser;
