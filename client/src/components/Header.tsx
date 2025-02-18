import "../styles/header.css";
import { Notification, User } from "../assets/icons";

interface HeaderProps {
  login: boolean;
}

const Header: React.FC<HeaderProps> = ({ login }) => {
  return (
    <header className="header">
      <div className="navlinks">
        <ul>
          <li>Home</li>
          <li>Library</li>
          <li>Wishlist</li>
        </ul>
      </div>
      <div className="search">
        <input type="text" placeholder="Search" />
      </div>
      {login ? (
        <div className="accountIcons">
          <Notification wd="2rem" ht="2rem" color="var(--secondary)" />
          <User wd="2rem" ht="2rem" color="var(--secondary)" />
        </div>
      ) : (
        <div className="accountButtons">
        <button className="login">Login</button>
        <button className="button-outline">Register</button>
      </div>
      )}
    </header>
  );
};

export default Header;
