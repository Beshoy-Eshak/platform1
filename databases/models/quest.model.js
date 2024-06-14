import mongoose from "mongoose";

const questSchema = mongoose.Schema({

    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    options: [{ type: String, required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }



}, {
    timestamps: true
})


const questModel = mongoose.model('quest', questSchema);

export { questModel };