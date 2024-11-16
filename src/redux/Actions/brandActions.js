import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig, getAuthUserId } from "../../utils/_apiConfig";

export const addUpdateBrand = createAsyncThunk(
  "brand/addUpdateBrand",
  async (entity, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      entity.userId = getAuthUserId(getState);
      let response;

      if (!entity.id) {
        response = await axios.post(
          `${baseUrl}Brand/NewRecord`,
          entity,
          config
        );
      } else {
        response = await axios.put(
          `${baseUrl}Brand/UpdateRecord`,
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

export const getRecords = createAsyncThunk(
  "brand/getBrandRecords",
  async (
    { pageNumber, pageLength, sortColumn, sortDirection, searchParam },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.get(
        `${baseUrl}Brand/GetAllRecords?start=${pageNumber}&length=${pageLength}&sortColumnName=${sortColumn}
        &sortDirection=${sortDirection}&searchValue=${searchParam}`,
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
