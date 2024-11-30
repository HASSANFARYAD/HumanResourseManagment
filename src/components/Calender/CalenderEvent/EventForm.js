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
import {
  disabledPreviousDate,
  disabledPreviousDateTime,
} from "../../../utils/_helpers";
import { useDispatch } from "react-redux";
import { processEvent } from "../../../redux/Actions/eventActions";

const EventForm = ({ defaultValues = {} }) => {
  const dispatch = useDispatch();
  const initialValues = {
    title: "",
    eventDate: defaultValues.eventDate || "",
    eventTime: "",
    description: "",
    eventType: "",
    startTime: "",
    endTime: "",
  };

  const validatation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    eventType: Yup.string().required("Field is required"),
    eventDate: Yup.date().required("Field is required"),
    description: Yup.string().nullable("Field is required"),
    startTime: Yup.string().nullable("Field is required"),
    endTime: Yup.string().nullable("Field is required"),
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
        dispatch(processEvent(values)).then((response) => {
          console.log("response", response.payload);
        });
      } catch (error) {
        console.log("login-page api call error: " + error);
      } finally {
      }
    },
  });

  useEffect(() => {
    if (defaultValues) {
      setFieldValue("eventDate", defaultValues.eventDate);
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
          name="eventType"
          value={values.eventType}
          onChange={handleChange("eventType")}
          onBlur={handleBlur("eventType")}
          InputLabelProps={{
            shrink: true, // Ensures the label stays above the input
          }}
        >
          <MenuItem value="meeting">Meeting</MenuItem>
          <MenuItem value="workshop">Workshop</MenuItem>
          <MenuItem value="webinar">Webinar</MenuItem>
        </Select>
        {touched.eventType && errors.eventType && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errors.eventType}
          </Alert>
        )}
      </FormControl>

      {/* Start Date */}
      <TextField
        label="Event Date"
        name="eventDate"
        type="date"
        value={values.eventDate}
        onChange={handleChange("eventDate")}
        onBlur={handleBlur("eventDate")}
        min={disabledPreviousDate()}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input
        }}
        error={touched.eventDate && errors.eventDate}
      />

      <TextField
        label="Start Time"
        name="startTime"
        type="time"
        value={values.startTime}
        onChange={handleChange("startTime")}
        onBlur={handleBlur("startTime")}
        min={disabledPreviousDateTime()}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input
        }}
        error={touched.startTime && errors.startTime}
      />

      <TextField
        label="End Time"
        name="endTime"
        type="time"
        value={values.endTime}
        onChange={handleChange("endTime")}
        onBlur={handleBlur("endTime")}
        min={disabledPreviousDateTime()}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays above the input
        }}
        error={touched.endTime && errors.endTime}
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
