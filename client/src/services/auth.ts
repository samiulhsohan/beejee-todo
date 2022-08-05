import { APIResponse, LoginResponse, User } from '../types'
import { api } from './api'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string } | null,
      { username: string; password: string }
    >({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: LoginResponse) => response.result,
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useLoginMutation } = authApi
