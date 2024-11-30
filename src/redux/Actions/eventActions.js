import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleApiError,
  processApiResponse,
} from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import { getAuthConfig, getAuthUserId } from "../../utils/_apiConfig";

export const processEvent = createAsyncThunk(
  "eventBooking/processEvent",
  async (entity, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      entity.actionBy = getAuthUserId(getState);
      let response;

      if (!entity.id) {
        response = await axios.post(
          `${baseUrl}Event/NewRecord`,
          entity,
          config
        );
      } else {
        response = await axios.put(
          `${baseUrl}Event/UpdateRecord`,
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

export const getEvents = createAsyncThunk(
  "eventBooking/getEvents",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = getAuthConfig(getState);
      const response = await axios.get(
        `${baseUrl}Event/GetEventsForCalender?userId=${userId}`,
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
