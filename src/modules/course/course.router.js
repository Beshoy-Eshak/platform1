import express from "express"
import { Addcourse, getAllcourses, updatecourse, deletecourse, getcourse } from "./course.controller.js"
import { allowedTo, protectedRoutes } from "../authencations/auths.js"

const courseRouter = express.Router()

courseRouter.post("/course/addCourse", protectedRoutes, allowedTo(['admin']), Addcourse)
courseRouter.get("/courses", getAllcourses)
courseRouter.put("/course/doctor", protectedRoutes, allowedTo(['admin']), updatecourse)
courseRouter.delete("/course/delete", protectedRoutes, allowedTo(['admin']), deletecourse)
courseRouter.get("/course", getcourse)
    // courseRouter.get("/courses", getCourses)

export default courseRouter