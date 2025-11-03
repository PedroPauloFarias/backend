require('dotenv').config();
const express = require('express');


const usuariosRouter = require('./routes/usuariosRouter');
const produtosRouter = require('./routes/produtosRouter');

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API prática 08 funcionando corretamente!' });
});


app.use('/usuarios', usuariosRouter);


app.use('/produtos', produtosRouter);

module.exports = app;