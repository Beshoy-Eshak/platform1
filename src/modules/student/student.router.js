import express from 'express'
import { addStudent, deleteUser, getAllStudent, getStudent, updateStudent } from './student.controller.js'
import { allowedTo, protectedRoutes } from '../authencations/auths.js'

const studentRouter = express.Router()

studentRouter.post('/', protectedRoutes, allowedTo(['admin']), addStudent)
studentRouter.delete('/', protectedRoutes, allowedTo(['admin']), deleteUser)
studentRouter.get('/getstudent', protectedRoutes, allowedTo(['admin']), getStudent)
studentRouter.get('/', protectedRoutes, allowedTo(['admin']), getAllStudent)
studentRouter.put('/:id', protectedRoutes, allowedTo(['admin']), updateStudent)
export default studentRouter