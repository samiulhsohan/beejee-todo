import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { validateSchema } from '../utils'

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

export async function login(req: Request, res: Response, next: NextFunction) {
  validateSchema({ res, next, data: req.body, schema: loginSchema })
}
