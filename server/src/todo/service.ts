import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTodos({
  skip,
  take,
  sortBy,
  orderBy,
}: {
  skip: number
  take: number
  sortBy?: string
  orderBy?: string
}) {
  const count = await prisma.todo.count()
  const todo = await prisma.todo.findMany({
    skip,
    take,
    orderBy: {
      [sortBy ?? 'createdAt']: orderBy ?? 'desc',
    },
  })

  return {
    todo,
    count,
  }
}
