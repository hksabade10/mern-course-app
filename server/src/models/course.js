const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_id: {
        type: Number,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    faculty_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    enrollee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

courseSchema.virtual('author', {
    ref: 'User',
    localField: 'faculty',
    foreignField: '_id',
    justOne: true
});



const Course = mongoose.model('Course', courseSchema);

module.exports = Course;