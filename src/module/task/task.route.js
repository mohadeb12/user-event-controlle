const express = require('express');
const router = express.Router();
const {eventCreateController,getMyEventController,updateEventController,deleteEventController} = require('./task.controller');
const {authouserCheck,authAdminCheck} = require('../../middleware/authoUserCheck')


router.post('/create',authouserCheck,eventCreateController);
router.get('/my-events',authouserCheck,getMyEventController);
router.put('/:id',authouserCheck,updateEventController);
router.delete('/:id',authouserCheck,deleteEventController);

module.exports = router;