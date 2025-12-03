const express = require('express');
const router = express.Router();
const userRouters = require('./src/module/user/user.route');
const eventRouters = require('./src/module/task/task.route');


router.use('/user', userRouters);
router.use('/event', eventRouters );

module.exports = router;

