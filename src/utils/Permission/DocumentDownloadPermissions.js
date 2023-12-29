export const GetDocumentDownloadPermission = (getRole) => {
  if (getRole === "SuperAdmin") {
    return [
      { Id: "1", Name: "Offer Letter", Permission: true },
      { Id: "2", Name: "Employment Contract", Permission: true },
      { Id: "3", Name: "Appointment Letter", Permission: true },
      { Id: "4", Name: "Salary Increment Letter", Permission: true },
      { Id: "5", Name: "Promotion Letter", Permission: true },
      { Id: "6", Name: "Transfer Letter", Permission: true },
      { Id: "7", Name: "Termination Letter", Permission: true },
      { Id: "8", Name: "Resignation Acceptance Letter", Permission: true },
      { Id: "9", Name: "Experience Certificate", Permission: true },
      {
        Id: "10",
        Name: "Training or Certification Completion Letter",
        Permission: true,
      },
      { Id: "11", Name: "Appreciation Letter", Permission: true },
      { Id: "12", Name: "Warning Letter", Permission: true },
      {
        Id: "13",
        Name: "Attendance or Leave Approval Letter",
        Permission: true,
      },
    ];
  } else if (getRole === "CompanyAdmin" || getRole === "Hr") {
    return [
      { Id: "1", Name: "Offer Letter", Permission: true },
      { Id: "2", Name: "Employment Contract", Permission: true },
      { Id: "3", Name: "Appointment Letter", Permission: true },
      { Id: "4", Name: "Salary Increment Letter", Permission: true },
      { Id: "5", Name: "Promotion Letter", Permission: true },
      { Id: "6", Name: "Transfer Letter", Permission: true },
      { Id: "7", Name: "Termination Letter", Permission: true },
      { Id: "8", Name: "Resignation Acceptance Letter", Permission: true },
      { Id: "9", Name: "Experience Certificate", Permission: true },
      {
        Id: "10",
        Name: "Training or Certification Completion Letter",
        Permission: true,
      },
      { Id: "11", Name: "Appreciation Letter", Permission: true },
      { Id: "12", Name: "Warning Letter", Permission: true },
      {
        Id: "13",
        Name: "Attendance or Leave Approval Letter",
        Permission: true,
      },
    ];
  } else {
    return [];
  }
};
