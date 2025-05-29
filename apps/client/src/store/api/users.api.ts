
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface User {
  id: string;
  email: string;

}


export interface CreateUserDto {
  email: string;
}


export const usersApi = createApi({ 
  reducerPath: 'usersApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/', 
  }),
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
});


export const { useGetUsersQuery, useCreateUserMutation } = usersApi;