import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="first-section">
        <p className="web-name">ClashOfClubs</p>
      </div>
      <div className="last-section">
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
    </div>
  );
}
