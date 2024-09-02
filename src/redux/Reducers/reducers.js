import { createSlice } from "@reduxjs/toolkit";
import {
  postLogin,
  logoutAction,
  updateProfileImage,
  updateProfile,
  updatePassword,
  resetPassword,
} from "../Actions/authActions";

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

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
    builder.addCase(postLogin.pending, (state, action) => {
      state.appErr = undefined;
      state.loading = true;
      state.serverErr = undefined;
      state.appStatus = action.payload?.status || null;
      state.appStatusCode = action.payload?.statusCode || null;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.loading = false;
      state.serverErr = undefined;
      state.appStatus = action.payload?.status || null;
      state.appStatusCode = action.payload?.statusCode || null;
    });
    builder.addCase(postLogin.rejected, (state, action) => {
      state.appErr = action.payload?.message || null;
      state.serverErr =
        action.error?.message || "An error occurred on the server.";
      state.appStatus = action.payload?.status || null;
      state.appStatusCode = action.payload?.statusCode || null;
      state.loading = false;
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

    builder.addCase(updateProfileImage.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.userAuth = action?.payload ? action.payload : state.userAuth;
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

    builder.addCase(updateProfile.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.userAuth = action?.payload ? action.payload : state.userAuth;
      state.profileLoading = false;
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
      state.profileLoading = false;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });

    builder.addCase(updatePassword.pending, (state, action) => {
      state.loading = true;
      state.profileAppErr = undefined;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      state.appStatusCode = undefined;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
      state.appStatus = false;
      state.appStatusCode = undefined;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.loading = false;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
      state.appStatusCode = undefined;
      state.profileAppErr = undefined;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.appStatus = false;
      state.appStatusCode = undefined;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.loading = false;
      state.serverErr = undefined;
      state.appStatus = action?.payload?.status;
      state.appStatusCode = action?.payload?.statusCode;
    });
  },
});
export default authSlices.reducer;
