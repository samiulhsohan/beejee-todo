import { Router } from 'express'
import * as controller from './controller'
import * as validate from './validate'

export const router = Router()

router.get('/', validate.getTodos, controller.getTodos)
router.post('/', validate.createTodo, controller.createTodo)
router.put('/:id', validate.updateTodo, controller.updateTodo)
