import { Stack, StackDivider } from '@chakra-ui/react'
import { useGetTodosQuery } from '../../services'
import { useAppSelector } from '../../store'
import TodoItem from './TodoItem'
import {
  selectOrderBy,
  selectSkip,
  selectSortBy,
  selectTake,
} from './todoSlice'

export default function TodoLists() {
  const skip = useAppSelector(selectSkip)
  const take = useAppSelector(selectTake)
  const orderBy = useAppSelector(selectOrderBy)
  const sortBy = useAppSelector(selectSortBy)

  const { data } = useGetTodosQuery({ skip, take, sortBy, orderBy })

  return (
    <Stack
      divider={<StackDivider />}
      border="1px"
      borderColor="gray.200"
      px="4"
      py="2"
      borderRadius="md"
    >
      {data?.todo.map(todo => (
        <TodoItem key={todo.id} {...{ todo }} />
      ))}
    </Stack>
  )
}
