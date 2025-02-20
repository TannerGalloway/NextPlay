import express from "express";
const router = express.Router();
import { save } from "../controllers/dbController.js";

router.post("/save", save);

export default router;