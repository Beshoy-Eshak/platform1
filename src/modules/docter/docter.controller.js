import { userModel } from "../../../databases/models/userSchema.js"
import { AppError } from "../../utils/AppError.js"
import { catchAsyncError } from "../../utils/catchError.js"






const addDocter =catchAsyncError(async (req,res,next)=>{
    const {name, nationalPerson , gmail , password} =req.body
    const email =await userModel.findOne({gmail})
    if(email && email.confrimEmail) return next(new AppError("Account Already Exist",403))
    req.body.confrimEmail =true
    req.body.isAdmin ="doctor"
    const newUser =new userModel({name, nationalPerson , gmail , password , confrimEmail : req.body.confrimEmail , isAdmin : req.body.isAdmin })
    await newUser.save()
    res.json({message:"success",newUser})
})

const deleteDoctor =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    await userModel.findByIdAndDelete(id)
    res.json({message:"Deleted"})
})

const getDoctor =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    const isAdmin ="doctor"
  const doctor =  await userModel.findOne({_id:id ,isAdmin})
    res.json({message:"success",doctor})
})

const getAllDoctor =catchAsyncError(async (req,res,next)=>{
    const isAdmin ="doctor"
  const doctors=  await userModel.find({isAdmin})
    res.json({message:"success",doctors})
})

const updateDoctor =catchAsyncError(async (req,res,next)=>{
    const {id} =req.params
  const update =  await userModel.findByIdAndUpdate(id ,req.body,{new :true})
    res.json({message:"updated",update})
})
export {
    addDocter ,
    deleteDoctor ,
    getAllDoctor ,
    getDoctor ,
    updateDoctor
}