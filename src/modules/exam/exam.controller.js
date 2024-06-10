import { examModel } from "../../../databases/models/exam.model.js"
// import userModel from "../../../databases/models/userSchema.js"


const AddExam = async(req, res) => {
    const { name, code, doctorname, quesNUM, totalMark, startTime, endTime } = req.body;
    try {
        const exam = await examModel.findOne({ code });
        if (exam) {
            res.json({ message: "Exam already exists" });
        } else {
            const newExam = await examModel.insertMany({
                name,
                code,
                doctorname,
                quesNUM,
                totalMark,

                startTime,
                endTime
            });
            res.json({ message: "Exam added successfully", newExam });
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding exam", error });
    }
};






const UserGetAllExams = async(req, res) => {
    try {
        // const currentDepartment = req.query.department;
        const currentTime = new Date();

        if (examModel) {
            const exams = await examModel.find({
                // department: currentDepartment,
                "examtime.startTime": { $lte: currentTime },
                "examtime.endTime": { $gte: currentTime },
            });

            res.json({ message: "success", exams });
        } else {
            res.status(500).json({ message: "Error: examModel is not defined." });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching exams.",
            error,
        });
    }
};




const GetExamsByDoctor = async(req, res) => {
    try {
        // const doctorId = req.query.doctorId; // Assuming you have a query parameter for doctorId
        const exams = await examModel.find()
            // .find({ doctorname: doctorId })
            // .populate("CrseId", "courseName"); // Populate the related course information

        res.json({ message: "success", exams });
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching exams.",
            error,
        });
    }
};

// Usage example:
// GET /exams?doctorId=123
// Returns exams associated with the specified doctor


// const getExam = async(req, res) => {
//     try {
//         const currentDepartment = req.query.department;
//         // const { _id } = req.body // افتراضًا يتم إرسال قسم الطالب في الاستعلام
//         // const currentTime = new Date();

//         // التحقق من وجود examModel وتنفيذ استعلام البحث
//         if (examModel) {
//             const exams = await examModel.find({
//                 department: currentDepartment,

//                 // الامتحانات التي بدأت أو ستبدأ في الوقت الحالي
//                 // startTime: { $lte: currentTime },
//                 // الامتحانات التي لم تنته بعد
//                 // endTime: { $gte: currentTime },
//             });

//             res.json({ message: 'success', exams });
//         } else {
//             res.status(500).json({ message: 'Error: examModel is not defined.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error: An error occurred while fetching exams.', error });
//     }

// }







const updateExam = async(req, res) => {
    const { _id, name, code, doctorname, quesNUM, totalMark, startTime, endTime } = req.body;

    try {
        // const updatedExam = await examModel.findByIdAndUpdate(_id);
        const updatedExam = await examModel.findByIdAndUpdate({ _id }, { name, code, doctorname, quesNUM, totalMark, startTime, endTime }, { new: true });

        if (updatedExam) {
            res.json({ message: "success", updatedExam });
        } else {
            res.json({ message: "Course not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while updating the exam.",
            error,
        });
    }
};

// Usage example:
// PUT /exams/:id
// Update an exam by providing the exam ID in the URL and the updated data in the request body



const deleteExam = async(req, res) => {
    const { _id } = req.body;

    try {
        const deletedExam = await examModel.findByIdAndDelete(_id);

        if (deletedExam) {
            res.json({ message: "success" });
        } else {
            res.json({ message: "Exam not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while deleting the exam.",
            error,
        });
    }
};

// Usage example:
// DELETE /exams/:id
// Delete an exam by providing the exam ID in the URL



export {
    UserGetAllExams,
    AddExam,
    deleteExam,
    updateExam,
    // getExam,
    GetExamsByDoctor
}


// const UserGetAllExams = async(req, res) => {

//     const currentDepartment = req.userModel.department; // افتراضًا يتم إرسال قسم الطالب في الاستعلام
//     const currentTime = new Date();

//     const exams = await examModel.find({
//         department: currentDepartment,
//         startTime: { $lte: currentTime }, // الامتحانات التي بدأت أو ستبدأ في الوقت الحالي
//         endTime: { $gte: currentTime }, // الامتحانات التي لم تنته بعد
//     });

//     res.json({ message: 'success', exams })
//         // let exam = await examModel.find()
//         // res.json({ message: 'success', exam })
// }

// const UserGetAllExams = async(req, res) => {



//     let exam = await examModel.find()
//     res.json({ message: 'success', exam })
// }