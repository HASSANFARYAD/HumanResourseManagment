import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig, getAuthToken } from "../../utils/_apiConfig";
import { handleApiRequest } from "../../utils/_handler/_handleApiRequest";

export const deleteRecord = createAsyncThunk(
  "user/deleteRecord",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const config = getAuthConfig(getState);

    try {
      const url = baseUrl + endpoint;
      const requestFn = () => axios.delete(url, config);
      const responseBack = await handleApiRequest(
        requestFn,
        dispatch,
        getAuthToken(getState)
      );

      toast.success(responseBack?.message);
    } catch (error) {
      handleApiError(
        error?.response?.data,
        dispatch,
        getState().authentication?.userAuth
      );
      rejectWithValue(error);
    }
  }
);

export const getDropdowns = createAsyncThunk(
  "user/getDropdowns",
  async (endpoint, { rejectWithValue, getState, dispatch }) => {
    const config = getAuthConfig(getState);

    try {
      const url = baseUrl + endpoint;
      const requestFn = () => axios.get(url, config);
      const responseBack = await handleApiRequest(
        requestFn,
        dispatch,
        getAuthToken(getState)
      );

      return responseBack?.data;
    } catch (error) {
      handleApiError(
        error?.response?.data,
        dispatch,
        getState().authentication?.userAuth
      );
      rejectWithValue(error);
    }
  }
);
