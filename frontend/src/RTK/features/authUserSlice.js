import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../store/backendApi";

// First, create the thunk ( Login User)
export const loginUser = createAsyncThunk(
  "authUser/loginUser",
  async ({ password, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api}/auth/login`,
        { password, email },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed Login!");
    }
  }
);
// First, create the thunk ( Register User)
export const registerUser = createAsyncThunk(
  "authUser/registerUser",
  async ({ password, email, confirmPassword, name }, { rejectWithValue }) => {
    // console.log("{ password, email, confirmPassword, name }", { password, email, confirmPassword, name }) // Getting data
    // console.log("`${api}/auth/signup`", `${api}/auth/signup`) // correct
    try {
      const response = await axios.post(
        `${api}/auth/signup`,
        { password, email, confirmPassword, name },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed - Register!");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "authUser/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed logout!");
    }
  }
);
// update-Detail User
export const updateDetailUser = createAsyncThunk(
  "authUser/updateDetailUser",
  async ({ name, email, address, mobileNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${api}/auth/update-details`,
        { name, email, address, mobileNumber },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed update-details!");
    }
  }
);
// update-password User
export const updatePasswordUser = createAsyncThunk(
  "authUser/updatePasswordUser",
  async (
    { oldPassword, newPassword, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${api}/auth/update-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed update-password!");
    }
  }
);
// Get User
export const getUser = createAsyncThunk(
  "authUser/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/auth`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to get User!");
    }
  }
);
// Get User Status
export const getUserStatus = createAsyncThunk(
  "authUser/getUserStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/auth/status`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "failed to get User Status!"
      );
    }
  }
);
const initialState = {
  authStatus: { isAuthenticated: false },
  data: null,
  loading: false,
  error: null,
  message: null,
};

// getUserStatus | getUser | updatePasswordUser | updateDetailUser | loginUser | logoutUser | registerUser
const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Handle Pending State
    const handlePending = (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    };
    // Handle rejected state
    const handleRejected = (state, action) => {
      console.log("action.paylaod (handleRejected) :", action.payload);
      state.loading = false;
      state.message = null;
      state.error = action.payload?.data;
    };
    // Login builder
    builder
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(loginUser.rejected, handleRejected);

    // get User
    builder
      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, handleRejected);

    // Logout builder
    builder
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.authStatus.isAuthenticated = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, handleRejected);

    // update-Detail builder
    builder
      .addCase(updateDetailUser.pending, handlePending)
      .addCase(updateDetailUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        state.data = action.payload?.user;
      })
      .addCase(updateDetailUser.rejected, handleRejected);

    // update-password Builder
    builder
      .addCase(updatePasswordUser.pending, handlePending)
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(updatePasswordUser.rejected, handleRejected);

    // get User Status
    builder
      .addCase(getUserStatus.pending, handlePending)
      .addCase(getUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.authStatus.isAuthenticated = true;
      })
      .addCase(getUserStatus.rejected, handleRejected);

    // Register User
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("action.paylaod (insideFulfilled) ", action.payload);
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(registerUser.rejected, handleRejected);
  },
});
export const { resetState } = authUserSlice.actions;
export default authUserSlice.reducer;
