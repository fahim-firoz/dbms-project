import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import BookSlotForm from "./BookSlotForm";

function Bookslot() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="bookslot-section">
      <BookSlotForm />
    </div>
  );
}

export default Bookslot;
