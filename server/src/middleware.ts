import { NextFunction, Response } from 'express'
import { DecodedAccessToken, RequestWithUser } from './types'
import { sendUnauthenticatedError, verifyToken } from './utils'

export async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token
  if (!token) return sendUnauthenticatedError(res)

  try {
    const decoded = verifyToken(token)
    req.user = decoded as DecodedAccessToken
    next()
  } catch (err) {
    sendUnauthenticatedError(res)
  }
}
