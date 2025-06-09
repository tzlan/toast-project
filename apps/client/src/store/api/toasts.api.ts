import { api } from './api';

import { CreateToastDto, Toast } from '../../types/toast';

// Définissez le type pour les paramètres que getPastToasts peut accepter

// La propriété 'userId' est optionnelle pour les admins (quand on ne filtre pas)

type GetPastToastsQueryArgs = {
  userId?: string;
};

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

    // MODIFICATION ICI : getPastToasts pour accepter un argument

    getPastToasts: builder.query<Toast[], GetPastToastsQueryArgs | void>({
      query: (args) => {
        // Si 'args' existe et contient un 'userId' non vide

        if (args && 'userId' in args && args.userId) {
          // L'URL inclura le userId comme paramètre de requête

          return `toasts/past?userId=${args.userId}`;
        }

        // Sinon (pas d'arguments, ou userId est vide/absent), requête sans filtre

        return 'toasts/past';
      },
    }),

    getFutureToasts: builder.query<Toast[], void>({
      query: () => 'toasts/future',
    }),

    deleteToast: builder.mutation<void, string>({
      query: (id) => ({
        url: `toasts/${id}`,

        method: 'DELETE',
      }),
    }),

    adminEditToast: builder.mutation<
      Toast,
      { id: string; toastData: Partial<Toast> }
    >({
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

  useGetPastToastsQuery,

  useGetFutureToastsQuery,
} = toastsApi;
