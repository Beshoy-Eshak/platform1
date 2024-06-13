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

AnsweRouter.post("/Answer/student", protectedRoutes, allowedTo(['doctor']), AddAnswer)
AnsweRouter.post("/Answer/studentID", protectedRoutes, allowedTo(['doctor']), AddAnswers)
AnsweRouter.get("/Answer/userAnswer", getMyAnswers)
AnsweRouter.put("/Answer/user", protectedRoutes, allowedTo(['doctor']), updateAnswer)
AnsweRouter.delete("/Answer/user", protectedRoutes, allowedTo(['doctor']), deleteAnswer)
AnsweRouter.get("/Answer/user", protectedRoutes, allowedTo(['doctor']), checkAnswer)
AnsweRouter.get("/Answer/user", getAnswers)

export default AnsweRouter