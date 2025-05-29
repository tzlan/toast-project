import { api } from './api';
import {CreateUserDto , User} from '../../types/users'

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
  }),
  overrideExisting: false,
});

export const { useGetUsersQuery, useCreateUserMutation } = usersApi;