import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { logout } = useAuth0();
  return (
    <div className="header">
      <div className="first-section">
        <p className="web-name">ClashOfClubs</p>
      </div>
      <div className="second-section">
        <li>
          <NavLink
            to="/"
            style={{
              color: "red",
              textDecoration: "none",
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "red",
                textDecoration: "none",
              };
            }}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clubs"
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "red",
                textDecoration: "none",
              };
            }}
          >
            Clubs
          </NavLink>
        </li>
      </div>
      <div className="last-section">
        <button className="logout-button" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
