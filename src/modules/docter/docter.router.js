

import express from 'express'
import { addDocter, deleteDoctor } from './docter.controller.js'
import { allowedTo, protectedRoutes } from '../authencations/auths.js'

const doctorRouter = express.Router()

doctorRouter.post('/',protectedRoutes,allowedTo('admin'),addDocter)
doctorRouter.delete('/',protectedRoutes,allowedTo('admin'),deleteDoctor)

export default doctorRouter