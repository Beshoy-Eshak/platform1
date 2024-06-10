import mongoose from "mongoose";


const questSchema = mongoose.Schema({



    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    options: [{ type: String, required: true }],

    startTime: Date,
    endTime: Date,


    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, {
    timestamps: true
})


const questModel = mongoose.model('quest', questSchema)

export { questModel }


// const QuestionType = Object.freeze({
//     LEC: 'Lecture',
//     SEC: 'Section',
//     ESSAY: 'Essay'
// });