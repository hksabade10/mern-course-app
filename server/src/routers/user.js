const express = require('express');

const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

const getUserWithCourses = async (user) => {

    await user.populate('enrolledCourses');

    const courses = user.enrolledCourses;

    const result = courses.map(course => {    
        return {name: course.name, course_id: course.course_id, faculty: course.faculty_name, description: course.description}
    })

    return { 
        name: user.name,
        username: user.username,
        email: user.email,
        age: user.age,
        city: user.city,
        state: user.state,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        enrolledCourses: result
    }

}


router.post('/users/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        const responseUser = await getUserWithCourses(user);

        res.status(201).send({user: responseUser, token});

    } catch(error) {
        console.log(error);
        res.status(500).send(error); 
    }
});


router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();

        const responseUser = await getUserWithCourses(user);

        res.send({user: responseUser, token});
    } catch (error) {
        if(error.message == "Unable to Login")
            return res.status(401).send(error);

        console.log(error);
        res.status(500).send(error);
    }

});


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
});


router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
});


router.get('/users/me', auth, async (req, res) => {

    try {

        const responseUser = await getUserWithCourses(req.user);
        res.send(responseUser);

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
});


router.get('/users/:id', async (req, res) => {
    
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        
        if(!user) {
            return res.status(404).send();
        }
        res.send({name: user.name, username: user.username});

    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }

});


router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'city', 'state', 'password'];
    const isUpdateAllowed = updates.every(update => allowedUpdates.includes(update));

    if(!isUpdateAllowed)
        return res.status(400).send({error: 'Invalid Update!'});

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();

        const responseUser = await getUserWithCourses(req.user);        
        res.send(responseUser);

    } catch (error) {
        console.log(error);
        res.status(500).send({error: "temp"});
    }
});


router.delete('/users/me', auth, async (req, res) => {
    
    try {
        await req.user.remove();
        res.send(req.user);

    } catch(error) {
        console.log(error);
        res.status(500).send();
    }

});


module.exports = router;