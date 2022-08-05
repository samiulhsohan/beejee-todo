import { GetTodoResponse, OrderBy, Todo, TodoSortBy } from '../types'
import { api } from './api'

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: builder.query<
      { count: number; todo: Todo[] },
      { skip: number; take: number; sortBy: TodoSortBy; orderBy: OrderBy }
    >({
      query: ({ skip, take, sortBy, orderBy }) => ({
        url: '/todo',
        method: 'GET',
        params: {
          skip,
          take,
          sortBy,
          orderBy,
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
