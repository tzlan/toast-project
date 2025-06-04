import { api } from './api';
import {
  CreateUserDto,
  User,
  LoginCredentials,
  LoginResponse,
} from '../../types/users';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),

    createUser: builder.mutation<User, CreateUserDto>({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),

    adminEditUser: builder.mutation<
      User,
      { id: string; userData: Partial<User> }
    >({
      query: ({ id, userData }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useDeleteUserMutation,
  useAdminEditUserMutation,
} = usersApi;