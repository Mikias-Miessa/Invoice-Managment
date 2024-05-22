import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated:
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  isSuccess: false,
  loading: false,
  user: null,
  dashboard: null,
  error: null,
  status: '',
  registrationStatus: '',
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
      console.log(res.data);
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
export const Register = createAsyncThunk(
  'auth/register',
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
        'http://localhost:3000/users/register',
        body,
        config
      );

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
      state.loading = false;
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
        // state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.status = 'error';
      })
      .addCase(Register.pending, (state, action) => {
        state.loading = true;
        state.registrationStatus = 'pending';
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.registrationStatus = 'success';
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.registrationStatus = 'error';
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;
