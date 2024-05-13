
import jwt from 'jsonwebtoken'
import { AppError } from "../utils/AppError.js"
import { catchAsyncError } from "../utils/catchError.js"
import { userModel } from '../../databases/models/userSchema.js'

const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers
    if (!token) return next(new AppError("TOKEN MUST BE PROVIDED", 401))
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("Account Not Found", 401))
    if(user.logout){
        const userLogout = parseInt(user.logout.getTime()/1000)
        if(userLogout >decoded.iat) return next(new AppError("login frist",403))
    }
    req.user = user
    next()
})


export {
    protectedRoutes
}

