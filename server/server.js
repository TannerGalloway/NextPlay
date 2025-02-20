import "@dotenvx/dotenvx/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import dbRoutes from "./routes/dbRoutes.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for parsing JSON
app.use(express.json());

// Get the environment variable to check if it's development or production
const isProduction = (process.env.NODE_ENV === "production");

if(!isProduction) {
    // Middleware for CORS to accept requests from the client
    app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization', "Client-ID"],
        credentials: true,
    }));

}

if (isProduction) {
    app.use(cors({
        origin: ["https://nextplay-48g3.onrender.com"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization', "Client-ID"],
        credentials: true,
    }));


    // Display the files built from vite
    app.use(express.static(path.join("../client/dist")));
}

// Auth Routes
app.use("/auth", authRoutes);

// API Routes
app.use("/api", apiRoutes);

// Database Routes
app.use("/db", dbRoutes);


app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });