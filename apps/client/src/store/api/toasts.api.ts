import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Toast {
  id: string;
  userId: string;
  description: string;
  date: string; 
  toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';

}

export interface CreateToastDto {
  userId: string;
  description: string;
  date: string;
  toastStatus: 'CANCELED' | 'DELAYED' | 'ON TIME';
}


export const toastsApi = createApi({ 
  reducerPath: 'toastsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', 
  }),
  endpoints: (builder) => ({
    
    getToasts: builder.query<Toast[], void>({
      query: () => 'toasts',
    }),

    createToast: builder.mutation<Toast, CreateToastDto>({
      query: (toastData) => ({
        url: 'toasts',
        method: 'POST',
        body: toastData,
      }),
    }),

    deleteToast: builder.mutation<void, string>({
      query: (id) => ({
        url: `toasts/${id}`,
        method: 'DELETE',
      }),
    }),
 
    adminEditToast: builder.mutation<Toast, { id: string; toastData: Partial<Toast> }>({
      query: ({ id, toastData }) => ({
        url: `toasts/${id}`,
        method: 'PUT',
        body: toastData,
      }),
    }),
   
    getPersonalRecord: builder.query<number, string>({
      query: (userId) => `toasts/personal-record/${userId}`,
    }),
    
    getAllTimeRecord: builder.query<{ count: number }, void>({
      query: () => 'toasts/all-time-record',
    }),
  
    getCurrentRecord: builder.query<{ toastCountInPeriod: number }, void>({
      query: () => 'toasts/current-record',
    }),
  }),
});


export const {
  useGetToastsQuery,
  useCreateToastMutation,
  useDeleteToastMutation,
  useAdminEditToastMutation,
  useGetPersonalRecordQuery,
  useGetAllTimeRecordQuery,
  useGetCurrentRecordQuery,
} = toastsApi;