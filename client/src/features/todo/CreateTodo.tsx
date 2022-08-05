import {
  Box,
  BoxProps,
  Button,
  HStack,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput } from '../../components'
import { useCreateTodoMutation } from '../../services'

interface CreateTodoProps extends BoxProps {}

type FormInput = {
  username: string
  email: string
  task: string
}

export default function CreateTodo({ ...props }: CreateTodoProps) {
  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInput>()

  const [createTodo, { data }] = useCreateTodoMutation()

  const onSubmit: SubmitHandler<FormInput> = async data => {
    await createTodo(data)
    reset()
  }

  useEffect(() => {
    if (data) {
      toast({
        title: 'Todo created',
        description: 'Todo created successfully',
        status: 'success',
        isClosable: true,
      })
    }
  }, [data])

  return (
    <Box {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack border="1px" borderColor="gray.200" rounded="md" p="4">
          <HStack justify="start" align="start">
            <TextInput
              id="username"
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
              })}
              isInvalid={!!errors.username}
              error={errors.username?.message}
              autoComplete="off"
            />

            <TextInput
              id="email"
              placeholder="E-mail"
              {...register('email', {
                required: 'E-mail is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address',
                },
              })}
              isInvalid={!!errors.email}
              error={errors.email?.message}
              autoComplete="off"
            />
          </HStack>

          <TextInput
            id="task"
            placeholder="Task"
            {...register('task', {
              required: 'Task is required',
            })}
            isInvalid={!!errors.task}
            error={errors.task?.message}
          />

          <Button
            colorScheme="yellow"
            isLoading={isSubmitting}
            type="submit"
            width="full"
          >
            Create Todo
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
