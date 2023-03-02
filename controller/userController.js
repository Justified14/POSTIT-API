const blogStories = require('../models/blogStories')
const errors = require('../middleware/another')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const createStory = async (req, res) => {
    const {tag, title, paragraph} = req.body
    req.body.createdby = req.user.userId
   
    if (!tag || !title || !paragraph){
        res.status(400).json({success: false, msg: 'Please provide necessary information'})
    }
   try {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {use_filename: true, folder: 'storyImages'}) 
    fs.unlinkSync(req.files.image.tempFilePath)
    req.body.image= result.secure_url
    const story = await blogStories.create({...req.body})
    res.status(201).json({success: true, story})
    
   } catch (error) {
    const errors = errors(error)
    res.json({errors})
   }
}

const getStories = async (req, res) => {
    try {
        const stories =await blogStories.find({createdby: req.user.userId});
        res.status(200).json({noOfJobs: stories.length, stories});
       } catch (error) {
        console.log(error);
        res.json({error})
       }
}

const getStory = async (req, res) => {
    const {StoryId} = req.params
    try {
        const story =await blogStories.findOne({ _id: StoryId, createdby: req.user.userId });
        if (!story){
            return res.status(404).json({success: false, message: 'Story not found'})
        }
        res.status(200).json({story});
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}

const updateStory = async (req, res) => {
    const { StoryId} = req.params
    const {tag, title, paragraph, image} = req.body
    try {
        const story =await blogStories.findOneAndUpdate({createdby: req.user.userId , _id: StoryId},  req.body, {new:true, runValidators: true,});
        
        res.status(200).json({story});
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}

const deleteStory = async (req, res) => {
    const {StoryId} = req.params
    try {
        const story =await blogStories.findOneAndDelete({createdby: req.user.userId , _id: StoryId});
        if(!story){
            res.status(404).json({message: 'Story not found'})
        }
        res.status(200).json({message: 'Story deleted successfully'})
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}


module.exports = {deleteStory, updateStory,getStories,getStory, createStory}