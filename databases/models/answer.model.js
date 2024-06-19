import mongoose from 'mongoose';
const AnswerSchema = new mongoose.Schema({
    selectAnswer: {
        type: String,
        required: true
    },
    questID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quest"
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    grade: {
        type: String,
    }
});

const AnswerModel = mongoose.model('Answer', AnswerSchema);

export default AnswerModel