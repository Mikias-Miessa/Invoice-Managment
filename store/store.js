import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    auth: authReducer,
  },
});
