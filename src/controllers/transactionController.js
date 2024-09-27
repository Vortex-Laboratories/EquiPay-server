const {
    createTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactions
  } = require('../models/transactionModel');
  
  const createTransactionHandler = async (req, res) => {
    try {
      const transactionData = req.body;
      const newTransaction = await createTransaction(transactionData);
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getTransactionHandler = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transaction = await getTransaction(transactionId);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  const updateTransactionHandler = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const transactionData = req.body;
      const updatedTransaction = await updateTransaction(transactionId, transactionData);
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteTransactionHandler = async (req, res) => {
    try {
      const { transactionId } = req.params;
      const result = await deleteTransaction(transactionId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllTransactionsHandler = async (req, res) => {
    try {
      const transactions = await getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createTransactionHandler,
    getTransactionHandler,
    updateTransactionHandler,
    deleteTransactionHandler,
    getAllTransactionsHandler
  };