const Stories = require('../models/blogStories')

const allStories = async (req, res) => {
    try {
        const stories = await Stories.find()
        res.status(200).json({success:true, stories})
    } catch (error) {
        console.log(error);
        res.json({error})
    }

    // res.send('All')
}

const singleStory = async (req, res) => {
    const { storyId} = req.params
    try {
        const story = await Stories.findById({_id: storyId})
        res.status(200).json({success:true, story})
    } catch (error) {
        console.log(error);
        res.json({error}) 
    }
}

module.exports = {allStories, singleStory}