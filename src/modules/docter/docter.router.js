

import express from 'express'
import { addDocter, deleteDoctor, getAllDoctor, getDoctor, updateDoctor } from './docter.controller.js'
import { allowedTo, protectedRoutes } from '../authencations/auths.js'

const doctorRouter = express.Router()

doctorRouter.post('/',protectedRoutes,allowedTo('admin'),addDocter)
doctorRouter.delete('/',protectedRoutes,allowedTo('admin'),deleteDoctor)
doctorRouter.get('/getdoctor',protectedRoutes,allowedTo('admin'),getDoctor)
doctorRouter.get('/',protectedRoutes,allowedTo('admin'),getAllDoctor)
doctorRouter.put('/:id',protectedRoutes,allowedTo('admin'),updateDoctor)
export default doctorRouter