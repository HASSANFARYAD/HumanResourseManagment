import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError, getResponse } from "../utils/utility";

//const baseUrl = "http://usman78056-001-site7.gtempurl.com/api/";
const baseUrl = "https://localhost:7093/api/";

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
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
      const responseBack = getResponse(response, dispatch);
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

export const sendForgotPasswordEmail = createAsyncThunk(
  "user/ForgotEmail",
  async (email, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${baseUrl}/Auth/ForgotPassword`,
        email,
        config
      );
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.auth?.userAuth;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const response = await axios.get(
        `${baseUrl}Auth/GetLoggedinUser?id=${id}`,
        config
      );
      const responseBack = getResponse(response, dispatch, user);
      return responseBack;
    } catch (error) {
      handleApiError(error, dispatch, user);
    }
  }
);

// Update Profile
export const updateProfileAction = createAsyncThunk(
  "user/updateProfile",
  async (users, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.auth?.userAuth?.data;
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      const response = await axios.put(
        `${baseUrl}/Auth/UpdateProfile`,
        users,
        config
      );
      console.log("Profile Update:", response);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update or Delete Profile Image
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const formData = new FormData();
    formData.append("file", user.file);
    //get user token
    const users = getState()?.auth?.userAuth?.data;
    const config = {
      headers: {
        Authorization: `Bearer ${users?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(
        `${baseUrl}Admin/UploadPicture?UserId=${user.UserId}`,
        formData,
        config
      );
      console.log("Profile Image:", response);
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update Password
export const updatePasswordAction = createAsyncThunk(
  "user/updatePassword",
  async (password, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.auth?.userAuth?.data;
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      const response = await axios.put(
        `${baseUrl}/Auth/UpdatePassword`,
        password,
        config
      );
      console.log("Password Update:", response);
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

console.log(userLoginFromStorage);

const authSlices = createSlice({
  name: "authentication",
  initialState: {
    userAuth: userLoginFromStorage,
    loading: false,
    appErr: null,
    appStatus: null,
    appStatusCode: null,
    serverErr: null,
  },
  extraReducers: (builder) => {
    //MiddleWare authentication

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.appErr = undefined;
      state.loading = true;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.loading = false;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
      state.loading = false;
    });

    //Profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileLoading = false;
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
    });

    //Update/Delete Profile Image
    builder.addCase(updateProfileImage.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.profileLoading = false;
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });

    //Forgot Password
    builder.addCase(sendForgotPasswordEmail.pending, (state, action) => {
      state.loading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(sendForgotPasswordEmail.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.loading = false;
    });

    //Update Profile
    builder.addCase(updateProfileAction.pending, (state, action) => {
      state.loading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.loading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.loading = false;
    });

    //Update Password
    builder.addCase(updatePasswordAction.pending, (state, action) => {
      state.loading = true;
      state.appStatusCode = undefined;
      state.profileAppErr = undefined;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(updatePasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appStatus = false;
      state.appStatusCode = undefined;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(updatePasswordAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.loading = false;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });

    //Logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default authSlices.reducer;
