import app from "./server";
import { syncDB } from "./models";

const PORT = process.env.APP_PORT || 3000;

const start = async () => {
    try {
        // Sincronizar la base de datos antes de iniciar el servidor
        await syncDB();
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        // Si la sincronización de la base de datos falla, salir del proceso
        process.exit(1);
    }
};

start();