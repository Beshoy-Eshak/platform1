import { userModel } from "../../../databases/models/userSchema.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchError.js"
import jwt from 'jsonwebtoken'

const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError("TOKEN MUST BE PROVIDED", 401))
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("Invalid Token", 401))
    req.user = user
    next()
})

const allowedTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.isAdmin)) return next(new AppError("You are not authorized to access this route you are " + req.user.isAdmin, 401))
        next()

    })
}

export {
    protectedRoutes ,
    allowedTo
}