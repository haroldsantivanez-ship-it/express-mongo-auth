import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Falta MONGO_URI en el archivo .env");
        }

        // Usa los DNS configurados para resolver la dirección de Atlas.
        if (process.env.DNS_SERVERS) {
            const servers = process.env.DNS_SERVERS
                .split(",")
                .map((server) => server.trim())
                .filter(Boolean);

            dns.setServers(servers);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas conectado correctamente");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Servidor iniciado en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar:", error.message);
        process.exit(1);
    }
};

startServer();