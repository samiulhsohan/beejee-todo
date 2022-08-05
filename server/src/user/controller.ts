import { Response } from 'express'
import { RequestWithUser } from '../types'
import { sendResponse, sendServerError } from '../utils'
import * as service from './service'

export async function getUser(req: RequestWithUser, res: Response) {
  try {
    const id = req?.user?.id
    const user = await service.getUser(id!)
    sendResponse(res, user)
  } catch {
    sendServerError(res)
  }
}
