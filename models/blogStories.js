const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    tag:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user']
    }, 
},{timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);