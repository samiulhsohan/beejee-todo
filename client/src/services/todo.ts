import { GetTodoResponse, Todo } from '../types'
import { api } from './api'

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: builder.query<
      { count: number; todo: Todo[] },
      { skip: number; take: number }
    >({
      query: ({ skip, take }) => ({
        url: '/todo',
        method: 'GET',
        params: {
          skip,
          take,
        },
      }),
      transformResponse: (response: GetTodoResponse) =>
        response.result ?? { count: 0, todo: [] },
      providesTags: [{ type: 'Todo' as const, id: 'LIST' }],
    }),

    createTodo: builder.mutation<
      Todo,
      { username: string; email: string; task: string }
    >({
      query: body => ({
        url: '/todo',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todo' as const, id: 'LIST' }],
    }),
  }),
})

export const { useCreateTodoMutation, useGetTodosQuery } = todoApi
