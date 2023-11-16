import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Bookslot() {
  const { user } = useAuth0();

  return (
    <div className="bookslot-section">
      <div className="bookslot-first-section">
        <h3 className="username">
          Hi {user.name}.
          <br />
          Book your slot
        </h3>
      </div>

      <div className="bookslot-second-section">
        <div className="input-container">
          <input type="date" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
        <div>
          <button className="bookslot-button">Book slot</button>
        </div>
      </div>
    </div>
  );
}

export default Bookslot;
