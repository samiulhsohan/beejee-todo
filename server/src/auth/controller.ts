import { Request, Response } from 'express'
import { cookieDomain, __prod__ } from '../constants'
import {
  sendResponse,
  sendServerError,
  sendUnauthenticatedError,
} from '../utils'
import * as service from './service'

export async function login(req: Request, res: Response) {
  try {
    const data = await service.login(req.body.username, req.body.password)
    if (!data) {
      return sendUnauthenticatedError(res, 'Invalid username or password')
    }
    res.cookie('token', data.token, {
      httpOnly: true,
      secure: __prod__,
      sameSite: 'lax',
      domain: cookieDomain,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    })
    sendResponse(res, data.user)
  } catch {
    sendServerError(res)
  }
}

export async function logout(_: Request, res: Response) {
  res.clearCookie('token', { domain: cookieDomain })
  sendResponse(res, null)
}
