const readline = require("readline-sync");
const controlador = require('./controlador');

async function menu() {
        console.log("1- Adicionar contato");
        console.log("2- Buscar contato");
        console.log("3- Atualizar contato");
        console.log("4- Remover contato");
        console.log("5- Sair");
}

   async function escolherOpcao(opcao) {
     switch (opcao) { 
       case '1': {
         const nome = readline.question('Nome da tarefa: ');
         const tarefa = await controlador.adicionarTarefa(nome);
         console.log('Tarefa adicionada com id:', tarefa.id);
         break;
       }
       case '2': {
         const nome = readline.question('Nome da tarefa para buscar: ');
         const tarefa = await controlador.buscarTarefa(nome);
         if (!tarefa || !tarefa.id) {
           console.log('Tarefa não encontrada.');
         } else {
           console.log('Tarefa encontrada:');
           console.log('ID:', tarefa.id);
           console.log('Nome:', tarefa.nome);
           console.log('Concluída:', tarefa.concluida);
         }
         break;
       }
       case '3': {
         const nome = readline.question('Nome da tarefa a atualizar: ');
         const concluidaResp = readline.question('Concluída? (true/false): ');
         const tarefa = await controlador.atualizarTarefa(nome, concluidaResp);
         if (!tarefa) {
           console.log('Tarefa não encontrada para atualizar.');
         } else {
           console.log('Tarefa atualizada com sucesso. Novo estado:', tarefa.concluida);
         }
         break;
       }
       case '4': {
         const nome = readline.question('Nome da tarefa a remover: ');
         const sucesso = await controlador.removerTarefa(nome);
         if (sucesso) {
           console.log('Tarefa removida com sucesso.');
         } else {
           console.log('Tarefa não encontrada para remoção.');
         }
         break;
       }
       case '5': {
         console.log('Saindo...');
         process.exit(0);
       }
       default:
         console.log('Opção inválida.');
     }
   }
   
   async function main() {
     while (true) {
       menu();
       const opcao = readline.question('Escolha uma opcao: ');
       await escolherOpcao(opcao); 
     }
   }
   
main();