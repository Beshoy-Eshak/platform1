import express from "express"
import { AddExam, UserGetAllExams, updateExam, deleteExam, GetExamsByDoctor } from "./exam.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const examRouter = express.Router()

examRouter.post("/doctor", protectedRoutes, allowedTo([
    'doctor'
]), AddExam)
examRouter.get("/user", UserGetAllExams)
examRouter.put("/doctor", protectedRoutes, allowedTo(['doctor']), updateExam)
examRouter.delete("/doctor", protectedRoutes, allowedTo(['doctor']), deleteExam)
examRouter.get("/doctor", protectedRoutes, allowedTo(['doctor']), GetExamsByDoctor)

export default examRouter