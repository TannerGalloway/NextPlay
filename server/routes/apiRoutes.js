import express from "express";
const router = express.Router();
import { topSteamGamesByPlayerCount, upcomingGames } from "../controllers/apiController.js";

router.post("/topSteamGamesByPlayerCount", topSteamGamesByPlayerCount);

router.post("/upcomingGames", upcomingGames);

export default router;