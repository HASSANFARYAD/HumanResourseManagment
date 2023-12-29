import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Dashboard from "../global_component/DashBoard";
import NotFound from "../ErrorPages/NotFound";
import AddCompany from "../ManageCompany/AddCompany";
import CompanyList from "../ManageCompany/CompanyList";
import AddUser from "../ManageUser/AddUser";
import EditUser from "../ManageUser/EditUser";
import UserList from "../ManageUser/UserList";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Profile from "../ManageProfile/UpdateProfile";
import Password from "../ManageProfile/UpdatePassword";
import AdminLogin from "../Login/AdminLogin";
import ResetPassword from "../ForgotPassword/ResetPassword";
import DepartmentList from "../ManageDepartment/DepartmentList";
import AddDepartment from "../ManageDepartment/AddDepartment";
import ViewProfile from "../ManageUser/ViewProfile";
import CompanyProfile from "../ManageCompany/CompanyProfile";

// layouts
import RootLayout from "../layouts/rootLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import UnderDevelopment from "../ErrorPages/UnderDevelopment";

const getRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="register" element={<Register />} />
        <Route path="/reset-password/:id?" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<RootLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="add-company" element={<AddCompany />} />
          <Route path="company-list" element={<CompanyList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="update-user" element={<EditUser />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update-password" element={<Password />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department-list" element={<DepartmentList />} />
          <Route path="view-profile" element={<ViewProfile />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="not-found" element={<NotFound />} />

          {/* if user enter route which is does not exist then this below route page will be called by default */}
        </Route>
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="*" element={<UnderDevelopment />} />
    </>
  )
);

function RouteComp() {
  return (
    <main>
      <RouterProvider router={getRouter} />
    </main>
  );
  // <div className="App">Hello, Ninjas!</div>;
}

export default RouteComp;
