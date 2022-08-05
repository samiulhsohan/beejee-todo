import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { getAccessToken } from '../utils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: headers => {
    const token = getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Todo', 'User'],
  endpoints: () => ({}),
})
