import { Stack, StackDivider, VStack } from '@chakra-ui/react'
import { useGetTodosQuery } from '../../services'
import TodoItem from './TodoItem'

export default function TodoLists() {
  const { data } = useGetTodosQuery({ skip: 0, take: 3 })

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
