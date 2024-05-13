import express from 'express'
import dotenv from 'dotenv'
import { dbconnection } from './databases/dbconnection.js'
import { AppError } from './src/utils/AppError.js'
import userRouter from './src/modules/auth/auth.router.js'
const app = express()
app.use(express.json())

dotenv.config()
const port = 7000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users',userRouter)


app.all("*",(req,res,next)=>{
    next(new AppError("Page Not Found "+req.originalUrl,404))
})

app.use((err,req,res,next)=>{
    let code =err.statusCode ||500
    res.status(code).json({message:err.message })
})
dbconnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))