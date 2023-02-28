const blogUser = require('../models/blogUser');
const errorHandler = require('../middleware/errorHandler');


const signup = async (req, res) => {
    const {firstName, lastName, email, password, gender } = req.body;
    if (!firstName||!lastName||!email||!password||!gender) {
        res.status(400).json({sucess:false, message:'Please provide neccessary information'});
    }
    try {
        const blogger = await blogUser.create({...req.body})
        const token = blogger.generateToken();
        res.status(200).json({data: {firtsName: blogger.firstName, lastName: blogger.lastName, email: blogger.email, gender: blogger.gender}, token})
    } catch (error) {
        const errors = errorHandler(error)
        res.status(400).json({errors})  
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({sucess: false, message:'Please provide neccessary information'})
    }
    try {
        const blogger = await blogUser.findOne({email})
        if(!blogger){
            throw Error('User not registered yet');
        }
        const checked = await blogger.comparePassword(password)
        if(!checked) {
            throw Error('Invalid email or password');
        }
        const token = blogger.generateToken();
        res.status(200).json({data: {firtsName: blogger.firstName, lastName: blogger.lastName, email: blogger.email, gender: blogger.gender}, token})
    } catch (error) {
        console.log(error);
        res.json(error)
        
    }
    
};

module.exports = {login, signup}