import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../services/authSlice";
import { authApi } from "../services/authApi";
import { batchApi } from "../services/batches/batchApi";

const store = configureStore({
  reducer: {
    auth: authReducer, // RTK: Logout, storing data in localStorage, RBAC
    [authApi.reducerPath]: authApi.reducer, // RTK Query: Send OTP, verify OTP, resend, update profile
    [batchApi.reducerPath]: batchApi.reducer, // RTK Query: Batch-related API calls
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, batchApi.middleware),
});

export default store;
