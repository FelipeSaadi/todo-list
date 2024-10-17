import { Router } from 'express'
import * as taskController from '../controllers/task'
import { Auth } from '../middlewares/auth'

export const mainRouter = Router()

mainRouter.get('/tasks/', Auth.private, taskController.getTasks)
mainRouter.post('/task/', Auth.private, taskController.createTask)
mainRouter.delete('/task/:_id', Auth.private, taskController.deleteTask)
mainRouter.put('/task/:_id', Auth.private, taskController.updateTask)