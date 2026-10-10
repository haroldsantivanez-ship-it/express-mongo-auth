import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API de usuarios funcionando",
        users: "/api/users"
    });
});

app.use("/api/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada"
    });
});

app.use((error, req, res, next) => {
    if (error.code === 11000) {
        return res.status(409).json({
            message: "El correo ya está registrado"
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: error.message
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            message: "El ID del usuario no es válido"
        });
    }

    if (error.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "El cuerpo de la solicitud contiene JSON inválido"
        });
    }

    console.error(error.message);

    res.status(500).json({
        message: "Error interno del servidor"
    });
});

export default app; 