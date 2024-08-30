// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { baseUrl } from "../../utils/_envConfig";
// import { getAuthConfig, getAuthToken } from "../../utils/_apiConfig";
// import { handleApiRequest } from "../../utils/_handler/_handleApiRequest";
// import { toast } from "react-toastify";


//   // Post Login
//   export const postLogin = createAsyncThunk(
//     "auth/postLogin",
//     async (userData, { rejectWithValue, getState, dispatch }) => {
//       const config = getAuthConfig(getState);
//       try {
//         const requestFn = () => axios.post(`${baseUrl}Auth/Login`, userData, config);
//         const responseBack = await handleApiRequest(requestFn, dispatch);
  
//         if (responseBack) {
//           localStorage.setItem("userInfo", JSON.stringify(responseBack));
//           return responseBack;
//         }
//       } catch (error) {
//         return rejectWithValue(error.response?.data || "Login failed");
//       }
//     }
//   );
  
//   // Logout Action
//   export const logoutAction = createAsyncThunk(
//     "auth/logout",
//     async (_, { dispatch }) => {
//       localStorage.removeItem("userInfo");
//       // dispatch(clearAuthState());
//     }
//   );

//   //#region Profile
//   export const getLoggedInUser = createAsyncThunk(
//     "user/profile",
//     async (id, { rejectWithValue, getState, dispatch }) => {

//       try {
//         const config = getAuthConfig(getState);
//         const requestFn = () => axios.get(`${baseUrl}User/GetRecord?id=${id}`, config);
//         const responseBack = await handleApiRequest(requestFn, dispatch, getAuthToken(getState));
//         return responseBack;
//       } catch (error) {
//         rejectWithValue(error.response?.data || "Login failed");
//       }
//     }
//   );

//   export const updateProfileImage = createAsyncThunk(
//     "user/updateProfileImage",
//     async (user, { rejectWithValue, getState, dispatch }) => {
//       const users = getState()?.authentication?.userAuth;
//       const formData = new FormData();
//       formData.append("Id", user.Id);
//       if (user.isDeleted) {
//         formData.append("isDelete", 1);
//       } else {
//         formData.append("file", user.file);
//       }
//       const config = {
//         headers: {
//           Authorization: `Bearer ${users?.token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       try {
//         const response = await axios.put(
//           `${baseUrl}Auth/UpdateProfilePicture`,
//           formData,
//           config
//         );
//         const responseBack = handleApiRequest(response, dispatch, user);
//         if (responseBack) {
//           toast.success(responseBack);
//         }
//         return responseBack;
//       } catch (error) {
//         rejectWithValue(error.response?.data || "Login failed");
//       }
//     }
//   );

//   export const updateProfile = createAsyncThunk(
//     "user/updateProfile",
//     async (users, { rejectWithValue, getState, dispatch }) => {
//       const id = users.id;
//       try {
//         const config = getAuthConfig(getState);
//         const requestFn = () => axios.put(`${baseUrl}Auth/UpdateProfile?id=${id}`,users, config);
//         const responseBack = await handleApiRequest(requestFn, dispatch, getAuthToken(getState));
//         if (responseBack) {
//           localStorage.setItem("userInfo", JSON.stringify(responseBack));
//           //toast.success(response?.data?.message);
//         }
//         return responseBack;
//       } catch (error) {
//         rejectWithValue(error, dispatch, getState().authentication?.userAuth);
//         rejectWithValue(error);
//       }
//     }
//   );
//   //#endregion

//   //#region Password
// export const updatePassword = createAsyncThunk(
//   "user/updatePassword",
//   async (user, { rejectWithValue, getState, dispatch }) => {
//     //get user token
//     const config = getAuthConfig(getState);

//     try {
//       const requestFn = () => axios.put(`${baseUrl}Auth/UpdatePassword?`,user, config);
//       const responseBack = await handleApiRequest(requestFn, dispatch, getAuthToken(getState));
//       toast.success(responseBack);

//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// export const forgotPassword = createAsyncThunk(
//   "user/ForgotEmail",
//   async (email, { rejectWithValue, getState, dispatch }) => {
//     const config = getAuthConfig(getState);

//     try {
//       const requestFn = () => axios.post(`${baseUrl}Auth/ForgotPassword?`,email, config);
//       const responseBack = await handleApiRequest(requestFn, dispatch, getAuthToken(getState));
//       if (responseBack) {
//         toast.success(responseBack);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "user/ResetPassword",
//   async (data, { rejectWithValue, getState, dispatch }) => {
//     const config = getAuthConfig(getState);
//     try {
//       const requestFn = () => axios.post(`${baseUrl}Auth/ResetPassword?`,data, config);
//       const responseBack = await handleApiRequest(requestFn, dispatch, getAuthToken(getState));
//       if (responseBack != null) {
//         toast.success(responseBack);
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// //#endregion


import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError, processApiResponse } from "../../utils/_handler/_exceptions";
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
      if (!responseBack && responseBack === undefined) {
        return responseBack;
      }
      localStorage.setItem("userInfo", JSON.stringify(responseBack));
      return responseBack;
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

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
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
      const responseBack = processApiResponse(response, dispatch, getState().authentication?.userAuth);
      return responseBack;
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
      if (responseBack) {
        localStorage.setItem("userInfo", JSON.stringify(responseBack));
        toast.success(response?.data?.message);
      }
      return responseBack;
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
      const responseBack = processApiResponse(response, dispatch, getState().authentication?.userAuth);
      if (response?.data?.isSuccess) {
        localStorage.setItem("userInfo", JSON.stringify(responseBack));
        toast.success(response?.data?.message);
      }
      return responseBack;
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
      if (responseBack) {
        toast.success(response?.data?.message);
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
      if (responseBack) {
        toast.success(response?.data?.message);
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
      if (responseBack) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      handleApiError(error, dispatch);
    }
  }
);

//#endregion

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
  reducers: {
    updateReduxUserAuth: (state, payload) => {
      state.userAuth = payload.payload;
    },
    setReduxUserAuthValuesUndefined: (state) => {
      state.userAuth = {}; // Setting userAuth to an empty object
    },
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
      state.userAuth = action?.payload ? action.payload : state.userAuth; //action?.payload;
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
export const { updateReduxUserAuth, setReduxUserAuthValuesUndefined } =
  authSlices.actions;
export default authSlices.reducer;
