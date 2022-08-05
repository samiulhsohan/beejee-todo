import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Stack,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IoCheckmark, IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { TextInput } from '../../components'
import { api, useUpdateTodoMutation } from '../../services'
import { useAppDispatch } from '../../store'
import { ErrorResponse, Todo, User } from '../../types'

interface TodoItemProps {
  todo: Todo
  user?: User | null
}

export default function TodoItem({ todo, user }: TodoItemProps) {
  const toast = useToast()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [updateTodo, { error, isLoading }] = useUpdateTodoMutation()

  const [task, setTask] = useState(todo.task)

  const showTaskActionButton = task !== todo.task
  const disableTaskSaveButton = task.length === 0

  const handleTodoComplete = (completed: boolean) => {
    updateTodo({ id: todo.id, completed })
  }

  const handleTaskUpdate = () => {
    updateTodo({ id: todo.id, task })
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
        {user ? (
          <HStack>
            <TextInput
              placeholder="Task"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
            {showTaskActionButton && (
              <>
                <IconButton
                  icon={<IoCheckmark />}
                  aria-label="Edit"
                  disabled={disableTaskSaveButton}
                  onClick={handleTaskUpdate}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                />
                <IconButton
                  icon={<IoClose />}
                  aria-label="Edit"
                  disabled={disableTaskSaveButton}
                  onClick={() => setTask(todo.task)}
                />
              </>
            )}
          </HStack>
        ) : (
          <Text>{todo.task}</Text>
        )}
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
