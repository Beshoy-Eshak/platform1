import { questModel } from "../../../databases/models/quest.model.js"

const AddQuest = async(req, res) => {
    const { questions, startTime, endTime } = req.body;
    try {
        // let quest = await questModel.findOne({ question });
        // if (quest) {
        //     res.json({ message: 'Question already exists' });
        // } else {
        const q = await questModel.insertMany(questions, startTime, endTime);
        res.json({ message: 'Success', questions: q });
        // }

    } catch (error) {
        res.status(500).json({ message: "Error adding exam", error });
    }

};


const getAllQuestBydoctor = async(req, res) => {
    try {
        const quests = await questModel.find();

        res.json({ message: "success", quests });
    } catch (error) {
        res.status(500).json({
            message: "Error: An error occurred while fetching questions.",
            error,
        });
    }
};



// const getContent = async(req, res) => {
//     const { _id } = req.body
//     let quest = await questModel.find({ _id })
//     res.json({ message: 'success', quest })
// }

const showContent = async(req, res) => {
    // const currentTime = new Date();

    if (questModel) {


        // const questions = await questModel.find({
        //     startTime: { $lte: currentTime },
        //     endTime: { $gte: currentTime },
        // }).select("-correctAnswer");
        const questions = await questModel.find().select("-correctAnswer");
        res.send(questions.map(q => ({ question: q.question, options: q.options })));
        res.json({ message: 'Success', questions });
    } else {
        res.json({ message: 'question not found' });


    }
};



const updateQuest = async(req, res) => {
    const { _id, questions, startTime, endTime } = req.body;
    let quest = await questModel.findByIdAndUpdate({ _id }, { questions, startTime, endTime });
    if (quest) {
        res.json({ message: 'success', quest });
    } else {
        res.json({ message: 'course not found' });
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