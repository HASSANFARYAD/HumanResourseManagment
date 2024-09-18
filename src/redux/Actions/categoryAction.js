import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig, getAuthUserId } from "../../utils/_apiConfig";

export const addUpdateCategory = createAsyncThunk(
  "category/addUpdateCategory",
  async (entity, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      entity.userId = getAuthUserId(getState);
      let response;

      // Check if user ID exists, indicating whether it's an update or a new record
      if (!entity.id) {
        response = await axios.post(
          `${baseUrl}Category/NewRecord`,
          entity,
          config
        );
      } else {
        response = await axios.put(
          `${baseUrl}Category/UpdateRecord`,
          entity,
          config
        );
      }
      const responseBack = processApiResponse(
        response,
        dispatch,
        getState().authentication?.userAuth
      );
      toast.success(responseBack?.message);
      return responseBack?.data;
    } catch (error) {
      handleApiError(error, dispatch, getState().authentication?.userAuth);
      rejectWithValue(error);
    }
  }
);

export const getCategoriesRecords = createAsyncThunk(
  "category/getCategoriesRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.post(
        `${baseUrl}Category/GetAllRecords?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
        null,
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
      rejectWithValue(error);
    }
  }
);
