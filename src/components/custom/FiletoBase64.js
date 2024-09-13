import React, { useRef, useState } from "react";
import {
  Button,
  Stack,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FileToBase64 = ({ onFilesConverted, multiple, fileType }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    let validImageFiles = [];
    if (fileType === "image") {
      validImageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
    }

    if (validImageFiles.length === 0) {
      console.error("Please upload valid image files.");
      return;
    }

    const promises = validImageFiles.map((file) => convertToBase64(file));

    Promise.all(promises)
      .then((base64Files) => {
        setBase64Files(base64Files);
        onFilesConverted(base64Files);
        setImagePreviews(base64Files.map((file) => file.base64));

        // Reset the file input value after processing files
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
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
          base64: reader.result.split(",")[1],
        });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const removeImage = (index) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = base64Files.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);
    setBase64Files(updatedFiles);
    onFilesConverted(updatedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
  };
  console.log("updatedPreviews", imagePreviews);
  console.log("updatedFiles", base64Files);

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 4,
        border: `2px dashed ${isDragging ? "#1976d2" : "#ccc"}`,
        borderRadius: 2,
        textAlign: "center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
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
            accept={fileType === "image" ? "image/*" : "*"}
            type="file"
            ref={fileInputRef}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </Box>

      <Box
        sx={{
          overflowY: "auto",
          height: imagePreviews.length > 0 ? "200px" : "auto",
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
              <Box key={index} sx={{ position: "relative", margin: "5px" }}>
                <img
                  src={`data:image/*;base64,${base64}`}
                  alt="Uploaded"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => removeImage(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    "&:hover": {
                      background: "red",
                    },
                  }}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default FileToBase64;
