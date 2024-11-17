import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  Card,
  Typography,
  InputLabel,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import FileToBase64 from "../../components/custom/FiletoBase64";

const VariantForm = ({ index, variant, onChange, onRemove, onImageChange }) => {
  const [variantImages, setVaraintImages] = useState([]);
  const handleFieldChange = (field, value) => {
    onChange(index, field, value); // Inform parent component of the change
  };

  const handleFileChange = (files) => {
    onImageChange(index, files); // Pass image files to the parent
  };

  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">Variant {index + 1}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Variant Name"
            variant="outlined"
            fullWidth
            value={variant.variantName}
            onChange={(e) => handleFieldChange("variantName", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Variant SKU"
            variant="outlined"
            fullWidth
            value={variant.variantSKU}
            onChange={(e) => handleFieldChange("variantSKU", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Variant Color"
            variant="outlined"
            fullWidth
            value={variant.variantColor}
            onChange={(e) => handleFieldChange("variantColor", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Variant Size"
            variant="outlined"
            fullWidth
            value={variant.variantSize}
            onChange={(e) => handleFieldChange("variantSize", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Stock"
            variant="outlined"
            fullWidth
            type="number"
            value={variant.stock}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), 0); // Ensure value is at least 1
              handleFieldChange("stock", value);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            type="number"
            value={variant.variantPrice}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), 1); // Ensure value is at least 1
              handleFieldChange("variantPrice", value);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Sale Price"
            variant="outlined"
            fullWidth
            type="number"
            value={variant.salePrice}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), 1); // Ensure value is at least 1
              handleFieldChange("salePrice", value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel>Gallery</InputLabel>
          <FileToBase64
            onFilesConverted={handleFileChange}
            multiple={true}
            fileType={"image"}
          />
        </Grid>

        <Grid item xs={12}>
          <IconButton color="secondary" onClick={() => onRemove(index)}>
            <RemoveCircle />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default VariantForm;
