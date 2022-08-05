import { Box, BoxProps, Button, HStack } from '@chakra-ui/react'

interface PaginationProps extends BoxProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  ...props
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <Box {...props}>
      <HStack justify="end">
        {Array(totalPages)
          .fill(0)
          .map((_, idx) => {
            const page = idx + 1
            return (
              <Button
                key={idx}
                colorScheme={page === currentPage ? 'yellow' : 'gray'}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            )
          })}
      </HStack>
    </Box>
  )
}
