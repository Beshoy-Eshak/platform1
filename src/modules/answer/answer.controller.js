import AnswerModel from "../../../databases/models/answer.model.js"
import { questModel } from "../../../databases/models/quest.model.js"
import { userModel } from "../../../databases/models/userSchema.js"
const AddAnswer = async(req, res) => {

    const { selectAnswer, questID, userId } = req.body
    let answer = await AnswerModel.findOne({ questID })
    if (answer) {
        res.json({ message: 'quest already found' })
    } else {

        const answers = await AnswerModel.insertMany({ selectAnswer, questID, userId })
        res.json({ message: 'success', answers })
    }


}


const AddAnswers = async(req, res) => {
    const { selectAnswer, questID, userId } = req.body;

    try {

        let answer = await AnswerModel.findOne({ questID, userId });
        if (answer) {
            return res.status(400).json({ message: 'Answer already submitted for this question by the user' });
        }

        const newAnswer = new AnswerModel({ selectAnswer, questID, userId });
        await newAnswer.save();

        res.json({ message: 'Success', answer: newAnswer });
    } catch (error) {
        res.status(500).json({ message: 'Error adding answer', error });
    }
};





const getMyAnswers = async(req, res) => {
    const userId = req.body.userId;
    const { courseId } = req.query;

    if (!userId || !courseId) {
        return res.status(400).json({ message: 'Invalid request. User ID and course ID are required.' });
    }

    try {
        const answers = await AnswerModel.find({ userId })
            .populate({
                path: 'questID',
                match: { CrseId: courseId },
                select: 'question CrseId',
                populate: {
                    path: 'CrseId',
                    select: 'courseName'
                }
            })
            .populate('userId', 'name');

        // Filter out answers with null questID (when courseId doesn't match)
        const filteredAnswers = answers.filter(answer => answer.questID !== null);

        if (!filteredAnswers.length) {
            return res.status(404).json({ message: 'No answers found for the specified course.' });
        }

        res.json({ message: 'success', answers: filteredAnswers });
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