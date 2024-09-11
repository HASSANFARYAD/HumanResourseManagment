import React from "react";

const FileToBase64 = ({ onFilesConverted }) => {
  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    const promises = files.map((file) => convertToBase64(file));

    Promise.all(promises)
      .then((base64Files) => {
        onFilesConverted(base64Files); // Callback with the array of Base64-encoded files
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

  return <input type="file" multiple onChange={handleFiles} accept="image/*" />;
};

export default FileToBase64;
