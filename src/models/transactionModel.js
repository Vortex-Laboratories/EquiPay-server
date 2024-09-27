const db = require('../config/firebase');
const admin = require('firebase-admin');

const transactionModel = {
  transactionId: '',
  name: '',
  type: 'FULL',
  date: admin.firestore.FieldValue.serverTimestamp(),
  totalAmount: 0,
  paidAmount: 0
};

const createTransaction = async (transactionData) => {
  try {
    const transactionRef = db.collection('transactions').doc();
    const transactionId = transactionRef.id;

    const newTransaction = {
      ...transactionModel,
      transactionId,
      ...transactionData,
      date: admin.firestore.FieldValue.serverTimestamp() 
    };

    await transactionRef.set(newTransaction);

    const doc = await transactionRef.get();
    const savedTransaction = doc.data();

    if (savedTransaction.date && savedTransaction.date._seconds) {
      savedTransaction.date = new Date(savedTransaction.date._seconds * 1000 + savedTransaction.date._nanoseconds / 1000000);
    }

    return savedTransaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
};

const getTransaction = async (transactionId) => {
  try {
    const transactionRef = db.collection('transactions').doc(transactionId);
    const doc = await transactionRef.get();
    if (!doc.exists) {
      throw new Error('Transaction not found');
    }
    const data = doc.data();


    if (data.date && data.date._seconds) {
      data.date = new Date(data.date._seconds * 1000 + data.date._nanoseconds / 1000000);
    }

    return data;
  } catch (error) {
    throw new Error(`Error fetching transaction: ${error.message}`);
  }
};

const updateTransaction = async (transactionId, transactionData) => {
  try {
    const transactionRef = db.collection('transactions').doc(transactionId);
    await transactionRef.update(transactionData);
    return { transactionId, ...transactionData };
  } catch (error) {
    throw new Error(`Error updating transaction: ${error.message}`);
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const transactionRef = db.collection('transactions').doc(transactionId);
    await transactionRef.delete();
    return { message: 'Transaction deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting transaction: ${error.message}`);
  }
};

const getAllTransactions = async () => {
  try {
    const transactionsSnapshot = await db.collection('transactions').get();
    const transactions = [];
    transactionsSnapshot.forEach(doc => {
      const transaction = doc.data();
      if (transaction.date && transaction.date._seconds) {
        transaction.date = new Date(transaction.date._seconds * 1000 + transaction.date._nanoseconds / 1000000);
      }
      transactions.push(transaction);
    });
    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions: ${error.message}`);
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions
};
