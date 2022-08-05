import { Router } from 'express'
import { authRouter } from './auth'
import { todoRouter } from './todo'
import { userRouter } from './user'

export const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/todo', todoRouter)
