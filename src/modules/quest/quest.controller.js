import { questModel } from "../../../databases/models/quest.model.js";

const AddQuest = async(req, res) => {
    const { questions } = req.body;
    // const { questions, startTime, endTime, name, code } = req.body;
    try {
        // let quest = await questModel.findOne({ question });
        // if (quest) {
        //     res.json({ message: 'Question already exists' });
        // } else {
        const q = await questModel.insertMany(questions);
        // const q = await questModel.insertMany(questions, startTime, endTime, name, code);
        res.json({ message: 'Success', questions: q });
        // res.json({ message: 'Success', questions: q, startTime: startTime, endTime: endTime, name, code });
        // }

    } catch (error) {
        res.status(500).json({ message: "Error adding quest", error });
    }

};
// const AddQuest = async(req, res) => {
//     const { questions, examId, courseId } = req.body;

//     try {


//         // Check if an exam with the given ID exists

//         // exam = await questModel.findById(examId);
//         // if (!exam) {
//         //     return res.status(404).json({ message: 'Exam not found' });
//         // } else {
//         // Create a new exam with the given questions
//         const q = await questModel.insertMany(questions, courseId, examId);

//         // }

//         res.json({ message: 'Success', q });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding exam", error });
//     }
// };



// const getAllQuestBydoctor = async(req, res) => {
//     try {
//         const quests = await questModel.find();

//         res.json({ message: "success", quests });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error: An error occurred while fetching questions.",
//             error,
//         });
//     }
// };

const getAllQuestBydoctor = async(req, res) => {
    try {
        const quests = await questModel.find().select("-examId");
        res.json({ message: "success", quests });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Error: An error occurred while fetching questions.",
                error,
            });
        }
    }
};



// const getContent = async(req, res) => {
//     const { _id } = req.body
//     let quest = await questModel.find({ _id })
//     res.json({ message: 'success', quest })
// }

const showContent = async(req, res) => {
    const currentTime = new Date();
    console.log(currentTime)
    try {
        if (questModel) {


            const questions = await questModel.find({
                startTime: { $lte: currentTime },
            }).select("-correctAnswer -examId");
            // const questions = await questModel.find().select("-correctAnswer  -examId ");
            res.send(questions.map(q => ({ question: q.question, options: q.options })));
            res.json({ message: 'Success', questions });
        } else {
            res.json({ message: 'question not found' });


        }

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Error: An error occurred while fetching questions.",
                error,
            });
        }
    }
};

// const showContent = async(req, res) => {
//     const currentTime = new Date();
//     // const lastTime = new Date();

//     console.log(currentTime);

//     try {
//         if (questModel) {
//             const questions = await questModel
//                 .find({
//                     startTime: { $lte: currentTime },

//                 })
//                 .select("-correctAnswer");

//             res.json({
//                 message: "Success",
//                 questions: questions.map((q) => ({
//                     question: q.question,
//                     options: q.options,
//                 })),
//             });
//         } else {
//             res.status(404).json({ message: "Question model not found" });
//         }
//     } catch (error) {
//         if (!res.headersSent) {
//             res.status(500).json({
//                 message: "Error: An error occurred while fetching questions.",
//                 error,
//             });
//         }
//     }
// };


// const updateQuest = async(req, res) => {
//     const { _id, questions } = req.body;
//     // const { _id, questions, startTime, endTime, name, code } = req.body;
//     let question = await questModel.findByIdAndUpdate({ _id }, { questions }, { new: true, runValidators: true });
//     if (question) {
//         res.json({ message: 'success', question });
//     } else {
//         res.json({ message: 'course not found' });
//     }
// };

const updateQuest = async(req, res) => {
    const { _id, questions } = req.body;

    try {
        const question = await questModel.findByIdAndUpdate(
            _id, { questions }, { new: true, runValidators: true } // Ensure validators run and return the updated document
        );

        if (question) {
            res.json({ message: 'success', question });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating question', error });
    }
};


const deleteQuest = async(req, res) => {
    const { _id } = req.body
    let quest = await questModel.findByIdAndDelete({ _id })
    res.json({ message: 'success' })
}



export {
    getAllQuestBydoctor,
    AddQuest,
    deleteQuest,
    updateQuest,
    // getContent,
    showContent
}