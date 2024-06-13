import AnswerModel from "../../../databases/models/answer.model.js"
import { questModel } from "../../../databases/models/quest.model.js"
import { userModel } from "../../../databases/models/userSchema.js"
const AddAnswer = async(req, res) => {

    const { selectAnswer, questID } = req.body
    let answer = await AnswerModel.findOne({ questID })
    if (answer) {
        res.json({ message: 'quest already found' })
    } else {

        const answers = await AnswerModel.insertMany({ selectAnswer, questID })
        res.json({ message: 'success', answers })
    }


}



const AddAnswers = async(req, res) => {
    const { quest, selectedAnswer } = req.body; // quest is questionId

    if (!req.user) {
        return res.status(401).json({ message: 'You must be logged in to submit an answer' });
    }

    if (!quest || !selectedAnswer) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const question = await questModel.findById(quest);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        if (!question.options.includes(selectedAnswer)) {
            return res.status(400).json({ message: 'Invalid answer' });
        }

        const existingAnswer = await AnswerModel.findOne({ questID: quest, user: req.user._id });
        if (existingAnswer) {
            return res.status(400).json({ message: 'You have already submitted an answer for this question' });
        }

        const answer = new AnswerModel({
            selectAnswer: selectedAnswer,
            questID: quest,
            user: req.user._id
        });

        await answer.save();

        // Send the answer to the doctor
        const doctor = await userModel.findOne({ isAdmin: 'doctor' });
        if (doctor) {
            // Implement your logic to send the answer to the doctor
        }

        res.json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting answer', error });
    }
};


// const getMyAnswers = async(req, res) => {
//     const userId = req.user.id;

//     if (!userId) {
//         return res.status(400).json({ message: 'Invalid request' });
//     }

//     const answers = await AnswerModel.find({ user: userId });

//     if (!answers) {
//         return res.status(404).json({ message: 'No answers found' });
//     } else {
//         res.json({ message: 'success', answers });

//     }

// }

const getMyAnswers = async(req, res) => {
    const userId = req.user && req.user.id; // Ensure user is authenticated

    if (!userId) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const answers = await AnswerModel.find({ user: userId }).populate('questID', 'question');

        if (!answers.length) {
            return res.status(404).json({ message: 'No answers found' });
        }

        res.json({ message: 'success', answers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching answers', error });
    }
};

const getAnswers = async(req, res) => {
    const doctorId = req.user._id; // assuming the doctor ID is available in the request
    const questions = await questModel.find({ user: doctorId }); // retrieve questions added by the doctor
    const correctAnswers = questions.map(q => q.correctAnswer);
    const studentId = req.query.studentId; // assuming the student ID is passed as a query parameter
    const studentAnswers = await AnswerModel.find({ user: studentId, quest: { $in: questions } }); // retrieve answers submitted by the student for the doctor's questions
    res.send({ correctAnswers, studentAnswers });
};

const checkAnswer = async(req, res) => {
    try {
        const doctorId = req.query.doctorId; // assuming the doctor ID is passed as a query parameter
        const studentId = req.user.id; // assuming the student ID is available in the request

        if (!doctorId || !studentId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const questions = await questModel.find({ user: doctorId }); // retrieve questions added by the doctor
        const studentAnswers = await AnswerModel.find({ user: studentId, quest: { $in: questions } }); // retrieve answers submitted by the student for the doctor's questions

        const correctAnswers = questions.map(q => q.correctAnswer);
        const result = studentAnswers.map((answer, index) => {
            return answer.selectAnswer === correctAnswers[index];
        });

        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'Error checking answers.', error });
    }
};

// const getAnswer = async(req, res) => {
//     const { _id } = req.body
//     let answer = await AnswerModel.find({ _id })
//     res.json({ message: 'success', answer })
// }



const updateAnswer = async(req, res) => {
    const questID = await questModel.findById()
    const { selectAnswer } = req.body;
    const studentId = req.user.id;

    if (!questID || !selectAnswer) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const quest = await questModel.findById(questID);
    if (!quest) {
        return res.status(404).json({ message: 'Question not found' });
    }

    const answer = await AnswerModel.findOne({ quest: questID, user: studentId });
    if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
    }

    answer.selectAnswer = selectAnswer;
    await answer.save();

    res.json({ message: 'Answer updated successfully', answer });
}


const deleteAnswer = async(req, res) => {
    const { _id } = req.body
    let answer = await AnswerModel.findByIdAndDelete({ _id })
    res.json({ message: 'success' })
}



export {
    getMyAnswers,
    AddAnswer,
    deleteAnswer,
    updateAnswer,
    checkAnswer,
    getAnswers,
    AddAnswers,

}