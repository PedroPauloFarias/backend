
const express = require('express');


const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];


const app = express();


app.use(express.json());


app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});


const tarefasRouter = express.Router();

tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});


tarefasRouter.post('/', (req, res) => {
  const { nome, concluida } = req.body;
  const novoId = tarefas.length ? tarefas[tarefas.length - 1].id + 1 : 1;

  const novaTarefa = {
    id: novoId,
    nome,
    concluida: concluida === undefined ? false : concluida
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});


tarefasRouter.get('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === tarefaId);

  if (!tarefa) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  res.json(tarefa);
});


tarefasRouter.put('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const { nome, concluida } = req.body;

  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);
  if (tarefaIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  if (nome !== undefined) tarefas[tarefaIndex].nome = nome;
  if (concluida !== undefined) tarefas[tarefaIndex].concluida = concluida;

  res.json(tarefas[tarefaIndex]);
});


tarefasRouter.delete('/:tarefaId', (req, res) => {
  const tarefaId = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === tarefaId);

  if (tarefaIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});


app.use('/tarefas', tarefasRouter);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});


module.exports = app;
