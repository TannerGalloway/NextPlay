import "./styles/App.css";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Login_Register from "./components/Login_Register";

function App() {
  return (
    <>
      <Header login={true} />
      <div className="container">
        <Login_Register authType="Login" />
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
