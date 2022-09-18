import AppDataSource from "./data-source";
import app from "./app";

function initServer() {
  AppDataSource.initialize()
    .then(() => {
      console.log(`[DB] Banco de dados conectado com sucesso`);

      app.listen(process.env.APP_PORT, () => {
        console.log(
          `[APP] Servidor iniciado em http://localhost:${process.env.APP_PORT}`
        );
      });
    })
    .catch((err) => {
      console.error("[DB] Erro ao iniciar o banco de dados", err);
    });
}

initServer();
