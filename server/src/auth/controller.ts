import { Request, Response } from 'express'
import {
  sendResponse,
  sendServerError,
  sendUnauthenticatedError,
} from '../utils'
import * as service from './service'

export async function login(req: Request, res: Response) {
  try {
    const token = await service.login(req.body.username, req.body.password)
    if (!token) {
      return sendUnauthenticatedError(res, 'Invalid username or password')
    }
    sendResponse(res, token)
  } catch {
    sendServerError(res)
  }
}
