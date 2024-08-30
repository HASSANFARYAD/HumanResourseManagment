// import { createSlice } from '@reduxjs/toolkit';


// const authSlices = createSlice({
//     name: "auth",
//     initialState: {
//       userAuth: JSON.parse(localStorage.getItem("userInfo")) || null,
//       loading: false,
//       appErr: null,
//       appStatus: null,
//       appStatusCode: null,
//       serverErr: null,
//     },
//     reducers: {
//         clearAuthState: (state) => {
//           state.userAuth = null;
//           localStorage.removeItem("userInfo"); // Clear userInfo on logout
//         },
//       },
//     extraReducers: (builder) => {
//       builder
//         .addMatcher(
//           (action) => action.type.endsWith("/pending"),
//           (state) => {
//             state.loading = true;
//             state.appErr = state.serverErr = undefined;
//           }
//         )
//         .addMatcher(
//           (action) => action.type.endsWith("/fulfilled"),
//           (state, { payload }) => {
//             state.userAuth = payload;
//             state.loading = false;
//           }
//         )
//         .addMatcher(
//             (action) => action.type.endsWith("/rejected"),
//             (state, { payload }) => {
//               state.loading = false;
//               state.appErr = payload?.message || "Something went wrong";
//             }
//         );
//     },
//   });

//   export default authSlices.reducers;