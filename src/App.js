import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createClient } from "@supabase/supabase-js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import About from "./About";
import Clubs from "./Clubs";
import Bookslot from "./Bookslot";

import "./index.css";

const supabase = createClient(
  "https://pexwzisgdtjnigphofua.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleHd6aXNnZHRqbmlncGhvZnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5Njk2MTMsImV4cCI6MjAxNTU0NTYxM30.nSgV0UKrFpLsEM_zFQr8NrCl9sdjNgeflqBqp8vcw1w"
);

function App() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  console.log("User:", user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Bookslot />} />
        <Route path="about" element={<About />} />
        <Route path="clubs" element={<Clubs />} />
      </Route>
    )
  );

  React.useEffect(async () => {
    try {
      const { data, error } = await supabase.from("USER").upsert({
        username: user.name,
        email: user.email,
      });

      if (error) {
        console.error("Error inserting/updating user data:", error.message);
        // Add user-friendly error handling here if needed
      } else {
        console.log("User data inserted/updated successfully:", data);
      }
    } catch (error) {
      console.error("Error inserting/updating user data:", error.message);
      // Add user-friendly error handling here if needed
    }
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <div className="login-container">
          <div>
            <img
              className="login-image"
              src="./images/background-image10.jpg"
            />
            <div className="login-section">
              <h1 className="login-title">Welcome!</h1>
              <button
                onClick={() => {
                  loginWithRedirect();
                }}
                className="login-button"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
