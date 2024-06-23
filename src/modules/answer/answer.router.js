import express from "express"
import {
    getMyAnswers,
    AddAnswer,
    AddAnswers,
    deleteAnswer,
    updateAnswer,
    checkAnswer,
    getAnswers
} from "./answer.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const AnsweRouter = express.Router()

AnsweRouter.post("/courses/exams/Answer/student", AddAnswer)
AnsweRouter.post("/courses/exams/Answer/studentID", AddAnswers)
    // AnsweRouter.get("/courses/exams/Answer/userAnswer", protectedRoutes, allowedTo(['doctor']), getMyAnswers)
AnsweRouter.get("/courses/exams/Answer/userAnswer", getMyAnswers)
AnsweRouter.put("/Answer/user", protectedRoutes, allowedTo(['doctor']), updateAnswer)
AnsweRouter.delete("/Answer/user", protectedRoutes, allowedTo(['doctor']), deleteAnswer)
AnsweRouter.get("/Answer/user", protectedRoutes, allowedTo(['doctor']), checkAnswer)
AnsweRouter.get("/courses/exams/Answer/doctor", protectedRoutes, allowedTo(['doctor']), getAnswers)

export default AnsweRouter