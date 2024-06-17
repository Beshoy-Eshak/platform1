import mongoose from "mongoose";


const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    department: {
        type: String
    }


});

const CourseModel = mongoose.model("Course", CourseSchema);

export { CourseModel };


// const UserSchema = new mongoose.Schema({});

// const User = mongoose.model("User", UserSchema);