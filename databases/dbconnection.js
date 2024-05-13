import mongoose from "mongoose";

export const dbconnection =()=>{
    mongoose.connect("mongodb+srv://platform1:platform2@cluster0.xnavg3n.mongodb.net/platform").then(()=>{
        console.log("database Connnected .");
    }).catch(()=>{
        console.log("error in connect .");
    })
}
