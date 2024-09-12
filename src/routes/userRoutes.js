const express = require('express');
const { createUserHandler, getUserHandler, getAllUsersHandler } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUserHandler);

router.get('/:userId', getUserHandler);

router.get('/', getAllUsersHandler);

module.exports = router;
