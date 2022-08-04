import { Request, Response } from 'express'
import { sendResponse, sendServerError } from '../utils'
import * as service from './service'

export async function getTodos(req: Request, res: Response) {
  const { take, skip, orderBy, sortBy } = req.query

  try {
    const todos = await service.getTodos({
      skip: +skip!,
      take: +take!,
      sortBy: sortBy as string,
      orderBy: orderBy as string,
    })
    sendResponse(res, todos)
  } catch (err) {
    console.error(err)
    sendServerError(res)
  }
}
