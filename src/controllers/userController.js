const { createUser, getUserProfile } = require('../models/userModel');


const createUserHandler = async (req, res) => {
  try {
    const userData = req.body; 
    const newUser = await createUser(userData); 
    res.status(201).json(newUser); 
  } catch (error) {
    if (error.message === 'Email already exists') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message }); 
    }
  }
};


const getUserHandler = async (req, res) => {
  try {
    const { userId } = req.params; 
    const user = await getUserProfile(userId); 
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
};

module.exports = {
  createUserHandler,
  getUserHandler,
};
