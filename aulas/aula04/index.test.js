// Aqui estão todos os test da calculadora 

import {soma, subtracao, multiplicacao, divisao} from "./index.js" // aqui é para "puxar" as funções

console.log("Teste da função()");

console.log("Teste da soma()");

if (soma(2,2) === 4) console.log ("Passou 1º!")
    else console.log("Falhou 1º");
if (soma(-1, 2) === 1) console.log ("Passou 2º!")
    else console.log ("Falhou 2º!");
if(soma(2, 0) === 2) console.log("Passou 3º!")
    else console.log("Falhou 3º !");

console.log("Teste da função subtração()");

if (subtracao(4, 2) === 2) console.log("Passou no 4º!")
    else console.log("Falhou 4º!")
if (subtracao(-2, 2) === -4) console.log("Passou no 5º!")
    else console.log("Falhou 5º!")
if (subtracao(-2, 0) === -2) console.log("Passou no 6º!")
    else console.log("Falhou 6º!")

console.log("Teste da função multiplicacao()");

if (multiplicacao(4, 2) === 8)console.log("Passou no 7º!")
    else console.log("Falhou 7º!")
if (multiplicacao(-2, 2) === -4)console.log("Passou no 8º!")
    else console.log("Falhou 8º!")
if (multiplicacao(-2, 0) === 0)console.log("Passou no 9º!")
    else console.log("Falhou 9º!")
if (multiplicacao(-2, -2) === 4)console.log("Passou no 10º!")
    else console.log("Falhou 10º!")

console.log("Teste da função divisao()");

if (divisao(4, 2) === 2)console.log("Passou no 11º!")
    else console.log("Falhou 11º!")
if (divisao(4, -2) === -2)console.log("Passou no 12º!")
    else console.log("Falhou 12º!")
if (divisao(4, 0) === undefined)console.log("Passou no 13º!")
    else console.log("Falhou 13º!")
if (divisao(10, 2) === 5)console.log("Passou no 14º!")
    else console.log("Falhou 14º");


