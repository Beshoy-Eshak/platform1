import express from "express"
import { AddExam, UserGetAllExams, updateExam, deleteExam, GetExamsByDoctor, showExamByDoctor, showExamByStudent } from "./exam.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const examRouter = express.Router()

examRouter.post("/courses/exams/add", protectedRoutes, allowedTo([
    'admin'
]), AddExam)
examRouter.get("/courses/exams/studentExams", UserGetAllExams)
examRouter.get("/courses/exams/student/exam/:id", showExamByStudent)
examRouter.put("/courses/exams/update", protectedRoutes, allowedTo(['admin']), updateExam)
examRouter.delete("/courses/exams/delete", protectedRoutes, allowedTo(['admin']), deleteExam)
examRouter.get("/courses/docExams", protectedRoutes, allowedTo(['doctor']), GetExamsByDoctor)
examRouter.get("/courses/docExams/exam/:id", protectedRoutes, allowedTo(['doctor']), showExamByDoctor)

export default examRouter