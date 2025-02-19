import React from "react";
import "../styles/Header.css";
import { Notification, User } from "../assets/icons";
import supabase from "../utils/supabase";

interface HeaderProps {
  login: boolean;
  setSelectedAuth: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ login, setSelectedAuth }) => {
  return (
    <header className="header">
      {/* Navigation links */}
      <div className="navlinks">
        <ul>
          <li>Home</li>
          <li>Library</li>
          <li>Wishlist</li>
        </ul>
      </div>
      {/* Search bar */}
      <div className="search">
        <input type="text" placeholder="Search" />
      </div>
      {login ? (
        // Account Buttons if user is logged in
        <div className="accountIcons">
          <button className="btnStyleReset">
            <Notification wd="2rem" ht="2rem" color="var(--secondary)" />
          </button>
          <button
            className="btnStyleReset"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error(error);
                return;
              }
            }}
          >
            <User wd="2rem" ht="2rem" color="var(--secondary)" />
          </button>
        </div>
      ) : (
        // Login and Register buttons if user is not logged in
        <div className="accountButtons">
          <button className="login" onClick={() => setSelectedAuth("login")}>
            Login
          </button>
          <button
            className="button-outline"
            onClick={() => setSelectedAuth("register")}
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
