import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const batchApi = createApi({
  reducerPath: "batchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // Update with your backend URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: () => "/batches",
    }),
    createBatch: builder.mutation({
        query: (batchData) => ({
          url: "/batches",
          method: "POST",
          body: batchData,
          headers: { "Content-Type": "application/json" },
        }),
      }),
    getBatchById: builder.query({
      query: (batchId) => `/batches/${batchId}`,
    }),
    requestEnrollment: builder.mutation({
      query: (batchId) => ({
        url: `/batches/${batchId}/request-enrollment`,
        method: "POST",
      }),
    }),
    handleEnrollment: builder.mutation({
      query: ({ batchId, studentId, action }) => ({
        url: "/batches/approve-or-reject",
        method: "PUT",
        body: { batchId, studentId, action },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetBatchesQuery,
  useGetBatchByIdQuery,
  useRequestEnrollmentMutation,
  useHandleEnrollmentMutation,
  useCreateBatchMutation
} = batchApi;
