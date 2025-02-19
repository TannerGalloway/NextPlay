import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "./utils/supabase";
import "./styles/App.css";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Login_Register from "./components/Login_Register";

function App() {
  // Get the auth type the user selected
  const [selectedAuth, setSelectedAuth] = useState<string>("login");
  const [session, setSession] = useState<Session | null>(null);

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

  return (
    <>
      <Header login={session !== null} setSelectedAuth={setSelectedAuth} />
      {/* Only show the login or register form if the user is not logged in */}
      {session === null ? (
        <div className="container">
          <Login_Register authType={selectedAuth} setSession={setSession} />
        </div>
      ) : null}
      <div className="popularGames">
        <h2>Popular Games</h2>
        <GameCard
          cover="https://placehold.jp/50x50.png"
          title="The Witcher 3: Wild Hunt"
          genre="Role-playing (RPG)"
          btnType="View"
        />
      </div>
      <div className="upcomingGames">
        <h2>Upcoming Games</h2>
        <GameCard
          cover="https://placehold.jp/50x50.png"
          title="The Elder Scrolls VI"
          genre="Role-playing (RPG)"
          btnType="Upcoming"
        />
      </div>
    </>
  );
}

export default App;
