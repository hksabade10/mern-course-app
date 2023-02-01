const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(val) {
            if(!validator.isEmail(val))
                throw new Error("Email is invalid");
        }
    },
    courses_enrolled: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
    }],
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if(val < 0)
                throw new Error("Age must be a positive number");
        }
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});


userSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'faculty'
});

userSchema.virtual('enrolledCourses', {
    ref: 'Course',
    localField: 'courses_enrolled',
    foreignField: '_id'
});


userSchema.statics.findByCredentials = async (username, password) => {

    const user = await User.findOne({username});

    if(!user)
        throw new Error("Unable to Login");

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
        throw new Error("Unable to Login");

    return user;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismycourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// Hash the plain password before saving
userSchema.pre('save', async function(next) {

    const user = this;
    
    console.log('updating user');
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;