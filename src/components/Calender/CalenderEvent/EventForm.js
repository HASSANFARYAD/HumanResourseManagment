import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Box,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { disabledPreviousDateTime } from "../../../utils/_helpers";

const EventForm = ({ defaultValues = {} }) => {
  const initialValues = {
    title: "",
    startDate: defaultValues.startDate || "",
    endDate: "",
    description: "",
    dropdownValue: "",
  };

  const validatation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    dropdownValue: Yup.string().required("Field is required"),
    startDate: Yup.date().required("Field is required"),
    endDate: Yup.date().required("Field is required"),
    description: Yup.string().nullable("Field is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validatation,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        console.log("values", values);
      } catch (error) {
        console.log("login-page api call error: " + error);
      } finally {
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (defaultValues) {
      setFieldValue("startDate", defaultValues.startDate);
    }
  }, defaultValues);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      {/* Title */}
      <TextField
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange("title")}
        onBlur={handleBlur("title")}
        fullWidth
        margin="normal"
        error={touched.title && errors.title}
      />

      {/* Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="dropdown-label">Event Type</InputLabel>
        <Select
          labelId="dropdown-label"
          name="dropdownValue"
          value={values.dropdownValue}
          onChange={handleChange("dropdownValue")}
          onBlur={handleBlur("dropdownValue")}
        >
          <MenuItem value="meeting">Meeting</MenuItem>
          <MenuItem value="workshop">Workshop</MenuItem>
          <MenuItem value="webinar">Webinar</MenuItem>
        </Select>
        {touched.dropdownValue && errors.dropdownValue && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errors.dropdownValue}
          </Alert>
        )}
      </FormControl>

      {/* Start Date */}
      <TextField
        label="Start Date"
        name="startDate"
        type="datetime-local"
        value={values.startDate}
        onChange={handleChange("startDate")}
        onBlur={handleBlur("startDate")}
        min={disabledPreviousDateTime()}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input
        }}
        error={touched.startDate && errors.startDate}
      />

      {/* End Date */}
      <TextField
        label="End Date"
        name="endDate"
        type="datetime-local"
        value={values.endDate}
        onChange={handleChange("endDate")}
        onBlur={handleBlur("endDate")}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        error={touched.endDate && errors.endDate}
      />

      {/* Description */}
      <TextField
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange("description")}
        onBlur={handleBlur("description")}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
        Create Event
      </Button>
    </Box>
  );
};

export default EventForm;
