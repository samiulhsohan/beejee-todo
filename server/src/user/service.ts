import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true },
  })
}
