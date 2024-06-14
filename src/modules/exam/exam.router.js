import express from "express"
import { AddExam, UserGetAllExams, updateExam, deleteExam, GetExamsByDoctor, showExamByDoctor, showExamByStudent } from "./exam.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const examRouter = express.Router()

examRouter.post("/add", protectedRoutes, allowedTo([
    'admin'
]), AddExam)
examRouter.get("/courses/studentExams", UserGetAllExams)
examRouter.get("/student/exam", showExamByStudent)
examRouter.put("/doctor", protectedRoutes, allowedTo(['admin']), updateExam)
examRouter.delete("/doctor", protectedRoutes, allowedTo(['admin']), deleteExam)
examRouter.get("/courses/docExams", protectedRoutes, allowedTo(['doctor']), GetExamsByDoctor)
examRouter.get("/courses/docExams/exam", protectedRoutes, allowedTo(['doctor']), showExamByDoctor)

export default examRouter