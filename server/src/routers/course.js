const express = require('express');
const mongoose = require('mongoose')

const Course = require('../models/course');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/courses/create', auth, async (req, res) => {

    const course = new Course({
        ...req.body,
        faculty: req.user._id,
        faculty_name: req.user.name
    })

    try {
        await course.save();
        res.status(201).send(course);

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }

});


router.get('/courses/my', auth, async (req, res) => {

    const match = {};

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    };

    const sort = {};

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'courses',
            match,
            options: {
                limit: parseInt(req.query.limit) || null,
                skip: parseInt(req.query.skip) || null,
                sort
            }
        });

        const result = req.user.courses.map(course => {
            
            return {name: course.name, course_id: course.course_id, faculty: course.faculty_name, description: course.description}
        })

        res.send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.post('/courses/enroll/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {

        const course = await Course.findOne({course_id: id});

        if(!course)
            return res.status(404).send();

        const user_id = new mongoose.Types.ObjectId(req.user._id)
        
        if(course.enrollee.includes(user_id))
            return res.status(400).send();
        
        course.enrollee.push(user_id);
        await course.save();
            
        req.user.courses_enrolled = req.user.courses_enrolled.concat(new mongoose.Types.ObjectId(course._id));
        await req.user.save();

        res.send(course);

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.delete('/courses/drop/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {

        const course = await Course.findOne({course_id: id});

        if(!course)
            return res.status(404).send();

        const user_id = new mongoose.Types.ObjectId(req.user._id)
        
        if(!course.enrollee.includes(user_id))
            return res.status(400).send();
        
        course.enrollee = course.enrollee.filter(id => id !== user_id);
        await course.save();
            
        req.user.courses_enrolled = req.user.courses_enrolled.filter(id => id !== course._id);
        await req.user.save();

        res.send(course);

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.get('/courses/enrolled', auth, async (req, res) => {

    try {

        await req.user.populate('enrolledCourses');

        const courses = req.user.enrolledCourses;

        const result = courses.map(course => {
            
            return {name: course.name, course_id: course.course_id, faculty: course.faculty_name, description: course.description}
        })

        res.send(result);

    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/courses/:id', async (req, res) => {
    const id = req.params.id;

    try {

        const course = await Course.findOne({id}).populate('author');

        if(!course)
            return res.status(404).send();

        res.send({name: course.name, course_id: course.course_id, faculty: course.author.name, description: course.description});

    } catch(error) {
        res.status(500).send(error);
    }
});


router.get('/courses', auth, async (req, res) => {

    const searchTerm = req.query.search;

    try {
        const courses = await Course.find({});

        if(!courses)
            return res.status(404).send();

        let filteredCourses = courses;
        if(searchTerm) {
            filteredCourses = courses.filter((course) => {
                return course.course_id.toString().includes(searchTerm.toLowerCase()) || 
                        course.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
        }

        const result = filteredCourses.map(course => {
            return {name: course.name, course_id: course.course_id, faculty: course.faculty_name, description: course.description}
        });

        res.send(result);

    } catch(error) {
        res.status(500).send(error);
    }
});


module.exports = router;