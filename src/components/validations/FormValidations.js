import * as Yup from "yup";

export const FormAddUserFormValidation = Yup.object({
  //#region UsersInfo
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  birthDate: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  contact: Yup.string().required("Contact is required"),
  //#endregion

  //#region  AccountInfo
  userName: Yup.string().required("Username is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid Email Address"),
  password: Yup.string().required("Password is required"),
  description: Yup.string().required("Description is required"),
  role: Yup.string().required("Role is required"),
  //#endregion

  //#region AddressInfo
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zipcode is required"),
  timezone: Yup.string().required("Timezone is required"),
  //#endregion
});
