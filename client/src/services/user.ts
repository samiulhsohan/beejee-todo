import { APIResponse, User } from '../types'
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User | null, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      transformResponse: (response: APIResponse<User>) => response.result,
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery } = userApi
