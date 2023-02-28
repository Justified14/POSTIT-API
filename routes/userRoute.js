const router = require('express').Router();
const {deleteStory, updateStory,getStories,getStory, getStoriesCB, createStory} = require('../controller/userController');


router.route('/').get(getStories).post(createStory)
router.route('/:StoryId').get(getStory).patch(updateStory).delete(deleteStory)


module.exports = router