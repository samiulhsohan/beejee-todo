import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { SortOrder, TodoSortBy } from '../../types'

type TodoState = {
  skip: number
  take: number
  sortOrder: SortOrder
  sortBy: TodoSortBy
  currentPage: number
}

const initialState: TodoState = {
  skip: 0,
  take: 3,
  sortOrder: 'desc',
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
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload
    },
    setSortBy: (state, action: PayloadAction<TodoSortBy>) => {
      state.sortBy = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setSkip, setSortOrder, setSortBy, setCurrentPage } =
  slice.actions
export default slice.reducer

export const selectSkip = (state: RootState) => state.todo.skip
export const selectTake = (state: RootState) => state.todo.take
export const selectSortOrder = (state: RootState) => state.todo.sortOrder
export const selectSortBy = (state: RootState) => state.todo.sortBy
export const selectCurrentPage = (state: RootState) => state.todo.currentPage
