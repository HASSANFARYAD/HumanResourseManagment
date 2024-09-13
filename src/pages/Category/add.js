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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomCard from "../../theme-styles/customCard";
import BreadCrumb from "../../components/custom/breadCrumb";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router";
import { addUpdateCategory } from "../../redux/Actions/categoryAction";
import { getDropdowns } from "../../redux/Actions/apiActions";
import FileToBase64 from "../../components/custom/FiletoBase64";

const AddUpdateCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isUpdatedCall, setIsUpdateCall] = useState(false);
  const [loader, setLoader] = useState(false);
  const recordForUpdate = location.state;

  const [getCategorieDropdown, setCategorieDropdown] = useState([]);
  const [base64Images, setBase64Images] = useState([]);

  const handleFilesConverted = (files) => {
    setBase64Images(files);
  };

  useEffect(() => {
    if (recordForUpdate) {
      setIsUpdateCall(true);
    }
    callDropdown();
  }, [recordForUpdate]);

  const callDropdown = async () => {
    const response = await dispatch(
      getDropdowns("Category/GetCategoryDropdown?start=0&length=10")
    );
    setCategorieDropdown(response?.payload?.list);
  };

  const initialValues = {
    id: recordForUpdate?.id || "",
    Name: recordForUpdate?.name || "",
    description: recordForUpdate?.description || "",
    parentId: recordForUpdate?.parentId || "",
    image: recordForUpdate?.image || "",
    isUpdated: isUpdatedCall,
  };

  const validateProfile = Yup.object().shape({
    Name: Yup.string()
      .min(4, "First Name must be at least 4 characters long.")
      .required("First Name is a required field."),
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
            files: filePayload, // Use the base64 images in your payload
          };
          await dispatch(addUpdateCategory(payload));
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      },
    });

  return (
    <>
      <BreadCrumb
        pageName={isUpdatedCall ? "Update Category" : "Add New Category"}
      />

      <Container maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <CustomCard>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Parent Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Parent Category"
                        value={values.parentId}
                        onBlur={handleBlur("parentId")}
                        onChange={handleChange("parentId")}
                      >
                        {getCategorieDropdown &&
                          getCategorieDropdown.map((category) => (
                            <MenuItem
                              key={category.id}
                              value={category.id}
                              selected={values.parentId === category.id}
                            >
                              {category.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="Name"
                      value={values.Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.Name && Boolean(errors.Name)}
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
                      maxRows={10}
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

export default AddUpdateCategory;
