import "../styles/GameCard.css";
import { Notification } from "../assets/icons";
import axios from "axios";
import { Session } from "@supabase/supabase-js";


interface GameCardProps {
  cover: string;
  title: string;
  genre: string;
  releaseDate?: string;
  gameID: number;
  btnType: string;
  userSession: Session | null
}
const GameCard: React.FC<GameCardProps> = ({
  cover,
  title,
  genre,
  releaseDate,
  gameID,
  btnType,
  userSession
}) => {
  return (
    <div className="gameCard">
      <img className="gameCover" src={cover} alt={title} />
      <div className="gameCardBody">
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{releaseDate}</p>
        <div className="cardActions">
        <button id={gameID.toString()} onClick={(event) => {
          axios
          .post(
            "https://nextplay-48g3.onrender.com/save",
            {
              gameID: event.currentTarget.id,
              sessionID: userSession?.user.id
            }
          )
          .catch((error) => (error ? console.error(error) : null));
        }}>&#43;</button>
        {btnType === "Upcoming" ? (
        <button className="notifyBtn">
          <Notification wd="1.25rem" ht="1.25rem" color="var(--background-light)"/> Notify Me
        </button>
      ) : (
        <button>View</button>
      )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
