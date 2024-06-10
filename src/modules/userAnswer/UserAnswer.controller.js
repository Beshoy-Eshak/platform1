import AnswerModel from "../../../databases/models/answer.model.js";
import { questModel } from "../../../databases/models/quest.model.js";
// import { userSchema } from "../../../databases/models/userSchema";


// دالة للحصول على إجابة المستخدم
const getUserAnswer = async(req, res) => {
    try {
        const studentAnswer = await AnswerModel.findById(req.params.studentId);
        res.send(studentAnswer.selectAnswer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user answer.', error });
    }
};

// دالة للتحقق من الإجابات
const checkAnswer = async(req, res) => {
    try {
        const studentAnswers = await AnswerModel.findById(req.params.studentId);
        const questions = await questModel.find();
        const correctAnswers = questions.map(q => q.correctAnswer);
        const result = studentAnswers.selectAnswer.map((answer, index) => {
            return answer === correctAnswers[index];
        });
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: 'Error checking answers.', error });
    }
};



// const getUserAnswer = async(req, res) => {
//     const student = await AnswerModel.findById(req.params.studentId);
//     res.send(AnswerModel.selectAnswer);
// };

// // الطريق للتحقق من إجابات الطالب
// const checkAnswer = async(req, res) => {
//     const student = await AnswerModel.findById(req.params.studentId);
//     const questions = await questModel.find();

//     const correctAnswers = questions.map(q => q.correctAnswer);
//     const studentAnswers = AnswerModel.selectAnswer;

//     const result = studentAnswers.map((answer, index) => {
//         return answer === correctAnswers[index];
//     });

//     res.send(result);
// };

export {
    getUserAnswer,
    checkAnswer
}