import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
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

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Bookslot />} />
        <Route path="about" element={<About />} />
        <Route path="clubs" element={<Clubs />} />
      </Route>
    )
  );

  return (
    <div>
      {!isAuthenticated ? (
        <div className="login-container">
          <div>
            <img className="login-image" src="./images/login-image.png" />
          </div>
          <div className="login-section">
            <div>
              <h1 className="login-title">Welcome!</h1>
            </div>
            <div className="login-button-div">
              <button
                onClick={() => loginWithRedirect()}
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
