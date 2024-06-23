import AnswerModel from "../../../databases/models/answer.model.js";
import { questModel } from "../../../databases/models/quest.model.js";
import { userModel } from "../../../databases/models/userSchema.js";
const AddAnswer = async(req, res) => {
    const { selectAnswer, questID, userId } = req.body;
    let answer = await AnswerModel.findOne({ questID });
    if (answer) {
        res.json({ message: "quest already found" });
    } else {
        const answers = await AnswerModel.insertMany({
            selectAnswer,
            questID,
            userId,
        });
        res.json({ message: "success", answers });
    }
};

const AddAnswers = async(req, res) => {
    const { selectAnswer, questID } = req.body;
    const { userId } = req.params;

    if (!selectAnswer || !questID || !userId) {
        return res
            .status(400)
            .json({ message: "selectAnswer, questID, and userId are required." });
    }

    try {
        let answer = await AnswerModel.findOne({ questID, userId });
        if (answer) {
            return res
                .status(400)
                .json({
                    message: "Answer already submitted for this question by the user",
                });
        }

        const newAnswer = new AnswerModel({ selectAnswer, questID, userId });
        await newAnswer.save();

        res.json({ message: "Success", answer: newAnswer });
    } catch (error) {
        console.error("Error adding answer:", error);
        res.status(500).json({ message: "Error adding answer", error });
    }
};

const getMyAnswers = async(req, res) => {
    const userId = req.body.userId;
    const { courseId } = req.query;

    if (!userId || !courseId) {
        return res
            .status(400)
            .json({
                message: "Invalid request. User ID and course ID are required.",
            });
    }

    try {
        // Log input parameters
        console.log(`userId: ${userId}, courseId: ${courseId}`);

        const answers = await AnswerModel.find({ userId })
            .populate({
                path: "questID",
                match: { CrseId: courseId },
                select: "question CrseId",
                populate: {
                    path: "CrseId",
                    select: "courseName",
                },
            })
            .populate("userId", "name");

        // Log retrieved answers
        console.log(`Retrieved answers: ${JSON.stringify(answers, null, 2)}`);

        // Filter out answers with null questID (when courseId doesn't match)
        const filteredAnswers = answers.filter((answer) => answer.questID !== null);

        // Log filtered answers
        console.log(
            `Filtered answers: ${JSON.stringify(filteredAnswers, null, 2)}`
        );

        if (!filteredAnswers) {
            return res
                .status(404)
                .json({ message: "No answers found for the specified course." });
        }

        res.json({ message: "success", answers: filteredAnswers });
    } catch (error) {
        // Log error
        console.error(`Error fetching answers: ${error}`);
        res.status(500).json({ message: "Error fetching answers", error });
    }
};
// const getMyAnswers = async(req, res) => {
//     const { userId } = req.body;
//     const { courseId } = req.query;

//     try {
//         if (!courseId) {
//             return res.status(400).json({ message: "courseId is required" });
//         }

//         const answers = await AnswerModel.find({ userId }).populate({
//             path: "questID",
//             match: { CrseId: courseId },
//         });
//         console.log(answers);

//         // const filteredAnswers = answers.filter(
//         //     (answer) => answer.questID !== null
//         // );
//         // if (filteredAnswers.length === 0) {
//         //     return res
//         //         .status(404)
//         //         .json({ message: "No answers found for the specified course." });
//         // }

//         res.json({ message: "success", answers: answers });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error retrieving answers", error });
//     }
// };

// const getAnswers = async(req, res) => {
//     const doctorId = req.user._id; // assuming the doctor ID is available in the request
//     const questions = await questModel.find({ user: doctorId }); // retrieve questions added by the doctor
//     const correctAnswers = questions.map(q => q.correctAnswer);
//     const studentId = req.query.studentId; // assuming the student ID is passed as a query parameter
//     const studentAnswers = await AnswerModel.find({ user: studentId, quest: { $in: questions } }); // retrieve answers submitted by the student for the doctor's questions
//     res.send({ correctAnswers, studentAnswers });
// };

const getAnswers = async(req, res) => {
    const doctorId = req.body.userId; // Ensure the doctor ID is available in the request
    const { courseId } = req.query; // Assume the course ID is passed as a query parameter

    if (!doctorId || !courseId) {
        return res
            .status(400)
            .json({
                message: "Invalid request. Doctor ID and course ID are required.",
            });
    }

    try {
        // Retrieve questions added by the doctor for the specific course
        const questions = await questModel.find({
            user: doctorId,
            CrseId: courseId,
        });

        if (!questions.length) {
            return res
                .status(404)
                .json({ message: "No questions found for the specified course." });
        }

        const correctAnswers = questions.map((q) => ({
            questionId: q._id,
            correctAnswer: q.correctAnswer,
        }));

        // Retrieve all student answers for the doctor's questions
        const studentAnswers = await AnswerModel.find({
                questID: { $in: questions.map((q) => q._id) },
            })
            .populate("questID", "question")
            .populate("userId", "name");

        // Calculate grades
        const grades = studentAnswers.map((answer) => {
            const correctAnswer = correctAnswers.find((ca) =>
                ca.questionId.equals(answer.questID._id)
            );
            const isCorrect = correctAnswer.correctAnswer === answer.selectAnswer;
            return {
                student: answer.userId.name,
                question: answer.questID.question,
                selectedAnswer: answer.selectAnswer,
                isCorrect,
                grade: isCorrect ? "Correct" : "Incorrect",
            };
        });

        res.json({ message: "success", grades });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student grades", error });
    }
};

const checkAnswer = async(req, res) => {
    try {
        const doctorId = req.query.doctorId; // assuming the doctor ID is passed as a query parameter
        const studentId = req.user.id; // assuming the student ID is available in the request

        if (!doctorId || !studentId) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const questions = await questModel.find({ user: doctorId }); // retrieve questions added by the doctor
        const studentAnswers = await AnswerModel.find({
            user: studentId,
            quest: { $in: questions },
        }); // retrieve answers submitted by the student for the doctor's questions

        const correctAnswers = questions.map((q) => q.correctAnswer);
        const result = studentAnswers.map((answer, index) => {
            return answer.selectAnswer === correctAnswers[index];
        });

        res.send(result);
    } catch (error) {
        res.status(500).json({ message: "Error checking answers.", error });
    }
};

// const getAnswer = async(req, res) => {
//     const { _id } = req.body
//     let answer = await AnswerModel.find({ _id })
//     res.json({ message: 'success', answer })
// }

const updateAnswer = async(req, res) => {
    const questID = await questModel.findById();
    const { selectAnswer } = req.body;
    const studentId = req.user.id;

    if (!questID || !selectAnswer) {
        return res.status(400).json({ message: "Invalid request" });
    }

    const quest = await questModel.findById(questID);
    if (!quest) {
        return res.status(404).json({ message: "Question not found" });
    }

    const answer = await AnswerModel.findOne({ quest: questID, user: studentId });
    if (!answer) {
        return res.status(404).json({ message: "Answer not found" });
    }

    answer.selectAnswer = selectAnswer;
    await answer.save();

    res.json({ message: "Answer updated successfully", answer });
};

const deleteAnswer = async(req, res) => {
    const { _id } = req.body;
    let answer = await AnswerModel.findByIdAndDelete({ _id });
    res.json({ message: "success" });
};

export {
    getMyAnswers,
    AddAnswer,
    deleteAnswer,
    updateAnswer,
    checkAnswer,
    getAnswers,
    AddAnswers,
};