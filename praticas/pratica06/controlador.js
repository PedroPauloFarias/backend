const Tarefa = require('./modelo');
//const Tarefa = require('./tarefa');



async function adicionarTarefa(nome){
  
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();

}

async function buscarTarefa(nome){
  
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}

async function atualizarTarefa(nome, concluida){
  const tarefa = new Tarefa(nome)
  await tarefa.init();
  const encontrada = await tarefa.buscar(); 
  if (!encontrada) {
    return null; 
  }
  tarefa.nome = nome;
  tarefa.concluida = (concluida === 'true' || concluida === true); 
  const resultado = await tarefa.alterar(); 
  return tarefa;
}

async function removerTarefa(nome){
    
  const tarefa = new Tarefa(nome);

 await tarefa.init();
  const encontrada = await tarefa.buscar(); 
  if (!encontrada) {
    return null;
  }
  const resultado = await tarefa.deletar(); 
  return resultado.deletedCount > 0;
}

module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa
};