import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTodos({
  skip,
  take,
  sortBy,
  sortOrder,
}: {
  skip: number
  take: number
  sortBy?: string
  sortOrder?: Prisma.SortOrder
}) {
  const count = await prisma.todo.count()
  const _sortOrder = sortOrder ?? 'desc'

  let order: Prisma.Enumerable<Prisma.TodoOrderByWithRelationInput> = [
    { [sortBy ?? 'createdAt']: _sortOrder },
  ]

  if (sortBy === 'completed') {
    order = [{ completed: _sortOrder }, { createdAt: 'desc' }]
  }

  const todo = await prisma.todo.findMany({
    skip,
    take,
    orderBy: order,
  })

  return {
    todo,
    count,
  }
}

export async function createTodo({
  username,
  email,
  task,
}: {
  username: string
  email: string
  task: string
}) {
  return prisma.todo.create({
    data: {
      username,
      email,
      task,
    },
  })
}

export async function updateTodo({
  id,
  task,
  completed,
}: {
  id: number
  task: string
  completed: boolean
}) {
  const todo = await prisma.todo.findUnique({ where: { id } })
  if (!todo) return null
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      task,
      completed,
      edited: true,
    },
  })
}
