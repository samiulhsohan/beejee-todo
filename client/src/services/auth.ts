import { APIResponse, User } from '../types'
import { api } from './api'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<User, { username: string; password: string }>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: APIResponse<User>) => response.result,
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
