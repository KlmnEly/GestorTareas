import app from "./server";

const PORT = process.env.APP_PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a la BD :", error);
    process.exit(1);
  }
};

start();
