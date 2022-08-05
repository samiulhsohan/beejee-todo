import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { validateSchema } from '../utils'

const getSchema = yup.object().shape({
  skip: yup.number().required(),
  take: yup.number().required(),
  sortBy: yup
    .string()
    .test('sort', 'invalid sort', value => {
      if (!value) return true
      return (
        value === 'username' ||
        value === 'email' ||
        value === 'completed' ||
        value === 'createdAt'
      )
    })
    .strict(true),
  sortOrder: yup
    .string()
    .test('sortOrder', 'invalid sort order', value => {
      if (!value) return true
      return value === 'desc' || value === 'asc'
    })
    .strict(true),
})

const createSchema = yup.object().shape({
  username: yup.string().required().strict(true),
  email: yup.string().email().required().strict(true),
  task: yup.string().required().strict(),
})

const updateSchema = yup.object().shape({
  task: yup.string().strict(),
  completed: yup.boolean().strict(),
})

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema({ res, next, data: req.query, schema: getSchema })
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema({ res, next, data: req.body, schema: createSchema })
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  validateSchema({ res, next, data: req.body, schema: updateSchema })
}
