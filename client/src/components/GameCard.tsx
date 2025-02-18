import "../styles/GameCard.css";
import { Notification } from "../assets/icons";

interface GameCardProps {
  cover: string;
  title: string;
  developer: string;
  devLogo: string;
  btnType: string;
}
const GameCard: React.FC<GameCardProps> = ({
  cover,
  title,
  developer,
  devLogo,
  btnType,
}) => {
  return (
    <div className="gameCard">
      <img className="gameCover" src={cover} alt={title} />
      <div className="gameCardBody">
        <h3>{title}</h3>
        <div className="developmentStudio">
            <img src={devLogo} alt="developmentStudio" />
          <p>{developer}</p>
        </div>
      {btnType === "Upcoming" ? (
        <button className="notifyBtn">
          <Notification wd="1.25rem" ht="1.25rem" color="var(--background-light)"/> Notify Me
        </button>
      ) : (
        <button>View</button>
      )}
      </div>
    </div>
  );
};

export default GameCard;
