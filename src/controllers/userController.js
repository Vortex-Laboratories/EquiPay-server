const { createUser, getUserProfile, getAllUsers } = require('../models/userModel');


const createUserHandler = async (req, res) => {
  const { userId, email, name, currency } = req.body;
  try {
    const userData = { userId, email, name, currency };
    const createdUser = await createUser(userData);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await getUserProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
  getUserHandler,
  getAllUsersHandler
};
