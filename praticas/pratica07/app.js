require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');


const produtosRouter = require('./routes/produtosRouter');

const app = express();

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;


mongoose
  .connect(url)
  .then(() => console.log(" Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar com MongoDB:", err.message));


  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

app.use('/produtos', produtosRouter);

module.exports = app;
