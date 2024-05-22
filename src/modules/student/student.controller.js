import { userModel } from "../../../databases/models/userSchema.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchError.js";



const addStudent =catchAsyncError(async (req,res,next)=>{
    const {gmail} =req.body
    const email =await userModel.findOne({gmail})
    if(email && email.confrimEmail) return next(new AppError("Account Already Exist",403))
    req.body.confrimEmail =true
    const newUser =new userModel(req.body)
    await newUser.save()
    const {isAdmin,...other}=newUser._doc;
    res.json({message:"success",...other})
})

const deleteUser =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    await userModel.findByIdAndDelete(id)
    res.json({message:"Deleted"})
})

export {
    addStudent ,
    deleteUser
}