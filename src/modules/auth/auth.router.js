import express from 'express'
import * as User from './auth.controller.js'
import { protectedRoutes } from '../../middleware/auths.js'


const userRouter =express.Router()

userRouter.post('/signUp',User.signUp)
userRouter.post('/signIn',User.signIn)
userRouter.patch('/verfiyEmail',User.confirmEmail)

userRouter.put('/',protectedRoutes,User.updateDate)
userRouter.patch('/',protectedRoutes,User.changePassword)
userRouter.get('/getme',protectedRoutes,User.getUser)
userRouter.patch('/logout',protectedRoutes,User.logout)
userRouter.delete('/delete',protectedRoutes,User.removeAccount)





userRouter.post('/forgot-password', User.forgetPassword);

// Endpoint to render the password reset page
userRouter.get('/reset-password/:token', User.changeResetPassword);

// Endpoint to handle password reset form submission
userRouter.post('/reset-password/:token', User.resetPassword);



export default userRouter