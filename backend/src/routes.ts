import { Router, Request, Response } from 'express'

import { isAuthenticated } from './middlewares/isAuthenticated'
import { upload } from './middlewares/upload'

import { CreateAttachmentController } from './controllers/attachment/CreateAttachmentController'
import { DetailAttachmentController } from './controllers/attachment/DetailAttachmentController'
import { DeleteAttachmentController } from './controllers/attachment/DeleteAttachmentController'
import { ListAttachmentByTaskController } from './controllers/attachment/ListAttachmentByTaskController'

import { CreateTaskController } from './controllers/task/CreateTaskController'
import { DetailTaskController } from './controllers/task/DetailTaskController'
import { DeleteTaskController } from './controllers/task/DeleteTaskController'
import { ListTaskController } from './controllers/task/ListTaskController'
import { ListTaskBySquadController } from './controllers/task/ListTaskBySquadController'
import { ListTaskByUserController } from './controllers/task/ListTaskByUserController'
import { UpdateTaskController } from './controllers/task/UpdateTaskController'

import { CreateSquadController } from './controllers/squad/CreateSquadController'
import { DeleteSquadController } from './controllers/squad/DeleteSquadController'
import { ListSquadController } from './controllers/squad/ListSquadController'

import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { DetailLoggedUserController } from './controllers/user/DetailLoggedUserController'
import { DeleteUserController } from './controllers/user/DeleteUserController'
import { ListUserController } from './controllers/user/ListUserController'
import { ListUserBySquadController } from './controllers/user/ListUserBySquadController'
import { UpdateUserController } from './controllers/user/UpdateUserController'

const router = Router()

// -- Routes ATTACHMENT --
router.get('/attachment', isAuthenticated, new DetailAttachmentController().handle)
router.get('/attachment/task', isAuthenticated, new ListAttachmentByTaskController().handle)
router.post('/attachment', isAuthenticated, upload, new CreateAttachmentController().handle)
router.delete('/attachment', isAuthenticated, new DeleteAttachmentController().handle)

// -- Routes TASK --
router.get('/task', isAuthenticated, new DetailTaskController().handle)
router.get('/task/all', isAuthenticated, new ListTaskController().handle)
router.get('/task/user', isAuthenticated, new ListTaskByUserController().handle)
router.get('/task/squad', isAuthenticated, new ListTaskBySquadController().handle)
router.delete('/task', isAuthenticated, new DeleteTaskController().handle)
router.post('/task', isAuthenticated, new CreateTaskController().handle)
router.put('/task', isAuthenticated, new UpdateTaskController().handle)

// -- Routes SQUAD --
router.get('/squad/all', isAuthenticated, new ListSquadController().handle)
router.delete('/squad', isAuthenticated, new DeleteSquadController().handle)
router.post('/squad', isAuthenticated, new CreateSquadController().handle)

// -- Routes USER --
router.get('/me', isAuthenticated, new DetailLoggedUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)
router.get('/user/all', isAuthenticated, new ListUserController().handle)
router.get('/user/squad', isAuthenticated, new ListUserBySquadController().handle)
router.delete('/user', isAuthenticated, new DeleteUserController().handle)
router.post('/auth', new AuthUserController().handle)
router.post('/user', new CreateUserController().handle)
router.put('/user', isAuthenticated, new UpdateUserController().handle)

export { router }
