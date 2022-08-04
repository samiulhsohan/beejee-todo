import { Box, Container, Heading } from '@chakra-ui/react'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'

export default function Todo() {
  return (
    <Container maxW="lg">
      <Heading textAlign="center" my="12">
        BeeJee Todo
      </Heading>
      <CreateTodo />
      <Box mt="10">
        <TodoList />
      </Box>
    </Container>
  )
}
