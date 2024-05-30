import mongoose from "mongoose";
import bcrypt from 'bcrypt'


export const userSchema = mongoose.Schema({
    name: { type: String, required: true },
   nationalPerson:{
    type:String ,
   } ,
    gmail: { type: String },
    level: { type: Number},
    password: { type: String, required: true },
    code: { type: Number} ,
    confrimEmail:{
        type:Boolean ,
        default:false
    } ,
    isAdmin:{
        type:String ,
        enum:['admin','doctor','student'] ,
        default :"student"
    } ,
    logout:Date
}, { timestamps: true });

userSchema.pre('save',function(){
    this.password = bcrypt.hashSync(this.password,7)
    })
    userSchema.pre('findOneAndUpdate', function () {
        if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
     })
export const userModel =mongoose.model( 'User', userSchema ); 