import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import VariantForm from "./variants";
import { AddCircle } from "@mui/icons-material";
import { getDropdowns } from "../../redux/Actions/apiActions";
import { useDispatch } from "react-redux";
import FileToBase64 from "../../components/custom/FiletoBase64";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import { addUpdateProduct } from "../../redux/Actions/productActions";

function AddUpdateProduct() {
  const dispatch = useDispatch();
  const location = useLocation();

  const recordForUpdate = location.state;
  const [categories, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);
  const [isUpdatedCall, setIsUpdateCall] = useState(false);
  const [loader, setLoader] = useState(false);
  const [base64Images, setBase64Images] = useState([]);

  const maxVariants = 5; // Define how many variants a user can add
  const [variants, setVariants] = useState([
    {
      variantName: "",
      variantSKU: "",
      variantColor: "",
      variantSize: "",
      images: [], // To store images for this variant
    },
  ]);

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleImageChange = (index, files) => {
    const newVariants = [...variants];
    newVariants[index].images = files; // Update images for specific variant
    setVariants(newVariants);
  };

  const handleAddVariant = () => {
    if (variants.length < maxVariants) {
      setVariants([
        ...variants,
        {
          variantName: "",
          variantSKU: "",
          variantColor: "",
          variantSize: "",
          images: [],
        },
      ]);
    } else {
      alert(`You can only add a maximum of ${maxVariants} variants.`);
    }
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleFilesConverted = (files) => {
    setBase64Images(files);
  };

  useEffect(() => {
    callDropdown();
  }, []);

  const callDropdown = async () => {
    try {
      const response = await dispatch(
        getDropdowns("Category/GetCategoryDropdown?start=0&length=10")
      );
      setCategory(response?.payload?.list);
    } catch (error) {
    } finally {
      await callBrandDropdowns();
    }
  };

  const callBrandDropdowns = async () => {
    const response = await dispatch(
      getDropdowns("Brand/GetDropdown?start=0&length=10")
    );
    setBrand(response?.payload?.list);
  };

  const initialValues = {
    id: recordForUpdate?.id || "",
    brandId: recordForUpdate?.brandId || "",
    categoryId: recordForUpdate?.categoryId || "",
    productName: recordForUpdate?.productName || "",
    shortDiscription: recordForUpdate?.shortDiscription || "",
    longDiscription: recordForUpdate?.longDiscription || "",
    productGender: recordForUpdate?.productGender || "",
    primaryImage: recordForUpdate?.primaryImage || "",
    isUpdated: isUpdatedCall,
  };

  const validateProfile = Yup.object().shape({
    productName: Yup.string()
      .min(4, "Name must be at least 4 characters long.")
      .required("Name is a required field."),
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
          const primaryFilePayload = base64Images.map((image) => ({
            Id: null,
            FileName: image.fileName,
            FileType: image.fileType,
            FileContent: image.base64,
            FileSize: null,
            ContentType: image.fileType,
          }))[0];

          const variantsPayload = variants.map((variant) => ({
            Id: variant.id || null, // Optional for updates
            ProductId: values.id || null, // Optional if ProductId is required
            VariantName: variant.variantName,
            VariantSKU: variant.variantSKU,
            VariantColor: variant.variantColor,
            VariantSize: variant.variantSize,
            ProductImages: variant.images.map((image) => ({
              Id: null,
              FileName: image.fileName,
              FileType: image.fileType,
              FileContent: image.base64,
              FileSize: null,
              ContentType: image.fileType,
            })),
          }));
          const payload = {
            ...values,
            primaryFile: primaryFilePayload,
            variants: variantsPayload,
          };
          console.log("payload", payload);
          await dispatch(addUpdateProduct(payload));
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      },
    });

  return (
    <Container maxWidth="md">
      <Card elevation={3}>
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Add New Product
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Fill out the details for the new product.
          </Typography>

          <Grid container spacing={2}>
            {/* Product Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={values.productName}
                onChange={handleChange("productName")}
                onBlur={handleBlur("productName")}
                error={touched.productName && Boolean(errors.productName)}
                helperText={touched.productName && errors.productName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Short Description"
                variant="outlined"
                fullWidth
                value={values.shortDiscription}
                onChange={handleChange("shortDiscription")}
                onBlur={handleBlur("shortDiscription")}
                error={
                  touched.shortDiscription && Boolean(errors.shortDiscription)
                }
                helperText={touched.shortDiscription && errors.shortDiscription}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Long Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={values.longDiscription}
                onChange={handleChange("longDiscription")}
                onBlur={handleBlur("longDiscription")}
                error={
                  touched.longDiscription && Boolean(errors.longDiscription)
                }
                helperText={touched.longDiscription && errors.longDiscription}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  value={values.categoryId}
                  onBlur={handleBlur("categoryId")}
                  onChange={handleChange("categoryId")}
                >
                  {categories &&
                    categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        selected={values.categoryId === category.id}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Brand */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Brand"
                  value={values.brandId}
                  onBlur={handleBlur("brandId")}
                  onChange={handleChange("brandId")}
                >
                  {brands &&
                    brands.map((brand) => (
                      <MenuItem
                        key={brand.id}
                        value={brand.id}
                        selected={values.brandId === brand.id}
                      >
                        {brand.brandName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <InputLabel>Primary Image</InputLabel>
              <FileToBase64
                onFilesConverted={handleFilesConverted}
                multiple={false}
                fileType={"image"}
              />
            </Grid>

            {/* Product Variant Section */}
            <Grid item xs={12} container spacing={2}>
              {variants.map((variant, index) => (
                <Grid item xs={12} key={index}>
                  <VariantForm
                    index={index}
                    variant={variant}
                    onChange={handleVariantChange} // Pass change handler to VariantForm
                    onRemove={handleRemoveVariant} // Pass remove handler to VariantForm
                    onImageChange={handleImageChange} // Pass image change handler to VariantForm
                  />
                </Grid>
              ))}

              {/* Add Variant Button */}
              {variants.length < maxVariants && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircle />}
                    onClick={handleAddVariant}
                  >
                    Add Variant
                  </Button>
                </Grid>
              )}
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loader}
              >
                Save Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default AddUpdateProduct;
