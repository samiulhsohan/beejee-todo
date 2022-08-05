import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { OrderBy, TodoSortBy } from '../../types'

type TodoState = {
  skip: number
  take: number
  orderBy: OrderBy
  sortBy: TodoSortBy
  currentPage: number
}

const initialState: TodoState = {
  skip: 0,
  take: 3,
  orderBy: 'desc',
  sortBy: 'createdAt',
  currentPage: 1,
}

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.orderBy = action.payload
    },
    setSortBy: (state, action: PayloadAction<TodoSortBy>) => {
      state.sortBy = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setSkip, setOrderBy, setSortBy, setCurrentPage } = slice.actions
export default slice.reducer

export const selectSkip = (state: RootState) => state.todo.skip
export const selectTake = (state: RootState) => state.todo.take
export const selectOrderBy = (state: RootState) => state.todo.orderBy
export const selectSortBy = (state: RootState) => state.todo.sortBy
export const selectCurrentPage = (state: RootState) => state.todo.currentPage
