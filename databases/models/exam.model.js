import mongoose from "mongoose";

const examSchema = mongoose.Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
        required: true,
    },
    doctorname: {
        type: String,
        required: true,
    },
    quesNUM: {
        type: String,
        required: true,
    },
    totalMark: {
        type: String,
        required: true,
    },
    startTime: Date,
    endTime: Date,

    CrseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
})


export const examModel = mongoose.model('exam', examSchema)