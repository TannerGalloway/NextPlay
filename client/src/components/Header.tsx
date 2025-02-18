import "../styles/header.css";
import { Notification, User } from "../assets/icons";

const Header: React.FC = () => {
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
      <div className="accountIcons">
        <Notification wd="1.8rem" ht="1.8rem" color="var(--secondary)"/>
        <User wd="1.8rem" ht="1.8rem" color="var(--secondary)"/>
      </div>
    </header>
  );
};

export default Header;
