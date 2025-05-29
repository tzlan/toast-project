import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = api;
