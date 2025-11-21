const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let userId = null;
let token = null;

describe("Testes para o recurso /usuarios", () => {
  it("deve retornar status 200 ao acessar GET /usuarios", async () => {
    const res = await request.get("/usuarios");
    expect(res.statusCode).toBe(200);
  });

  it("deve criar um usuário e retornar 201 com JSON", async () => {
    const res = await request
      .post("/usuarios")
      .send({ email: "usuario@email.com", senha: "abcd1234" });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.email).toBe("usuario@email.com");

    userId = res.body._id;
  });

  it("deve retornar 422 se não enviar JSON", async () => {
    const res = await request.post("/usuarios");
    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  it("deve retornar 200 e token ao logar com credenciais válidas", async () => {
    const res = await request
      .post("/usuarios/login")
      .send({ usuario: "usuario@email.com", senha: "abcd1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it("deve retornar 401 se não enviar JSON no login", async () => {
    const res = await request.post("/usuarios/login");
    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  it("deve renovar token com token válido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("deve retornar 401 se token inválido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Token inválido");
  });

  it("deve deletar usuário com token válido e retornar 204", async () => {
    const res = await request
      .delete(`/usuarios/${userId}`)
      .set("authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });
});
