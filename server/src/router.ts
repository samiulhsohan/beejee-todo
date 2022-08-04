import { Router } from 'express'
import { todoRouter } from './todo'

export const router = Router()

router.use('/todo', todoRouter)
