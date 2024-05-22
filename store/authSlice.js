import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isSuccess: false,
  loading: true,
  user: null,
  dashboard: null,
  error: null,
  status: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        'http://localhost:3000/users/login',
        body,
        config
      );

      if (res.data) {
        localStorage.setItem('token', res.data.token);
      }
      return res.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.errors) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    reset: (state) => {
      state.isSuccess = false;
      state.error = null;
      state.loading = true;
      state.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'error';
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;
