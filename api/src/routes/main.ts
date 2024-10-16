import { Router } from 'express'
import * as taskController from '../controllers/task'

export const mainRouter = Router()

mainRouter.get('/tasks/', taskController.getTasks)
mainRouter.post('/task/', taskController.createTask)
mainRouter.delete('/task/:_id', taskController.deleteTask)
mainRouter.put('/task/:_id', taskController.updateTask)