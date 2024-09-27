const db = require('../config/firebase'); 

const userModel = {
  userId: '',
  name: '',
  email: ''
};

const checkEmailExists = async (email) => {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('email', '==', email).get();

  if (!snapshot.empty) {
    return true;
  }

  return false; 
};


const createUser = async (userData) => {
  try {
    const emailExists = await checkEmailExists(userData.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const userRef = db.collection('users').doc(); 
    const userId = userRef.id;  

  
    const newUser = {
      ...userModel, 
      userId,        
      ...userData    
    };

    await userRef.set(newUser);  
    return newUser; 
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


module.exports = {
  userModel,
  createUser,
  getUserProfile
};