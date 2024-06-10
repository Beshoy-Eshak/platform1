import express from "express"
import { Addcourse, getAllcourses, updatecourse, deletecourse, getcourse } from "./course.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const courseRouter = express.Router()

courseRouter.post("/course/doctor", protectedRoutes, allowedTo(['doctor']), Addcourse)
courseRouter.get("/course/user", getAllcourses)
courseRouter.put("/course/doctor", protectedRoutes, allowedTo(['doctor']), updatecourse)
courseRouter.delete("/course/doctor", protectedRoutes, allowedTo(['doctor']), deletecourse)
courseRouter.get("/course", getcourse)
    // courseRouter.get("/courses", getCourses)

export default courseRouter