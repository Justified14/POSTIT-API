const mongoose = require('mongoose');
const {isEmail} = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const blogUser = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: [true, 'This email is already in use'],
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: [6, 'The minimum password length is 6']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    }
}, {timestamps: true});


blogUser.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

blogUser.methods.generateToken = function (){
    return jwt.sign ({userId: this._id, name: this.name}, process.env.JWT_SECRET, { expiresIn: '3d'})
};

blogUser.methods.comparePassword = async function(userPassword){
    const isCorrect = await bcrypt.compare(userPassword, this.password)
    return isCorrect;
};

module.exports = mongoose.model('User', blogUser);