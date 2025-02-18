import "./styles/App.css";
import Header from "./components/header";
import GameCard from "./components/GameCard";

function App() {
  return (
    <>
      <Header />
      <GameCard cover="https://placehold.jp/50x50.png" title="The Witcher 3: Wild Hunt" developer="CD Projekt Red" devLogo="https://placehold.jp/28x28.png" btnType="View"/>
    </>
  );
}

export default App;
