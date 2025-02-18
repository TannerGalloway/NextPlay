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
        <Notification />
        <User />
      </div>
    </header>
  );
};

export default Header;
