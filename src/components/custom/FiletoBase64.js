import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container, Typography, Box } from "@mui/material";

const FileToBase64 = ({ onFilesConverted, multiple }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // To track drag state

  const handleFiles = (files) => {
    const validImageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImageFiles.length === 0) {
      console.error("Please upload valid image files.");
      return;
    }

    const promises = validImageFiles.map((file) => convertToBase64(file));

    Promise.all(promises)
      .then((base64Files) => {
        onFilesConverted(base64Files);
        setImagePreviews(base64Files.map((file) => file.base64));
      })
      .catch((err) => {
        console.error("Error converting files to Base64", err);
      });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve({
          fileName: file.name,
          fileType: file.type,
          base64: reader.result.split(",")[1], // Extract the Base64 part
        });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Drag and drop handlers
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true); // Highlight container on drag
  };

  const handleDragLeave = () => {
    setIsDragging(false); // Remove highlight when drag leaves
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false); // Remove highlight on drop

    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 4,
        border: `2px dashed ${isDragging ? "#1976d2" : "#ccc"}`, // Blue border when dragging
        borderRadius: 2,
        textAlign: "center",
        position: "relative",
        //height: "400px", // Fixed height for the entire container
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Space between button and image area
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1, // Ensures the button stays on top
        }}
      >
        <label htmlFor="upload-image">
          <Button
            variant="text"
            component="span"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              color: "#333",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Upload
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Drag and drop files here
          </Typography>
          <input
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </Box>

      <Box
        sx={{
          overflowY: "auto", // Makes the image preview section scrollable
          height: imagePreviews.length > 0 ? "200px" : "auto", // Set a fixed height for image area
          mt: imagePreviews.length > 0 ? 4 : 0,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {imagePreviews.length > 0 &&
            imagePreviews.map((base64, index) => (
              <img
                key={index}
                src={`data:image/*;base64,${base64}`}
                alt="Uploaded"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "5px",
                }}
              />
            ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default FileToBase64;
