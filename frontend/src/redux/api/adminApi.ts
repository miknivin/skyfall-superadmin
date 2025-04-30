import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminRequest } from '../../types/admin-request'; // Import from types folder

const BASE_URL = '/api/v1';

// Define interfaces for response types
interface CreateAdminRequestResponse {
  success: boolean;
  data: AdminRequest;
}

interface GetAllAdminRequestsResponse {
  success: boolean;
  count: number;
  data: AdminRequest[];
}

interface GetAdminRequestByIdResponse {
  success: boolean;
  data: AdminRequest;
}

interface AcceptAdminRequestInput {
  requestId: string;
  reviewedBy?: string;
}

interface AcceptAdminRequestResponse {
  message: string;
}

// Create the RTK Query API slice
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['AdminRequest'],
  endpoints: (builder) => ({
    createAdminRequest: builder.mutation<
      CreateAdminRequestResponse,
      Partial<AdminRequest>>({
      query: (payload) => ({
        url: '/admin/request',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['AdminRequest'],
    }),

    getAllAdminRequests: builder.query<GetAllAdminRequestsResponse, void>({
      query: () => ({
        url: '/admin/request',
        method: 'GET',
      }),
      providesTags: ['AdminRequest'],
    }),

    getAdminRequestById: builder.query<GetAdminRequestByIdResponse, string>({
      query: (id) => ({
        url: `/admin/request/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'AdminRequest', id }],
    }),

    acceptAdminRequest: builder.mutation<AcceptAdminRequestResponse, AcceptAdminRequestInput>({
      query: ({ requestId }) => ({
        url: '/admin/request/accept',
        method: 'POST',
        body: { requestId },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateAdminRequestMutation,
  useGetAllAdminRequestsQuery,
  useGetAdminRequestByIdQuery,
  useAcceptAdminRequestMutation
} = adminApi;