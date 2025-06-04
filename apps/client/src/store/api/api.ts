import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  endpoints: () => ({}),
});
