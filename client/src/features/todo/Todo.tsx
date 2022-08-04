import { Container } from '@chakra-ui/react'
import CreateTodo from './CreateTodo'

export default function Todo() {
  return (
    <Container maxW="md">
      <CreateTodo />
    </Container>
  )
}
