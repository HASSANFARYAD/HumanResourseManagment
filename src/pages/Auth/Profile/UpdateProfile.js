import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedInUser,
  updateProfile,
  updateProfileImage,
} from "../../../redux/Actions/authActions";
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
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import EditIcon from '@mui/icons-material/Edit';
import CustomCard from "../../../theme-styles/customCard";
import BreadCrumb from "../../../components/custom/breadCrumb";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const loggedInUser = useSelector((state) => state?.authentication?.userAuth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(false);
  // #region Maps variables
  const [isLoaded, setIsLoaded] = useState(true);
  let defaultMarkers = [];
  // #endregion Maps variables

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image && image.size <= 2 * 1024 * 1024) {
      setSelectedImage(image);
      setIsUpdateDisabled(false);
    } else {
      toast.warning("Image must be less than 2 MB.");
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
        setFieldValue("profile", response?.payload?.profile);
      }
    } catch (error) {
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
    handleDeleteAndUpdateImage("updated");
  };

  const handleDispatch = async (action) => {
    try {
      const resultAction = await dispatch(action);
      const response = resultAction.payload;
      setFieldValue("id", response.id || "");
      setFieldValue("firstName", response.firstName || "");
      setFieldValue("lastName", response.lastName || "");
      setFieldValue("userName", response.userName || "");
      setFieldValue("email", response.email || "");
      setFieldValue("address", response.address || "");
      setFieldValue("contactNumber", response.contactNumber || "");
      setFieldValue("DOB", response.dob || "");
      setFieldValue("gender", response.gender || "");
      setFieldValue("latitude", response.latitude || "");
      setFieldValue("longitude", response.longitude || "");

      if (response.profilePath != null && response.profilePath) {
        setFieldValue("profile", response.profilePath);
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
    userName: "",
    email: "",
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
      <BreadCrumb pageName="Profile"/>

      <Container maxWidth="lg">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <CustomCard>
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : values.profile
                          ? values.profile
                          : "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
                      }
                      sx={{ width: 210, height: 210 }}
                      alt="Profile"
                    />
                    <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                      <Input
                        accept="image/*"
                        id="upload-photo"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="upload-photo">
                        <IconButton color="primary" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>

                      <IconButton color="error" component="span" 
                        onClick={handleDeleteImage}
                        disabled={isDeleteDisabled || isUploading}
                      >
                          <DeleteIcon />
                      </IconButton>

                      <IconButton color="primary" component="span" 
                        onClick={handleUpdateImage}
                        disabled={isUpdateDisabled || isUploading || !selectedImage}
                      >
                          <EditIcon />
                      </IconButton>

                    </Stack>
                  </Box>
                </CardContent>
              </CustomCard>
            </Grid>

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
                        disabled={showSpinner}
                        sx={{
                          padding:'6px 16px'
                        }}
                      >
                        {showSpinner ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Update Profile"
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </CustomCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default UpdateProfile;
