import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  FormLabel,
  CardContent,
  Typography,
} from "@mui/material";
import CustomCard from "../../theme-styles/customCard";
import BreadCrumb from "../../components/custom/breadCrumb";
import PasswordChecklist from "react-password-checklist";
import PasswordField from "../../components/custom/password-field";
import { addUpdateUser } from "../../redux/Actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router";
import { calculateMaxDate } from "../../utils/_helpers";
import { MuiTelInput } from "mui-tel-input";

const AddUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUpdatedCall, setIsUpdateCall] = useState(false);
  const [loader, setLoader] = useState(false);
  const recordForUpdate = location.state;

  useEffect(() => {
    if (recordForUpdate) {
      setIsUpdateCall(true);
    }
  }, [recordForUpdate]);

  const initialValues = {
    id: recordForUpdate?.id || "",
    firstName: recordForUpdate?.firstName || "",
    lastName: recordForUpdate?.lastName || "",
    userName: recordForUpdate?.userName || "",
    email: recordForUpdate?.email || "",
    password: recordForUpdate?.password || "",
    confirmPassword: recordForUpdate?.confirmPassword || "",
    DOB: recordForUpdate?.dob || "",
    contactNumber: recordForUpdate?.contactNumber || "",
    address: recordForUpdate?.address || "",
    gender: recordForUpdate?.gender || "male",
    latitude: recordForUpdate?.latitude || "",
    longitude: recordForUpdate?.longitude || "",
    profile: recordForUpdate?.profile || "",
    isUpdated: isUpdatedCall,
  };

  const validateProfile = Yup.object().shape({
    isUpdated: Yup.bool(),
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
      .min(9, "Phone Number must be 9 digits long.")
      .required("Phone Number is a required field."),
    DOB: Yup.date()
      .required("Date of Birth is a required field.")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old."
      ),
    password: Yup.string().when(["isUpdated"], (isUpdated, schema) => {
      return isUpdatedCall
        ? schema.optional()
        : schema.min(8).required("Please enter password");
    }),
    confirmPassword: Yup.string().when(["isUpdated"], (isUpdated, schema) => {
      return isUpdatedCall
        ? schema.optional()
        : schema
            .oneOf([Yup.ref("password")], "Password not matched")
            .required("Please enter password");
    }),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validateProfile,
      validateOnChange: false,
      validateOnBlur: true,
      onSubmit: async (values) => {
        try {
          setLoader(true);
          await dispatch(addUpdateUser(values));
        } catch (error) {
        } finally {
          setLoader(false);
        }
      },
    });

  const isPasswordMatch = values.password === values.confirmPassword;

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

                  {!isUpdatedCall && (
                    <>
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
                          <Typography
                            color="error"
                            variant="body2"
                            align="right"
                          >
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
                          <Typography
                            color="error"
                            variant="body2"
                            align="right"
                          >
                            {errors.confirmPassword}
                          </Typography>
                        )}

                        {!isPasswordMatch && (
                          <Typography
                            color="error"
                            variant="body2"
                            align="right"
                          >
                            Password & Confirm Password do not match!
                          </Typography>
                        )}
                      </Grid>
                    </>
                  )}
                  {/* <Grid item xs={12} sm={6}>
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
                  </Grid> */}

                  <Grid item xs={12} sm={6}>
                    <MuiTelInput
                      defaultCountry="US"
                      fullWidth
                      label="Phone Number"
                      name="contactNumber"
                      value={values.contactNumber}
                      disableDropdown
                      onChange={(value) =>
                        handleChange({
                          target: { name: "contactNumber", value },
                        })
                      }
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
                      type="date"
                      value={values.DOB}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.DOB && Boolean(errors.DOB)}
                      helperText={touched.DOB && errors.DOB}
                      InputLabelProps={{
                        shrink: true, // To ensure the label is always shown when type is date
                      }}
                      inputProps={{
                        max: calculateMaxDate(18).toISOString().split("T")[0],
                      }}
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
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
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
                      disabled={loader}
                      endIcon={loader && <CircularProgress size={25} />}
                    >
                      {isUpdatedCall ? <>Update</> : <>Add User</>}
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
