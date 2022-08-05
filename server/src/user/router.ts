import { Router } from 'express'
import { authMiddleware } from '../middleware'
import * as controller from './controller'

export const router = Router()

router.get('/me', authMiddleware, controller.getUser)
