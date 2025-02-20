import express from "express";
const router = express.Router();
import { topSteamGamesByPlayerCount } from "../controllers/apiController.js";

router.post("/topSteamGamesByPlayerCount", topSteamGamesByPlayerCount);

export default router;