import { Todo } from '../types'
import { api } from './api'

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    createTodo: builder.mutation<
      Todo,
      { username: string; email: string; task: string }
    >({
      query: body => ({
        url: '/todo',
        method: 'POST',
        body,
      }),
      invalidatesTags: [],
    }),
  }),
})

export const { useCreateTodoMutation } = todoApi
