import "../styles/GameCard.css";
import { Notification } from "../assets/icons";

interface GameCardProps {
  cover: string;
  title: string;
  genre: string;
  releaseDate?: string;
  btnType: string;
}
const GameCard: React.FC<GameCardProps> = ({
  cover,
  title,
  genre,
  releaseDate,
  btnType,
}) => {
  return (
    <div className="gameCard">
      <img className="gameCover" src={cover} alt={title} />
      <div className="gameCardBody">
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{releaseDate}</p>
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
