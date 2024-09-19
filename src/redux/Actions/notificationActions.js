import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../utils/_handler/_exceptions";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/_envConfig";
import {
  getAuthConfig,
  getAuthToken,
  getAuthUserId,
} from "../../utils/_apiConfig";
import { handleApiRequest } from "../../utils/_handler/_handleApiRequest";

export const getNotifications = createAsyncThunk(
  "user/getNotifications",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const config = getAuthConfig(getState);
    const userId = getAuthUserId(getState);
    try {
      const url = `${baseUrl}Notification/GetNotification?id=${userId}`;
      const requestFn = () => axios.get(url, config);

      // Call handleApiRequest to fetch notifications
      const responseBack = await handleApiRequest(
        requestFn,
        dispatch,
        getAuthToken(getState)
      );

      // Return the response data (list of notifications and unread count)
      return responseBack.data;
    } catch (error) {
      // Handle API error and return rejected value
      handleApiError(
        error?.response?.data,
        dispatch,
        getState().authentication?.userAuth
      );
      return rejectWithValue(error);
    }
  }
);

export const markReadNotification = createAsyncThunk(
  "user/markReadNotification",
  async (record, { rejectWithValue, getState, dispatch }) => {
    const config = getAuthConfig(getState);
    const userId = getAuthUserId(getState);
    if (record.type === "user") {
      record.userId = userId;
    }

    try {
      const url = `${baseUrl}Notification/MarkAsRead?userId=${record.userId}&notificationId=${record.id}`;
      const requestFn = () => axios.put(url, config, record);
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
