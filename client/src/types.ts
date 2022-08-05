export type APIResponse<T> = {
  success: boolean
  errorMessage: string | null
  result: T
}

export type ErrorResponse = {
  success: false
  errorMessage: string
  result: null
}

export type Todo = {
  id: number
  username: string
  email: string
  task: string
  completed: boolean
  edited: boolean
}

export type GetTodoResponse = APIResponse<{ todo: Todo[]; count: number }>

export type SortOrder = 'desc' | 'asc'

export type TodoSortBy = 'username' | 'email' | 'completed' | 'createdAt'

export type User = {
  id: number
  username: string
}
