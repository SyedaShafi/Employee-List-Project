import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './employeeSlice';

export const store = configureStore({
  reducer: {
    employeeSlice: employeeSlice,
  },
});
