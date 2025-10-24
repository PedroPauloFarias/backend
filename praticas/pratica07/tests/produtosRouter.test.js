const supertest = require("supertest");
const app = require('../app'); 
const request = require('supertest'); 


const url = "/produtos";

let id = null; 

describe("Testes do recurso /produtos", () => {

  
  test("POST /produtos deve retornar 201", async () => {
    const response = await request(app)
      .post(url)
      .send({ nome: "Laranja", preco: 10.0 });

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("Laranja");
    expect(response.body.preco).toBe(10.0);

    
    id = response.body._id;
  });

  
  test("POST /produtos sem JSON deve retornar 422", async () => {
    const response = await request(app)
      .post(url)
      .send({}); 

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });


  test("GET /produtos deve retornar 200 e um array de produtos", async () => {
    const response = await request(app).get(url);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });


  test("GET /produtos/:id deve retornar 200 e o produto criado", async () => {
    const response = await request(app).get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("Laranja");
    expect(response.body.preco).toBe(10.0);
  });

 
  test("GET /produtos/0 deve retornar 400", async () => {
    const response = await request(app).get(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  
  test("GET /produtos/000000000000000000000000 deve retornar 404", async () => {
    const response = await request(app).get(`${url}/000000000000000000000000`);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  
  test("PUT /produtos/:id deve retornar 200 e atualizar produto", async () => {
    const response = await request(app)
      .put(`${url}/${id}`)
      .send({ nome: "Laranja Pera", preco: 18.0 });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.nome).toBe("Laranja Pera");
    expect(response.body.preco).toBe(18.0);
  });

 
  test("PUT /produtos/:id sem JSON deve retornar 422", async () => {
    const response = await request(app)
      .put(`${url}/${id}`)
      .send({}); 

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios");
  });


  test("PUT /produtos/0 deve retornar 400", async () => {
    const response = await request(app).put(`${url}/0`).send({ nome: "Teste", preco: 1.0 });
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  test("PUT /produtos/000000000000000000000000 deve retornar 404", async () => {
    const response = await request(app)
      .put(`${url}/000000000000000000000000`)
      .send({ nome: "Teste", preco: 1.0 });
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

  
  test("DELETE /produtos/:id deve retornar 204", async () => {
    const response = await request(app).delete(`${url}/${id}`);
    expect(response.status).toBe(204);
  });


  test("DELETE /produtos/0 deve retornar 400", async () => {
    const response = await request(app).delete(`${url}/0`);
    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Parâmetro inválido");
  });

  test("DELETE /produtos/:id inexistente deve retornar 404", async () => {
    const response = await request(app).delete(`${url}/${id}`);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe("Produto não encontrado");
  });

});

