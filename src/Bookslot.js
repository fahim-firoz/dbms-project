import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import BookSlotForm from "./BookSlotForm";

function Bookslot() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="bookslot-section">
      <div className="bookslot-first-section">
        {isAuthenticated && (
          <h3 className="username">
            Hi <span className="username-span">{user.name}.</span>
            <br />
            <span className="book-span">Book your slot</span>
          </h3>
        )}
      </div>
      <BookSlotForm />
    </div>
  );
}

export default Bookslot;
