import mongoose from "mongoose";

const questSchema = mongoose.Schema({

    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    options: [{ type: String, required: true }],
    startTime: { type: String },
    endTime: { type: String },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CrseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }



}, {
    timestamps: true
})


const questModel = mongoose.model('quest', questSchema);

export { questModel };