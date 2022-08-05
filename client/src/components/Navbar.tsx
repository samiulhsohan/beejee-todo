import { Box, Button, Heading, HStack, Spinner, Tag } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { api, useGetUserQuery } from '../services'
import { useAppDispatch } from '../store'
import { removeAccessToken } from '../utils'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { data: user, isFetching } = useGetUserQuery()

  const handleLogout = () => {
    removeAccessToken()
    dispatch(api.util.resetApiState())
  }

  return (
    <HStack
      px={[4, 12]}
      align="center"
      justify="space-between"
      h="20"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Heading size="md">BeeJee Todo</Heading>
      <Box>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            {user ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={() => navigate('/login')}>Login</Button>
            )}
          </>
        )}
      </Box>
    </HStack>
  )
}
