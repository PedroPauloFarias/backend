var tarefaRouter = require('./routes/tarefaRouter');

var express = require('express');
var app = express();

app.use(express.json());

app.use('/tarefas', tarefaRouter);

module.exports = app;