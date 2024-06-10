import express from "express"
import { getUserAnswer, checkAnswer } from "./UserAnswer.controller.js"

const AnsweRCheck = express.Router()

AnsweRCheck.get('/student-answers/:studentId', getUserAnswer)
AnsweRCheck.get('/check-answers/:studentId', checkAnswer)

export default AnsweRCheck