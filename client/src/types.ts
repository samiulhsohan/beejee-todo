export type APIResponse<T> = {
  success: boolean
  errorMessage: string | null
  result: T | null
}

export type Todo = {
  id: number
  username: string
  email: string
  task: string
  completed: boolean
  edited: boolean
  createdAt: Date
  updatedAt: Date
}

export type GetTodoResponse = APIResponse<{ todo: Todo[]; count: number }>

export type SortOrder = 'desc' | 'asc'

export type TodoSortBy = 'username' | 'email' | 'completed' | 'createdAt'
