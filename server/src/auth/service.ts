import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils'

const prisma = new PrismaClient()

export async function login(
  username: string,
  password: string,
): Promise<{ token: string; user: Omit<User, 'password'> } | null> {
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) return null

  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) return null

  const token = generateToken(user.id, user.username)
  return { token, user: { id: user.id, username: user.username } }
}
