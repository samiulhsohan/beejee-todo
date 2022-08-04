import { NextFunction, Response } from 'express'
import * as yup from 'yup'
import { sendBadRequestError } from './response'

export async function validateSchema({
  res,
  next,
  data,
  schema,
}: {
  res: Response
  next: NextFunction
  data: any
  schema: yup.AnyObjectSchema
}) {
  try {
    await schema.validate(data)
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
