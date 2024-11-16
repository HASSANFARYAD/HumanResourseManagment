import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  CardContent,
} from "@mui/material";
import CustomCard from "../../theme-styles/customCard";
import BreadCrumb from "../../components/custom/breadCrumb";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router";
import { addUpdateBrand } from "../../redux/Actions/brandActions";
import FileToBase64 from "../../components/custom/FiletoBase64";

const AddUpdateBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUpdatedCall, setIsUpdateCall] = useState(false);
  const [loader, setLoader] = useState(false);
  const recordForUpdate = location.state;

  const [base64Images, setBase64Images] = useState([]);

  const handleFilesConverted = (files) => {
    setBase64Images(files);
  };

  useEffect(() => {
    if (recordForUpdate) {
      setIsUpdateCall(true);
    }
  }, [recordForUpdate]);

  const initialValues = {
    id: recordForUpdate?.id || "",
    brandName: recordForUpdate?.brandName || "",
    description: recordForUpdate?.description || "",
    brandImage: recordForUpdate?.brandImage || "",
    isUpdated: isUpdatedCall,
  };

  const validateProfile = Yup.object().shape({
    brandName: Yup.string()
      .min(4, "Name must be at least 4 characters long.")
      .required(" Name is a required field."),
  });

  const {
    values,
    errors,
    touched,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validateProfile,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const filePayload = base64Images.map((image) => ({
          Id: null,
          FileName: image.fileName,
          FileType: image.fileType,
          FileContent: image.base64,
          FileSize: null,
          ContentType: image.fileType,
        }));
        const payload = {
          ...values,
          file: filePayload[0],
        };
        await dispatch(addUpdateBrand(payload));
      } catch (error) {
        console.error(error);
      } finally {
        resetForm();
        setLoader(false);
      }
    },
  });

  return (
    <>
      <BreadCrumb pageName={isUpdatedCall ? "Update Brand" : "Add New Brand"} />

      <Container maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <CustomCard>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Brand Name"
                      name="brandName"
                      value={values.brandName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.brandName && Boolean(errors.brandName)}
                      helperText={touched.Name && errors.Name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      placeholder="Description"
                      multiline
                      rows={5}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FileToBase64
                      onFilesConverted={handleFilesConverted}
                      multiple={false}
                      fileType={"image"}
                    />
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
                      Submit
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

export default AddUpdateBrand;
