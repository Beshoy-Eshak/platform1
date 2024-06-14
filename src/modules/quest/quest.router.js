import express from "express"
import { AddQuest, getAllQuestBydoctor, updateQuest, deleteQuest, showContent } from "./quest.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const questRouter = express.Router()

questRouter.post("/courses/exams/addQuestion", protectedRoutes, allowedTo([
    'doctor'
]), AddQuest)
questRouter.get("/courses/exams/Questions", protectedRoutes, allowedTo(['doctor']), getAllQuestBydoctor)
questRouter.put("/questions/update", protectedRoutes, allowedTo(['doctor']), updateQuest)
questRouter.delete("/questions/delete", protectedRoutes, allowedTo(['doctor']), deleteQuest)
    // questRouter.get("/questions/doctor/", getContent)
questRouter.get("/questions/user", showContent)

export default questRouter