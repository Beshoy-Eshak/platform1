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
    }

    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {
    timestamps: true
})


// const questionSchema = new mongoose.Schema({
//     question: { type: String, required: true },
//     correctAnswer: { type: String, required: true },
//     options: [{ type: String, required: true }],
// }, {
//     timestamps: true
// });

// const questSchema = new mongoose.Schema({
//     questions: [questionSchema],
// }, {
//     timestamps: true
// });

const questModel = mongoose.model('quest', questSchema);

export { questModel };




// const questModel = mongoose.model('quest', questSchema)

// export { questModel }




// const questionSchema = new mongoose.Schema({

//     name: { type: String },
//     code: { type: String },
//     examId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "exam"
//     },
//     courseId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course"
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//     questions: [questSchema]

// }, {
//     timestamps: true
// });





// import mongoose from "mongoose";



// const examSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     code: { type: String, required: true },
//     questions: [questionSchema],
//     startTime: { type: Date, required: true },
//     endTime: { type: Date, required: true },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, {
//     timestamps: true
// });

// const questModel = mongoose.model('quest', examSchema);

// export { questModel };