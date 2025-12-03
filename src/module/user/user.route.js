const express = require('express');
const router = express.Router();
const {createUserController,loginUserController,getAllUserController} = require('./user.contorller');
const {authAdminCheck} = require('../../middleware/authoUserCheck')

router.post('/register', createUserController);
router.post('/login', loginUserController);
router.post('/get-all',authAdminCheck, getAllUserController);


module.exports = router;