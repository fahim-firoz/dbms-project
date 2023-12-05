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
import Events from "./Events";
import BookNow from "./BookNow";

import "./index.css";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApi = process.env.REACT_APP_SUPABASE_API;

const supabase = createClient(supabaseUrl, supabaseApi);

function App() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  console.log("User:", user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<BookNow />} />
        <Route path="bookslot" element={<Bookslot />} />
        <Route path="events" element={<Events />} />
        <Route path="about" element={<About />} />
        <Route path="clubs" element={<Clubs />} />
      </Route>
    )
  );

  React.useEffect(() => {
    const updateUserInDatabase = async () => {
      try {
        const { data, error } = await supabase.from("USER").upsert({
          username: user.name,
          email: user.email,
        });

        if (error) {
          console.error("Error inserting/updating user data:", error.message);
        } else {
          console.log("User data inserted/updated successfully:", data);
        }
      } catch (error) {
        console.error("Error inserting/updating user data:", error.message);
        // Add user-friendly error handling here if needed
      }
    };

    if (user) {
      updateUserInDatabase();
    }
  }, [user]);

  return (
    <div>
      {!isAuthenticated ? (
        <div className="login-section">
          <h1 className="login-title">Welcome to ClashOfClubs.</h1>
          <button
            onClick={() => {
              loginWithRedirect();
            }}
            className="login-button"
          >
            Login
          </button>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;
