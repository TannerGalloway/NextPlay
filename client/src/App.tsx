import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";
import "./styles/App.css";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Login_Register from "./components/Login_Register";
import axios from "axios";

// Types for the game details object returned from the API
interface GameDetails {
  cover: string;
  title: string;
  genre: string;
  releaseDate?: string;
  gameID: number;
  userSession: Session | null
}
function App() {
  // Get the auth type the user selected
  const [selectedAuth, setSelectedAuth] = useState<string>("login");
  const [session, setSession] = useState<Session | null>(null);
  const [popularGames, setPopularGames] = useState<GameDetails[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<GameDetails[]>([]);
  const [hasError, sethasError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the user is logged in
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error !== null) {
        setSession(data.session);
      }
    };

    getSession();

    // Update the session when the user logs in or logs out
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        setSession(null);
      }
    });
  }, []);

  useEffect(() => {
    // Call the API to get the top 5 popular games based on player count from Steam per 24 hours
    const getTopGames = async () => {
      axios
        .post(
          "https://nextplay-48g3.onrender.com/api/topSteamGamesByPlayerCount"
        )
        .then((response) => {
          setPopularGames(response.data);
        })
        .catch((error) => (error ? sethasError(error) : null));
    };

    const getUpcomingGames = async () => {
      axios
        .post("https://nextplay-48g3.onrender.com/api/upcomingGames")
        .then((response) => {
          setUpcomingGames(response.data);
        })
        .catch((error) => (error ? sethasError(error) : null));
    };

    getTopGames();
    getUpcomingGames();
  }, []);

  const LandingPage = () => {
    return (
      <>
      <Header login={session !== null} setSelectedAuth={setSelectedAuth} />
      <div className="popularGames">
        <h2>Popular Games</h2>
        {hasError ? (
          <p>{"An error occured"}</p>
        ) : popularGames.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="gameCardContainer">
            {popularGames.map((game) => (
              <GameCard
                key={game.gameID}
                cover={game.cover}
                title={game.title}
                genre={game.genre}
                gameID={game.gameID}
                userSession={session}
                btnType="View"
              />
            ))}
          </div>
        )}
      </div>
      <div className="upcomingGames">
        <h2>Upcoming Games</h2>
        {hasError ? (
          <p>{"An error occured"}</p>
        ) : upcomingGames.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="gameCardContainer">
            {upcomingGames.map((game) => (
              <GameCard
                key={game.gameID}
                cover={game.cover}
                title={game.title}
                genre={game.genre}
                releaseDate={game.releaseDate}
                gameID={game.gameID}
                userSession={session}
                btnType="Upcoming"
              />
            ))}
          </div>
        )}
      </div>
      </>
    );
  };

  return (
    <>
    {session === null ? <Login_Register authType={selectedAuth} setSession={setSession} /> : (
      <LandingPage/>
    )}
    </>
  );
}

export default App;
