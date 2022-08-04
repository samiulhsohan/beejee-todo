import { Router } from 'express'
import { authRouter } from './auth'
import { todoRouter } from './todo'

export const router = Router()

router.use('/auth', authRouter)
router.use('/todo', todoRouter)
