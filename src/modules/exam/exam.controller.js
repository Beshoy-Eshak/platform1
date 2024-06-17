import { examModel } from "../../../databases/models/exam.model.js"
// import userModel from "../../../databases/models/userSchema.js"


const AddExam = async(req, res) => {
    const { name, code, doctorname, quesNUM, totalMark, startTime, endTime, CrseId } = req.body;
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
                endTime,
                CrseId
            });
            res.json({ message: "Exam added successfully", newExam });
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding exam", error });
    }
};


const UserGetAllExams = async(req, res) => {
    try {
        const courseId = req.query.CrseId;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const currentTime = new Date();
        const lastTime = new Date();

        // Find exams within the current time window
        const exams = await examModel.find({
            startTime: { $lte: currentTime },
            endTime: { $gte: lastTime },
            CrseId: courseId
        }).populate("CrseId", "code");;

        res.json({ message: "success", exams });
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching exams.",
            error,
        });
    }
};



// const GetExamsByDoctor = async(req, res) => {
//     try {



//         const exams = await examModel.find()
//             // .populate("CrseId", "courseName"); // Populate the related course information

//         res.json({ message: "success", exams });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error: An error occurred while fetching exams.",
//             error,
//         });
//     }
// };


const GetExamsByDoctor = async(req, res) => {
    try {
        const courseId = req.query.CrseId;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        // Find exams for the given course ID and populate the related course information with course code
        const exams = await examModel.find({ CrseId: courseId })
            .populate("CrseId", "code");

        res.json({ message: "success", exams });
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching exams.",
            error,
        });
    }
};






// // Define the function to get exams by doctor
// const GetExamsByDoctor = async(req, res) => {
//     try {
//         // Extract the doctor's name from the query parameters
//         const doctorName = req.query.doctorname;

//         // If the doctor's name is not provided, return an error
//         if (!doctorName) {
//             return res.status(400).json({ message: "Doctor name is required" });
//         }

//         // Find exams for the given doctor's name and populate the related course information
//         const exams = await examModel.find({ doctorname: doctorName })
//             .populate("CrseId", "courseName"); // Assuming the Course model has a courseName field

//         // Send the response
//         res.json({ message: "success", exams });
//     } catch (error) {
//         // Handle errors and send the response
//         res.status(500).json({
//             message: "Error: An error occurred while fetching exams.",
//             error,
//         });
//     }
// };




const showExamByDoctor = async(req, res) => {
    const { _id } = req.body;

    try {
        const exam = await examModel.findOne({ _id });
        if (exam) {
            res.json({ message: 'success', exam });
        } else {
            res.json({ message: 'Course not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};


const showExamByStudent = async(req, res) => {
    const { _id } = req.body;

    try {
        const currentTime = new Date();

        // Find the specific exam by its _id
        const exam = await examModel.findById(_id);
        if (exam) {
            // Find exams within the current time window
            const exams = await examModel.find({
                startTime: { $lte: currentTime },
                endTime: { $gte: currentTime },
            });

            res.json({ message: "success", exams });
        } else {
            res.status(404).json({ message: "Exam not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching exams.",
            error,
        });
    }
};



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





export {
    UserGetAllExams,
    showExamByStudent,
    AddExam,
    deleteExam,
    updateExam,
    showExamByDoctor,
    GetExamsByDoctor
}