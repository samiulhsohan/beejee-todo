import { Router } from 'express'
import * as controller from './controller'
import * as validate from './validate'

export const router = Router()

router.post('/login', validate.login, controller.login)
router.get('/logout', controller.logout)
