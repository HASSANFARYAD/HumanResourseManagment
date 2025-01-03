import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig } from "../../utils/_apiConfig";

//#region Login, Logout
export const postLogin = createAsyncThunk(
  "user/postLogin",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `${baseUrl}Auth/Login`,
        userData,
        config
      );
      const responseBack = processApiResponse(response, dispatch);
      if (!responseBack?.data && responseBack?.data === undefined) {
        toast.error(responseBack?.message);
      }
      localStorage.setItem("userInfo", JSON.stringify(responseBack));
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth?.userAuth;
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      handleApiError(error, dispatch, user);
    }
  }
);

//#endregion

//#region Profile
export const getLoggedInUser = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.get(
        `${baseUrl}User/GetRecord?id=${id}`,
        config
      );
      const responseBack = processApiResponse(
        response,
        dispatch,
        getState().authentication?.userAuth
      );
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const users = getState()?.authentication?.userAuth;
    const formData = new FormData();
    formData.append("Id", user.Id);
    if (user.isDeleted) {
      formData.append("isDelete", 1);
    } else {
      formData.append("file", user.file);
    }
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(
        `${baseUrl}Auth/ProfileImage`,
        formData,
        config
      );
      const responseBack = processApiResponse(response, dispatch, user);
      if (responseBack?.data) {
        localStorage.setItem("userInfo", JSON.stringify(responseBack.data));
        toast.success(responseBack?.message);
      }
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, user);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (users, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.put(
        `${baseUrl}Auth/UpdateProfile`,
        users,
        config
      );
      const responseBack = processApiResponse(
        response,
        dispatch,
        getState().authentication?.userAuth
      );
      if (responseBack?.data) {
        localStorage.setItem("userInfo", JSON.stringify(responseBack?.data));
        toast.success(responseBack?.message);
      }
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);
//#endregion

//#region Password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (user, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const users = getState()?.authentication?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
      },
    };

    try {
      const response = await axios.put(
        `${baseUrl}Auth/UpdatePassword`,
        user,
        config
      );

      const responseBack = processApiResponse(response, dispatch, user);
      if (responseBack?.message) {
        toast.success(responseBack?.message);
      }
    } catch (error) {
      handleApiError(error, dispatch, users);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/ForgotEmail",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${baseUrl}Auth/ForgotPassword`,
        email,
        config
      );
      const responseBack = processApiResponse(response, dispatch);
      if (responseBack?.message) {
        toast.success(responseBack?.message);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/ResetPassword",
  async (data, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("ResetPassword call api: ", data);
    try {
      const response = await axios.post(
        `${baseUrl}Auth/ResetPassword`,
        data,
        config
      );
      const responseBack = processApiResponse(response, dispatch);
      if (responseBack?.message) {
        toast.success(responseBack?.message);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

//#endregion
