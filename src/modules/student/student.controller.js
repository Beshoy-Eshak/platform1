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
    res.json({message:"success",newUser})
})

const deleteUser =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    await userModel.findByIdAndDelete(id)
    res.json({message:"Deleted"})
})

const getStudent =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    const isAdmin ="student"
  const Student =  await userModel.findOne({_id:id ,isAdmin})
    res.json({message:"success",Student})
})

const getAllStudent =catchAsyncError(async (req,res,next)=>{
    const isAdmin ="student"
  const Students=  await userModel.find({isAdmin})
    res.json({message:"success",Students})
})

const updateStudent =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
  const updateStudent0 =  await userModel.findByIdAndUpdate(id ,req.body,{new :true})
    res.json({message:"updated",updateStudent0})
})
export {
    addStudent ,
    deleteUser ,
    getStudent ,
    getAllStudent ,
    updateStudent
}