import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function BookNow() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  return (
    <div className="booknow-container">
      <div className="booknow-first-section">
        <h1>
          Hello
          <br />
          {user.name}!
        </h1>
      </div>
      <div className="vertical-bar"></div>
      <div className="booknow-second-section">
        <h3>Click here to book slot</h3>
        <button onClick={() => navigate("./Bookslot")}>Book</button>
      </div>
    </div>
  );
}

export default BookNow;
