import mongoose from "mongoose";



const UserAnswerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quest",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);

export { UserAnswer };