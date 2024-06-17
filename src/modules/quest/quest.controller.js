import { questModel } from "../../../databases/models/quest.model.js";

// const AddQuest = async(req, res) => {
//     const { questions } = req.body;
//     // const { questions, startTime, endTime, name, code } = req.body;
//     try {
//         // let quest = await questModel.findOne({ question });
//         // if (quest) {
//         //     res.json({ message: 'Question already exists' });
//         // } else {
//         const q = await questModel.insertMany(questions);
//         // const q = await questModel.insertMany(questions, startTime, endTime, name, code);
//         res.json({ message: 'Success', questions: q });
//         // res.json({ message: 'Success', questions: q, startTime: startTime, endTime: endTime, name, code });
//         // }

//     } catch (error) {
//         res.status(500).json({ message: "Error adding quest", error });
//     }

// };

const AddQuest = async(req, res) => {
    const { questions, CrseId } = req.body;

    try {
        // Ensure CrseId is provided
        if (!CrseId) {
            return res.status(400).json({ message: "CrseId is required" });
        }

        // Add CrseId to each question
        const questionsWithCourseId = questions.map(question => ({
            ...question,
            CrseId
        }));

        // Insert questions with the course ID
        const q = await questModel.insertMany(questionsWithCourseId);
        res.json({ message: "Success", questions: q });

    } catch (error) {
        res.status(500).json({ message: "Error adding quest", error });
    }
};



// const getAllQuestBydoctor = async(req, res) => {
//     try {


//         const quests = await questModel.find().select("-examId");
//         res.json({ message: "success", quests });
//     } catch (error) {
//         if (!res.headersSent) {
//             res.status(500).json({
//                 message: "Error: An error occurred while fetching questions.",
//                 error,
//             });
//         }
//     }
// };

const getAllQuestBydoctor = async(req, res) => {
    try {
        const { CrseId } = req.query;

        if (!CrseId) {
            return res.status(400).json({ message: "CrseId is required" });
        }

        const quests = await questModel.find({ CrseId }).select("-CrseId");
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


const showContent = async(req, res) => {
    const currentTime = new Date();
    console.log(currentTime);

    const { CrseId } = req.query;

    try {
        if (!CrseId) {
            return res.status(400).json({ message: "CrseId is required" });
        }

        const questions = await questModel
            .find({
                CrseId,
                startTime: { $lte: currentTime }
            })
            .select("-correctAnswer");

        res.json({
            message: "Success",
            questions: questions.map((q) => ({
                question: q.question,
                options: q.options,
            })),
        });
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

// const showContent = async(req, res) => {

//     const currentTime = new Date();
//     console.log(currentTime)
//     try {
//         if (questModel) {
//             const { CrseId } = req.query;

//             if (!CrseId) {
//                 return res.status(400).json({ message: "CrseId is required" });
//             }


//             const questions = await questModel.find({
//                 startTime: { $lte: currentTime },

//             }).select("-correctAnswer -CrseId");
//             // const questions = await questModel.find().select("-correctAnswer  -examId ");
//             res.send(questions.map(q => ({ question: q.question, options: q.options })));
//             res.json({ message: 'Success', questions });
//         } else {
//             res.json({ message: 'question not found' });


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