import express from 'express'
import dotenv from 'dotenv'
import { dbconnection } from './databases/dbconnection.js'
import { AppError } from './src/utils/AppError.js'
import userRouter from './src/modules/auth/auth.router.js'
import cors from 'cors'
import studentRouter from './src/modules/student/student.router.js'
import doctorRouter from './src/modules/docter/docter.router.js'
import AnsweRouter from "./src/modules/answer/answer.router.js"
import courseRouter from "./src/modules/course/course.router.js"
import examRouter from "./src/modules/exam/exam.router.js"
import questRouter from "./src/modules/quest/quest.router.js"
import AnsweRCheck from "./src/modules/userAnswer/UserAnswer.router.js"
const app = express()
app.use(express.json())

dotenv.config()
const port = 7000


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true  }))
app.use('/users', userRouter)
app.use('/student', studentRouter)
app.use('/doctor', doctorRouter)
app.use('/users', userRouter)
app.use('/exam', examRouter)
app.use('/exam', questRouter)
app.use('/exam', AnsweRouter)
app.use('/exam', courseRouter)
app.use('/exam', AnsweRCheck)

app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found " + req.originalUrl, 404))
})

app.use((err, req, res, next) => {
    let code = err.statusCode || 500
    res.status(code).json({ message: err.message })
})
dbconnection()
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))