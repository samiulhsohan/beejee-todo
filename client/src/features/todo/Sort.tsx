import { Box, BoxProps, Button, HStack, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../store'
import { SortOrder, TodoSortBy } from '../../types'
import {
  selectSortOrder,
  selectSortBy,
  setSortOrder,
  setSortBy,
} from './todoSlice'

interface SortProps extends BoxProps {}

export default function Sort({ ...props }: SortProps) {
  const dispatch = useAppDispatch()

  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)

  const handleSortChange = (sortBy: TodoSortBy) => {
    dispatch(setSortBy(sortBy))
  }

  const handleOrderChange = (orderBy: SortOrder) => {
    dispatch(setSortOrder(orderBy))
  }

  return (
    <Box {...props}>
      <Text fontSize="sm" textTransform="uppercase" fontWeight="medium">
        Sort By
      </Text>
      <HStack spacing={0} justify="space-between" mt="1.5" wrap="wrap" gap="2">
        <HStack>
          <SortButton
            current="username"
            active={sortBy}
            label="Username"
            onClick={() => handleSortChange('username')}
          />
          <SortButton
            current="email"
            active={sortBy}
            label="E-mail"
            onClick={() => handleSortChange('email')}
          />
          <SortButton
            current="completed"
            active={sortBy}
            label="Completion"
            onClick={() => handleSortChange('completed')}
          />
        </HStack>

        <HStack>
          <SortButton
            current="asc"
            active={sortOrder}
            label="ASC"
            onClick={() => handleOrderChange('asc')}
          />
          <SortButton
            current="desc"
            active={sortOrder}
            label="DESC"
            onClick={() => handleOrderChange('desc')}
          />
        </HStack>
      </HStack>
    </Box>
  )
}

function SortButton({
  active,
  current,
  onClick,
  label,
}: {
  active: string
  current: string
  onClick: () => void
  label: string
}) {
  return (
    <Button
      size="sm"
      {...{ onClick }}
      colorScheme={current === active ? 'yellow' : 'gray'}
    >
      {label}
    </Button>
  )
}
