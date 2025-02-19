import { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Login_Register from "./components/Login_Register";


function App() {
  // Get the auth type the user selected
  const [selectedAuth, setSelectedAuth] = useState<string>("");
  
  return (
    <>
      <Header login={false} setSelectedAuth={setSelectedAuth}/>
      <div className="container">
        <Login_Register authType={selectedAuth} />
      </div>
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
