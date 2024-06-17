import { CourseModel } from "../../../databases/models/course.model.js"

const Addcourse = async(req, res) => {

    const { name, code, department, } = req.body
        // if (createdBy === 'doctor') {
    try {
        const course = await CourseModel.findOne({ code });
        if (course) {
            res.json({ message: 'Course already exists' });
        } else {
            const courses = await CourseModel.insertMany({ name, code, department });
            res.json({ message: 'Course added successfully', courses });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding course', error });
    }

}

// } else {
//     res.json({ message: 'not allowed' })


// }



const getAllcourses = async(req, res) => {
    // const userId = req.User._id; // افترض أن هذا هو معرّف المستخدم الحالي
    try {
        const courses = await CourseModel.find();
        res.json({ message: 'success', courses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

// const getCourses = async(req, res) => {

//     try {
//         const courses = await CourseModel.find();
//         res.json({ message: 'success', courses });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching courses', error });
//     }
// };



const getcourse = async(req, res) => {
    const { id } = req.params;

    try {
        const course = await CourseModel.findById(id);
        if (course) {
            res.json({ message: 'success', course });
        } else {
            res.json({ message: 'Course not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};


const updatecourse = async(req, res) => {
    const { _id, name, code, department } = req.body;
    // const userId = req.user._id; // افترض أن هذا هو معرّف المستخدم الحالي (الدكتور)

    try {
        const course = await CourseModel.findOneAndUpdate({ _id }, { name, code, department }, { new: true });
        // const course = await CourseModel.findOneAndUpdate({ _id, createdBy: userId }, { name, code, createdBy, department }, { new: true });

        if (course) {
            res.json({ message: 'success', course });
        } else {
            res.json({ message: 'Course not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};



// } else {
//     res.json({ message: 'not allowed' })


// }


const deletecourse = async(req, res) => {
    const { _id } = req.body;
    // const userId = req.user._id; // افترض أن هذا هو معرّف المستخدم الحالي (الدكتور)

    try {
        const course = await CourseModel.findOneAndDelete({ _id });
        // const course = await CourseModel.findOneAndDelete({ _id, createdBy: userId });
        if (course) {
            res.json({ message: 'success' });
        } else {
            res.json({ message: 'Course not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};

export default deletecourse;




export {
    getAllcourses,
    Addcourse,
    deletecourse,
    updatecourse,
    getcourse,
    // getCourses
}