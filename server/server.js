import "@dotenvx/dotenvx/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware for parsing JSON
app.use(express.json());

// Get the environment variable to check if it's development or production
const isProduction = process.env.NODE_ENV === 'production';

if(!isProduction) {
    // Middleware for CORS to accect requests from the client
    app.use(cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }));

}

// API Routes
app.use("/auth", authRoutes);


app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });