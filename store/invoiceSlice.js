import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  Invoices: [],
  loading: false,
  newInvoiceAdded: null,
  getInvoiceById: '',
  // selectedBlog: null,
  invoiceEdited: null,
};
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MzA5NjMwLCJleHAiOjE3MTY1Njg4MzB9.ouDQTxezcnLL8Qh3UF_kF6r2_qxCYGtz9TXod3Tcw-U';
export const addInvoice = createAsyncThunk(
  'invoice/add',
  async (invoiceData, thunkAPI) => {
    try {
      // Get the auth token (assuming it's stored in local storage)
      // const token = localStorage.getItem('authToken');
      console.log(invoiceData);
      // const token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2MzA5NjMwLCJleHAiOjE3MTY1Njg4MzB9.ouDQTxezcnLL8Qh3UF_kF6r2_qxCYGtz9TXod3Tcw-U';

      const res = await axios.post(
        'http://localhost:3000/invoices/',
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.errors || error.message || error.toString()
      );
    }
  }
);

export const getAllInvoice = createAsyncThunk(
  'invoice/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:3000/invoices/');
      return res.data.Invoice;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.errors || error.message || error.toString()
      );
    }
  }
);

export const getInvoiceById = createAsyncThunk(
  'invoice/getInvoiceById',
  async (invoiceId, thunkAPI) => {
    try {
      console.log(invoiceId);
      const response = await axios.get(
        `http://localhost:3000/invoices/${invoiceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.blog);
      return response.data.Invoice;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.errors || error.message || error.toString()
      );
    }
  }
);

export const updateInvoice = createAsyncThunk(
  'invoice/updateInvoice',
  async ({ invoiceId, invoiceData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/invoices/${invoiceId}`,
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.errors || error.message || error.toString()
      );
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  'invoices/deleteInvoice',
  async (invoiceId, thunkAPI) => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      return blogId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.errors || error.message || error.toString()
      );
    }
  }
);

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    reset: (state) => {
      state.newInvoiceAdded = null;
      state.invoiceEdited = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInvoice.pending, (state) => {
        state.loading = true;
        state.newInvoiceAdded = 'pending';
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.Invoices.push(action.payload);
        state.newInvoiceAdded = 'success';
      })
      .addCase(addInvoice.rejected, (state) => {
        state.loading = false;
        state.newInvoiceAdded = 'failed';
      })
      .addCase(getAllInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.Invoices = action.payload;
      })
      .addCase(getAllInvoice.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.getInvoiceById = 'loading';
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.getInvoiceById = 'success';
        state.Invoices = [action.payload];
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.getInvoiceById = 'failed';
      })
      .addCase(updateInvoice.pending, (state) => {
        // state.loading = true;
        state.invoiceEdited = 'pending';
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        // state.loading = false;
        state.Invoices = state.Invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        );
        state.invoiceEdited = 'success';
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        // state.loading = false;
        state.invoiceEdited = 'failed';
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.Invoices = state.Invoices.filter(
          (invoice) => invoice.id !== action.payload
        );
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { reset } = invoiceSlice.actions;

export default invoiceSlice.reducer;

// Selectors
export const selectAllInvoice = (state) => state.invoice.Invoices;
export const selectLoading = (state) => state.invoice.loading;
export const selectInvoiceById = (state) => state.invoice.Invoices[0];
export const selectNewInvoiceAdded = (state) => state.invoice.newInvoiceAdded;
export const selectInvoiceEdited = (state) => state.invoice.invoiceEdited;
