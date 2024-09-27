const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); 

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Equipay Backend API');
});


module.exports = app;