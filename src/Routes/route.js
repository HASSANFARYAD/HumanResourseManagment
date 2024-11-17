import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import AdminDashboard from "../pages/Dashboard/adminDashboard";
import UserDashboard from "../pages/Dashboard/userDashboard";

import Login from "../pages/Auth/Login/Login";
import UpdateProfile from "../pages/Auth/Profile/UpdateProfile";
import UpdatePassword from "../pages/Auth/Profile/UpdatePassword";

import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ForgotPassword/ResetPassword";

import AuthLayout from "../components/Layouts/layout-auth";
import RootLayout from "../components/Layouts/layout-root";
import ProtectedLayout from "../components/Layouts/protected";

import AddUser from "../pages/User/addUser";
import UsersList from "../pages/User/List";

import AddUpdateCategory from "../pages/Category/add";
import Categories from "../pages/Category/list";

import AddUpdateBrand from "../pages/Brand/add";
import BrandsList from "../pages/Brand/list";
import AddUpdateProduct from "../pages/Product/add";
import ProductList from "../pages/Product/list";

const createRoute = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="reset-password/:token?" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route element={<RootLayout />}>
          <Route path="home" element={<UserDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="profile" element={<UpdateProfile />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="users-list" element={<UsersList />} />

          <Route path="add-categories" element={<AddUpdateCategory />} />
          <Route path="categories" element={<Categories />} />

          <Route path="add-brand" element={<AddUpdateBrand />} />
          <Route path="brands" element={<BrandsList />} />

          <Route path="product" element={<AddUpdateProduct />} />
          <Route path="products" element={<ProductList />} />
        </Route>
      </Route>
    </>
  )
);

function AppRoutes() {
  return (
    <>
      <RouterProvider router={createRoute} />
    </>
  );
}

export default AppRoutes;
