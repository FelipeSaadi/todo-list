import { Router } from 'express'
import * as taskController from '../controllers/task'
import * as userController from '../controllers/user'
import { Auth } from '../middlewares/auth'

export const mainRouter = Router()

mainRouter.get('/tasks/:_id', Auth.private, taskController.getTasks)
mainRouter.post('/task/', Auth.private, taskController.createTask)
mainRouter.delete('/task/:_id', Auth.private, taskController.deleteTask)
mainRouter.put('/task/:_id', Auth.private, taskController.updateTask)

mainRouter.post('/register', userController.register)
mainRouter.post('/login', userController.login)