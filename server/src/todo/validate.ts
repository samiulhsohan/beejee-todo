import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sendBadRequestError } from '../utils'

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
        value === 'task' ||
        value === 'completed'
      )
    })
    .strict(true),
  orderBy: yup
    .string()
    .test('order', 'invalid order', value => {
      if (!value) return true
      return value === 'desc' || value === 'asc'
    })
    .strict(true),
})

export async function getTodos(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await getSchema.validate(req.query)
    next()
  } catch (error) {
    const type = error?.type
    const path = error?.path

    if (type === 'required') {
      sendBadRequestError(res, `${path} field is required`)
    } else {
      sendBadRequestError(res, `Invalid ${path} provided`)
    }
  }
}
