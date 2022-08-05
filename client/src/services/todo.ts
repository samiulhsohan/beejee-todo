import {
  APIResponse,
  GetTodoResponse,
  SortOrder,
  Todo,
  TodoSortBy,
} from '../types'
import { api } from './api'

export const todoApi = api.injectEndpoints({
  endpoints: builder => ({
    getTodos: builder.query<
      { count: number; todo: Todo[] },
      { skip: number; take: number; sortBy: TodoSortBy; sortOrder: SortOrder }
    >({
      query: ({ skip, take, sortBy, sortOrder }) => ({
        url: '/todo',
        method: 'GET',
        params: {
          skip,
          take,
          sortBy,
          sortOrder,
        },
      }),
      transformResponse: (response: GetTodoResponse) => response.result,
      providesTags: ['Todo'],
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
      invalidatesTags: ['Todo'],
    }),

    updateTodo: builder.mutation<
      Todo,
      { id: number; completed?: boolean; task?: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/todo/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: APIResponse<Todo>) => response.result,
      invalidatesTags: ['Todo'],
    }),
  }),
})

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} = todoApi
