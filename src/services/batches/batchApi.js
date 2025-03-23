import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const batchApi = createApi({
  reducerPath: "batchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://teachx-backend-bap8.vercel.app/api", 
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
    updateBatch: builder.mutation({
      query: ({ batchId, updatedBatchData }) => ({
        url: `/batches/${batchId}`,
        method: "PUT",
        body: updatedBatchData,
      }),
    }),
    deleteBatch: builder.mutation({
      query: (batchId) => ({
        url: `/batches/${batchId}`,
        method: "DELETE",
      }),
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
    joinBatchByCode: builder.mutation({
      query: (batchCode) => ({
        url: "/batches/join-by-code",
        method: "POST",
        body: { batchCode },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetBatchesQuery,
  useDeleteBatchMutation,
  useGetBatchByIdQuery,
  useRequestEnrollmentMutation,
  useHandleEnrollmentMutation,
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useJoinBatchByCodeMutation, 
} = batchApi;