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
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    contactNumber: Yup.string()
      .min(8, "Phone Number must be at least 8 characters")
      .required("Phone Number is required"),
    DOB: Yup.date()
      .required("Please select your date of birth")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be 18 years or older"
      ),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm Password is required"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateUpdateProfile,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(addNewUser(values));
        console.log("sibmit");
      } catch (error) {
      } finally {
      }
    },
  });

  const isPasswordMatch = values.password === values.confirmPassword;
  const updateButtonDisabled = !isPasswordMatch;

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
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
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
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
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
                      error={Boolean(errors.userName)}
                      helperText={errors.userName}
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
                      error={Boolean(errors.email)}
                      helperText={errors.email}
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
                    {errors.password && (
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
                    {errors.confirmPassword && (
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
                      error={Boolean(errors.contactNumber)}
                      helperText={errors.contactNumber}
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
                      error={Boolean(errors.DOB)}
                      helperText={errors.DOB}
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
                      error={Boolean(errors.address)}
                      helperText={errors.address}
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
                      error={Boolean(errors.latitude)}
                      helperText={errors.latitude}
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
                      error={Boolean(errors.longitude)}
                      helperText={errors.longitude}
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
