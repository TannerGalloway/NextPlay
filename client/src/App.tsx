import "./styles/App.css";
import Header from "./components/header";
import GameCard from "./components/GameCard";

function App() {
  return (
    <>
      <Header login={true}/>
      <div className="popularGames">
        <h2>Popular Games</h2>
        <GameCard cover="https://placehold.jp/50x50.png" title="The Witcher 3: Wild Hunt" genre="Role-playing (RPG)" btnType="View"/>
      </div>
      <div className="upcomingGames">
        <h2>Upcoming Games</h2>
        <GameCard cover="https://placehold.jp/50x50.png" title="The Elder Scrolls VI" genre="Role-playing (RPG)" btnType="Upcoming"/>
      </div>
    </>
  );
}

export default App;
