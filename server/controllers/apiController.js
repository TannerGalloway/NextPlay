import "@dotenvx/dotenvx/config";
import apicalypse from "apicalypse";

const requestOptions = {
    queryMethod: "body",
    method: "post",
    baseURL: "https://api.igdb.com/v4",
    headers: {
        "Accept": "application/json",
        "Client-ID": process.env.CLIENT_ID,
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
      },
}

const topSteamGamesByPlayerCount = async (req, res) => {
    try {
    // Get the top 5 popular games based on player count from Steam per 24 hours
    const response = await apicalypse(requestOptions)
      .fields([
        "game_id",
        "value",
        "popularity_type",
        "external_popularity_source",
      ])
      .sort("value", "desc")
      .limit(5)
      .where(["external_popularity_source = 1"])
      .where(["popularity_type = 5"])
      .request("/popularity_primitives");

    // Get the cover and title for each game using the game_id in a multiquery
      const gamevalues =  response.data.map(async (game) => {
        return await getGameInfoMQ(game.game_id);
      });

    // Await for all the returned promises to resolve before returning to the frontend
    const topGames = await Promise.all(gamevalues);
    return res.status(200).json(topGames);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// Get the genre of a game based on the genre id
const getGenre = async (genreId) => {
  try {
    const response = await apicalypse(requestOptions)
      .fields([
        "name",
      ])
      .where(`id = ${genreId}`)
      .request("/genres");
    return response.data[0].name;
  } catch (error) {
    return { error: error };
  }
};

// Multi Query to get the cover and title for a game based on the game id
// Returns a promise that resolves to an object with the cover, title and genre of the game
const getGameInfoMQ = async (gameId)=> {
    const gameInfo = {};
  try {
    const response = await apicalypse(requestOptions).multi([
        // Get the cover
        apicalypse()
        .query("covers", "image")
        .fields("image_id")
        .where(`game = ${gameId}`),
        // Get the title
        apicalypse()
        .query("games", "gameData")
        .fields([
            "name",
            "genres",
            "first_release_date"
          ])
        .where(`id = ${gameId}`),
        // Convert release date to a human readable string
        apicalypse()
        .query("release_dates", "releaseDate")
        .fields([
            "game",
            "human"
          ])
        .where(`game = ${gameId}`)
    ]).request("multiquery");
    gameInfo.title = response.data[1].result[0].name;
    gameInfo.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${response.data[0].result[0].image_id}.jpg`;
    gameInfo.releaseDate = response.data[2].result[0].human;
    gameInfo.gameID = gameId;
    
    // Get the genre based on the genre id returned from the multiquery
    gameInfo.genre = await getGenre(response.data[1].result[0].genres[0]);
    return gameInfo;
  } catch (error) {
    return { error: error };
  }
};

const upcomingGames = async (req, res) => {
  try {
    // Get the date for today, tomorrow and 3 months from now
    const today = Math.floor(Date.now() / 1000);
    const tomorrow = today + 86400;
    const threeMonthsLater = today + (86400 * 90);

    // Get the top 5 upcoming games based on release date between tomorrow and 3 months from now;
    const response = await apicalypse(requestOptions)
      .fields([
        "id",
        "first_release_date",
      ])
      .sort("first_release_date", "asc")
      .where(`first_release_date > ${tomorrow} & first_release_date < ${threeMonthsLater} & themes != ${42}`)
      .limit(5)
      .request("/games");

       // Get the game info for each game using the game_id in the multiquery
       const gamevalues =  response.data.map(async (game) => {
        return await getGameInfoMQ(game.id);
      });

    // Await for all the returned promises to resolve before returning to the frontend
    const upcomingGames = await Promise.all(gamevalues);
    return res.status(200).json(upcomingGames);
  } catch (error) {
    return res.status(500).json({ error: error });
  }

};

export { topSteamGamesByPlayerCount, upcomingGames };
