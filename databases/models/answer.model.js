import mongoose from 'mongoose';
const AnswerSchema = new mongoose.Schema({
    selectAnswer: {
        type: String,
        required: true,
    },
    questID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quest",
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    grade: {
        type: String,
    },
    crseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
});

const AnswerModel = mongoose.model('Answer', AnswerSchema);

export default AnswerModel