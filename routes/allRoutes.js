const router = require('express').Router();

const {allStories, singleStory} = require('../controller/allController');


router.get('/api/v1/All', allStories)
router.get('/api/v1/All/:storyId', singleStory)

module.exports = router