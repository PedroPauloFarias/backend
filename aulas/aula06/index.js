// 1. importar o framework 
const express = require ("express");
// 2. Criar uma insância da aplicação
const app = express();

const router = require('./router');

// middleware de aplicação
app.use((req, res, next) => {
    console.log("Passei pelo middleware de app");
    next();
});

// middleware de roteamento
const router = express.Router();


app.use('/tarefas', router);

// Criar um middleware de roteamento
app.get('/', (req, res) => {
    res.send("Olá");
});


// Criar um middleware de erro
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// 3. iniciar a aplicação
app.listen(3000, () => {
    console.log("App está On!");
})