import { NextFunction, Request, Response } from 'express'
import { sendUnauthenticatedError, verifyToken } from './utils'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  if (!token) return sendUnauthenticatedError(res)

  try {
    verifyToken(token)
    next()
  } catch {
    sendUnauthenticatedError(res)
  }
}
