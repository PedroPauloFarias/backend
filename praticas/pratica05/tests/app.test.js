const request = require('supertest');
const app = require('../app');

let tarefaId;
describe('Testes da API de tarefas', () => {
  
  test('GET /tarefas deve retornar status 200 e JSON', async () => {
    const response = await request(app).get('/tarefas');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('POST /tarefas deve criar uma tarefa e retornar status 201 com JSON', async () => {
    const novaTarefa = { nome: "Estudar Node", concluida: false };
    const response = await request(app)
      .post('/tarefas')
      .send(novaTarefa);
    
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeDefined();
    
    tarefaId = response.body.id; 
  });

  test('GET /tarefas/:id deve retornar status 200 e JSON', async () => {
    const response = await request(app).get(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('GET /tarefas/1 deve retornar status 404 e JSON', async () => {
    const response = await request(app).get('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('PUT /tarefas/:id deve atualizar tarefa e retornar status 200 e JSON', async () => {
    const atualizacao = { nome: "Estudar Node e Express", concluida: true };
    const response = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send(atualizacao);
    
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('PUT /tarefas/1 deve retornar status 404 e JSON', async () => {
    const atualizacao = { nome: "Estudar Node e Express", concluida: true };
    const response = await request(app)
      .put('/tarefas/1')
      .send(atualizacao);
    
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('DELETE /tarefas/:id deve retornar status 204 sem conteúdo', async () => {
    const response = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('DELETE /tarefas/1 deve retornar status 404 e JSON', async () => {
    const response = await request(app).delete('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
  });

});
