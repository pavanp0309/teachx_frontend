import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://teachx-backend-bap8.vercel.app/api/auth", // Replace with actual API (authapi,batchapi ,attandapi)
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({email}) => ({
        url: "/send-otp",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, otp }) => {
        console.log("Sending email in request:", email); // ✅ Debug email
        return {
          url: "/verify-otp",
          method: "POST",
          headers: { "Content-Type": "application/json" }, // ✅ Ensure JSON
          body: JSON.stringify({ email, otp }),
        };
      },
    }),
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/update-profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profile"], // Refetch profile after update
    }),
  }),
});

export const { 
  useSendOtpMutation, 
  useVerifyOtpMutation, 
  useGetProfileQuery, 
  useUpdateProfileMutation 
} = authApi;
