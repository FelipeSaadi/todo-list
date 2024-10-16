import { Router } from 'express'
import * as taskController from '../controllers/task'

export const mainRouter = Router()

mainRouter.get('/tasks/', taskController.getTasks)
mainRouter.post('/task/', taskController.createTask)
mainRouter.delete('/task/:id', taskController.deleteTask)
mainRouter.put('/task/:id', taskController.updateTask)