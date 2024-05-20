import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  Invoices: [],
  loading: false,
  newInvoiceAdded: null,
  getInvoiceById: '',
  // selectedBlog: null,
  // blogEdited: null,
};

export const addInvoice = createAsyncThunk(
  'invoice/add',
  async (invoiceData, thunkAPI) => {
    try {
      // const res = await axios.post('/api/blogs', blogData);
      // return res.data;
      console.log(invoiceData);
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
      const res = await axios.get('/api/blogs');
      return res.data.blogs;
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
      const response = await axios.get(`/api/blogs/${blogId}`);
      // console.log(response.data.blog);
      return response.data.blog;
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
      const response = await axios.put(`/api/blogs/${blogId}`, blogData);
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
        state.blogs = action.payload;
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
        state.loading = true;
        // state.invoiceEdited = 'pending';
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.Invoices = state.Invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        );
        // state.invoiceEdited = 'success';
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        // state.invoiceEdited = 'failed';
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
