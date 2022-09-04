require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));
// require('./configs/db.config.js').initDb(mongoose, { name: 'mongoose' });
const db = require('./models/index');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.use(express.static('public'));
app.use('/api', require('./routes/creditCards.routes'));

app.get('/health', (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  });
});
app.use(function onError(err, req, res, _next) {
  res.status(500).send(JSON.stringify(err));
});

module.exports = { app };
