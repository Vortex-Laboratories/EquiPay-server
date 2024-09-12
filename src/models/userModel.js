const db = require('../config/firebase');


const createUser = async (userData) => {
  try {
    const userRef = db.collection('users').doc(userData.userId); 
    await userRef.set(userData); 
    return userData; 
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};


const getUserProfile = async (userId) => {
  try {
    const userRef = db.collection('users').doc(userId); 
    const doc = await userRef.get();
    if (!doc.exists) {
      throw new Error('User not found'); 
    }
    return doc.data(); 
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};


const getAllUsers = async () => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    usersSnapshot.forEach(doc => users.push(doc.data()));
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserProfile,
  getAllUsers
};
