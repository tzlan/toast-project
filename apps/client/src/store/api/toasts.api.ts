import { api } from './api';
import { CreateToastDto, Toast} from '../../types/toast'


export const toastsApi = api.injectEndpoints({
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
  overrideExisting: false,
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

