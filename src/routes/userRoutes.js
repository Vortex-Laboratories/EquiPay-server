const express = require('express');
const { createUserHandler, getUserHandler } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUserHandler);

router.get('/:userId', getUserHandler);


module.exports = router;
