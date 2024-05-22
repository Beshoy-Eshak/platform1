

import express from 'express'
import { addStudent, deleteUser } from './student.controller.js'
import { allowedTo, protectedRoutes } from '../authencations/auths.js'

const studentRouter = express.Router()

studentRouter.post('/',protectedRoutes,allowedTo('admin'),addStudent)
studentRouter.delete('/',protectedRoutes,allowedTo('admin'),deleteUser)

export default studentRouter