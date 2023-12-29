import React from "react";
import html2pdf from "html2pdf.js";

const generatePDF = (contentId) => {
  const content = document.getElementById(contentId);

  if (content) {
    const pdfOptions = {
      margin: 10,
      filename: "generated-document.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(content, pdfOptions);
  } else {
    console.error(`Element with ID '${contentId}' not found.`);
  }
};

export default generatePDF;
