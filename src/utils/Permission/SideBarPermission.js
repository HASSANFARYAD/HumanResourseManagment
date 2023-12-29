export const GetSideBarPermission = (getRole) => {
  if (getRole === "SuperAdmin") {
    return [
      { Name: "/home", Permission: true },
      { Name: "/add-company", Permission: true },
      { Name: "/company-list", Permission: true },
      { Name: "/add-user", Permission: true },
      { Name: "/user-list", Permission: true },
      { Name: "/profile", Permission: true },
      { Name: "/update-password", Permission: true },
      { Name: "/department-list", Permission: true },
      { Name: "/add-department", Permission: true },
      { Name: "/view-profile", Permission: true },
      { Name: "/company-profile", Permission: true },
    ];
  } else if (getRole === "CompanyAdmin" || getRole === "Hr") {
    return [
      { Name: "/home", Permission: true },
      { Name: "/add-user", Permission: true },
      { Name: "/user-list", Permission: true },
      { Name: "/profile", Permission: true },
      { Name: "/update-password", Permission: true },
      { Name: "/department-list", Permission: true },
      { Name: "/add-department", Permission: true },
      { Name: "/view-profile", Permission: true },
      { Name: "/company-profile", Permission: true },
    ];
  } else {
    return [
      //   { Name: "/home", Permission: true },
      //   { Name: "/add-user", Permission: true },
      //   { Name: "/user-list", Permission: true },
    ];
  }
};
