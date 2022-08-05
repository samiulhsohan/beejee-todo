import { Box, Container, Heading } from '@chakra-ui/react'
import { useGetTodosQuery } from '../../services'
import CreateTodo from './CreateTodo'
import { Pagination } from '../../components/'
import TodoList from './TodoList'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  selectSkip,
  selectTake,
  selectSortOrder,
  selectSortBy,
  setSkip,
  selectCurrentPage,
  setCurrentPage,
} from './todoSlice'
import Sort from './Sort'

export default function Todo() {
  const dispatch = useAppDispatch()

  const skip = useAppSelector(selectSkip)
  const take = useAppSelector(selectTake)
  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)
  const currentPage = useAppSelector(selectCurrentPage)

  const { data } = useGetTodosQuery({ skip, take, sortBy, sortOrder })

  const handlePageChange = (page: number) => {
    const _skip = page === 1 ? 0 : (page - 1) * take
    dispatch(setSkip(_skip))
    dispatch(setCurrentPage(page))
  }

  return (
    <Container maxW="lg">
      <Heading textAlign="center" my="12">
        BeeJee Todo
      </Heading>
      <CreateTodo />
      <Sort mt="10" />
      <TodoList mt="5" />
      <Pagination
        mt="4"
        totalItems={data?.count ?? 0}
        itemsPerPage={take}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}
