const { MongoClient } = require("mongodb");

const url = `mongodb+srv://pedro:<12345ab>@cluster0.c4aa1fs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function conectarDb() {
  try {
   
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }

    const db = client.db("agenda");
    console.log("Conectado ao MongoDB");
    return db;
  } catch (e) {
    console.log("Erro ao conectar no MongoDB:", e.message);
  }
}

module.export = conectarDb;