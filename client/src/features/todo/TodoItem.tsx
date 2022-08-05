import { Box, Checkbox, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { useGetUserQuery } from '../../services'
import { Todo } from '../../types'
import { getAccessToken } from '../../utils'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { data: user } = useGetUserQuery(undefined, { skip: !getAccessToken() })

  return (
    <HStack py="2" spacing="4">
      <Checkbox defaultChecked={todo.completed} size="lg" disabled={!user} />
      <Stack spacing="1" align="start">
        {todo.edited && (
          <Tag size="sm" width="auto" colorScheme="yellow">
            Edited by Administrator
          </Tag>
        )}
        <Text>{todo.task}</Text>
        <HStack divider={<Box w="1" h="1" rounded="full" bg="gray.100" />}>
          <Text fontSize="sm" color="gray.600">
            {todo.username}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {todo.email}
          </Text>
        </HStack>
      </Stack>
    </HStack>
  )
}
