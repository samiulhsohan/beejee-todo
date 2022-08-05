import {
  Box,
  Checkbox,
  HStack,
  Stack,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, useGetUserQuery, useUpdateTodoMutation } from '../../services'
import { useAppDispatch } from '../../store'
import { ErrorResponse, Todo } from '../../types'

interface TodoItemProps {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const toast = useToast()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: user } = useGetUserQuery()
  const [updateTodo, { error }] = useUpdateTodoMutation()

  const handleTodoComplete = (completed: boolean) => {
    updateTodo({ id: todo.id, completed })
  }

  useEffect(() => {
    if (error && 'status' in error) {
      dispatch(api.util.resetApiState())
      toast({
        title:
          (error.data as ErrorResponse).errorMessage ?? 'Something went wrong',
        status: 'error',
      })
      navigate('/login')
    }
  }, [error])

  return (
    <HStack py="2" spacing="4">
      <Checkbox
        defaultChecked={todo.completed}
        size="lg"
        disabled={!user}
        onChange={e => handleTodoComplete(e.target.checked)}
      />
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
