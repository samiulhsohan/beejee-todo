import { Box, BoxProps, Stack, StackDivider } from '@chakra-ui/react'
import { useGetTodosQuery } from '../../services'
import { useAppSelector } from '../../store'
import TodoItem from './TodoItem'
import {
  selectSortOrder,
  selectSkip,
  selectSortBy,
  selectTake,
} from './todoSlice'

interface TodoListsProps extends BoxProps {}

export default function TodoLists({ ...props }: TodoListsProps) {
  const skip = useAppSelector(selectSkip)
  const take = useAppSelector(selectTake)
  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)

  const { data } = useGetTodosQuery({ skip, take, sortBy, sortOrder })

  return (
    <Box {...props}>
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
    </Box>
  )
}
