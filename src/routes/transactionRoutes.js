const express = require('express');
const {
  createTransactionHandler,
  getTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getAllTransactionsHandler
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/', createTransactionHandler);

router.get('/:transactionId', getTransactionHandler);

router.put('/:transactionId', updateTransactionHandler);

router.delete('/:transactionId', deleteTransactionHandler);

router.get('/', getAllTransactionsHandler);

module.exports = router;
