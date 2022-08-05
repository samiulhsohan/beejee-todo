import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Stack,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { TextInput } from '../../components'
import { useGetUserQuery, useLoginMutation } from '../../services'
import { ErrorResponse } from '../../types'

type FormInput = {
  username: string
  password: string
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async data => login(data)

  const [login, { error, data }] = useLoginMutation()
  const { data: user } = useGetUserQuery()

  const errorMessage =
    error && 'data' in error ? (error.data as ErrorResponse).errorMessage : null

  if (user || data) return <Navigate to="/" />

  return (
    <Container maxW="md" mt="10">
      {errorMessage && (
        <Alert status="error" mb="4">
          <AlertIcon />
          <AlertTitle>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack border="1px" borderColor="gray.200" rounded="md" p="4">
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
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
            })}
            isInvalid={!!errors.password}
            error={errors.password?.message}
            type="password"
          />

          <Button
            colorScheme="yellow"
            isLoading={isSubmitting}
            type="submit"
            width="full"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
