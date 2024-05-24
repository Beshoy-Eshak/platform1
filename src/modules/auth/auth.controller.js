import {userModel} from '../../../databases/models/userSchema.js'
import { catchAsyncError } from "../../utils/catchError.js";
import nodemailer from 'nodemailer'
import { createTransport } from "nodemailer";
import bcrypt from 'bcrypt'
import randomInt from 'random-int'
import { htmlTemplete } from "../mails/htmlSendEmail.js";
import jwt from 'jsonwebtoken'
import { htmlResetPassword } from '../mails/htmlResetpass.js';
import { template3 } from '../mails/templete2.js';
import { template4 } from '../mails/templete3.js';
import { AppError } from '../../utils/AppError.js';

let emailVerificationNumbers = {};
const signUp =catchAsyncError(async (req,res,next)=>{
    const userEmail = req.body.gmail;
    const {name} =req.body
    const gmail =await userModel.findOne({gmail:req.body.gmail})
    if(gmail && gmail.confrimEmail) return next(new AppError("Account Already Exist",403))

    const user =new userModel(req.body)
    await user.save()
    const   transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: "beshoyeshak865@outlook.com",
            pass: "beshoy4321",
        },
    });
    const verificationNumber = randomInt(1000, 9999); 
    emailVerificationNumbers[userEmail] = verificationNumber;
    const mailOptions = {
        from: '"Beshoy 👻" <beshoyeshak865@outlook.com>',
        to: req.body.gmail, 
        subject: "Confirm Your Email ✔",
        html:htmlTemplete(verificationNumber,name),
    };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message:'Error sending email' + error});
        }
    });
    const {isAdmin,confrimEmail,...other}=user._doc;
    res.json({message:"Success and Code Has been sent In Your Email To Verfiy Email",...other})
})

const signIn=catchAsyncError(async (req,res,next)=>{
    const {gmail,password}=req.body
    const user =await userModel.findOne({gmail})
    if(!user ) return next(new AppError("Account Not Found ",401))
    if(!user.confrimEmail) return next(new AppError("Please Verfiy Your Email Before",403))
    if(!(await bcrypt.compare(password, user.password))) return next(new AppError("Account Not Found or Password Wrong",403))
  
    let token = jwt.sign({userId:user._id,userName:user.name,Gender:user.gender,Email:user.gmail,Phone:user.phone },process.env.SECRET_KEY );
    res.json({message:"success",token})
})
const confirmEmail =catchAsyncError(async(req,res,next)=>{
        const userEmail = req.body.gmail;
const userEnteredNumber = req.body.code;

const email =await userModel.findOne({gmail:req.body.gmail})
if(!email) return next(new AppError("You Must Sign Up Before"))
if (emailVerificationNumbers[userEmail] === parseInt(userEnteredNumber, 10)) {
 let user = await userModel.findOneAndUpdate({gmail:userEmail},{confrimEmail:true},{new:true})
 let token = jwt.sign({userId:user._id,userName:user.name,Gender:user.gender,Email:user.gmail,Phone:user.phone },process.env.SECRET_KEY );
 res.status(200).json({message:"The Verfication Successful" ,token})
} else {
  res.status(403).json({message:"The Code you Entered is incorrect"})
}
})

const updateDate =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    if(!user) return next(new AppError("Not Valid Email",403))
    const newUpdate =await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    const {isAdmin,...other}=newUpdate._doc;
    res.json({message:"success",...other})
})
const changePassword =catchAsyncError(async (req,res,next)=>{
    const {newPassword,oldPassword}=req.body
    const user =await userModel.findById(req.user._id)
    if(!user) return next(new AppError("Not Valid Email",403))
    if(!oldPassword) return next(new AppError("please Enter Old Password",403))
    if(!(await bcrypt.compare(oldPassword, user.password)))  return next(new AppError("Password That You Enter is Wrong"))
    const newUpdate =await userModel.findByIdAndUpdate(req.user,{password:newPassword},{new:true})
    const {isAdmin,...other}=newUpdate._doc;
    res.json({message:"success",...other})
})

const getUser =catchAsyncError(async (req,res,next)=>{
    const user =await userModel.findById(req.user._id)
    if(!user) return next(new AppError("User Not Found" ,403))
    const {isAdmin,...other}=user._doc;
    res.json({message:"success",...other})
})

const logout =catchAsyncError(async (req,res,next)=>{
    req.body.logout =Date.now()
    const user =await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true})
    res.json({message:"Your Are loged out"})
})

const removeAccount =catchAsyncError(async(req,res,next)=>{
    const user =await userModel.findByIdAndDelete(req.user._id)
    res.json({message:"Account Deleted ."})
})

let forgetPassword = catchAsyncError(async (req, res) => {
    const { gmail } = req.body;
    const user = await userModel.findOne({ gmail });

    if (!user) {
        return res.status(404).json({message:'User not found'});
    }

    let token = jwt.sign({ gmail: gmail }, process.env.KEY_SEQERT_RESET)

    const transporter = createTransport({
        service: 'outlook',
        auth: {
            user: "beshoyeshak865@outlook.com",
            pass: "beshoy4321",
        },
    });


    const mailOptions = {
        from: '"Beshoy 👻" <beshoyeshak865@outlook.com>',
        to: gmail,
        subject: 'Password Reset ✔',
        html: htmlResetPassword(token),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message:'Error sending email' + error});
        }
        res.status(200).json({message:'Password reset email sent'});
    });

})

let changeResetPassword = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    res.send(template3(token));
})

let resetPassword = catchAsyncError(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    jwt.verify(token, process.env.KEY_SEQERT_RESET, async (err, decode) => {
        if (err) return res.json({ message: err })

        let user = await userModel.findOne({ gmail: decode.gmail });
        if (!user) {
            return res.status(404).json({message:'Email Not Found'});
        }
        // Update the user's password and clear the resetToken
        await userModel.findOneAndUpdate({ gmail: decode.gmail }, { password },{new:true})
        res.status(200).send(template4());

    })
})

export {
    signIn ,
    signUp ,
    updateDate ,
    getUser ,
    logout ,
    removeAccount ,
    changePassword ,
    confirmEmail ,
    forgetPassword ,
    resetPassword ,
    changeResetPassword
}