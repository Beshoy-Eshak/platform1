import express from "express"
import { AddQuest, getAllQuestBydoctor, updateQuest, deleteQuest, showContent } from "./quest.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const questRouter = express.Router()

questRouter.post("/courses/exams/addQuestion", protectedRoutes, allowedTo([
    'doctor'
]), AddQuest)
questRouter.get("/courses/exams/Questions", protectedRoutes, allowedTo(['doctor']), getAllQuestBydoctor)
questRouter.put("/courses/exams/Questions/update", protectedRoutes, allowedTo(['doctor']), updateQuest)
questRouter.delete("/courses/exams/Questions/delete", protectedRoutes, allowedTo(['doctor']), deleteQuest)
    // questRouter.get("/questions/doctor/", getContent)
questRouter.get("/courses/exams/studentQuestions", showContent)

export default questRouter