import { NextFunction, Response } from 'express'
import { DecodedAccessToken, RequestWithUser } from './types'
import { sendUnauthenticatedError, verifyToken } from './utils'

export async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  const token = authorization?.split(' ')[1]
  if (!token) return sendUnauthenticatedError(res)

  try {
    const decoded = verifyToken(token)
    req.user = decoded as DecodedAccessToken
    next()
  } catch {
    sendUnauthenticatedError(res)
  }
}
