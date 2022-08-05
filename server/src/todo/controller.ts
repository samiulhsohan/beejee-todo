import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { sendBadRequestError, sendResponse, sendServerError } from '../utils'
import * as service from './service'

export async function getTodos(req: Request, res: Response) {
  const { take, skip, sortOrder, sortBy } = req.query

  try {
    const todos = await service.getTodos({
      skip: +skip!,
      take: +take!,
      sortBy: sortBy as string,
      sortOrder: sortOrder as Prisma.SortOrder,
    })
    sendResponse(res, todos)
  } catch (err) {
    console.error(err)
    sendServerError(res)
  }
}

export async function createTodo(req: Request, res: Response) {
  const { username, email, task } = req.body
  const todo = await service.createTodo({ username, email, task })
  sendResponse(res, todo)
}

export async function updateTodo(req: Request, res: Response) {
  const { id } = req.params
  const { task, completed } = req.body
  const todo = await service.updateTodo({ id: +id, task, completed })
  if (!todo) return sendBadRequestError(res, 'Todo not found')
  sendResponse(res, todo)
}
