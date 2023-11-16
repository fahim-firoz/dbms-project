import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain="dev-tazzn3k2k78k4owd.us.auth0.com"
    clientId="kxfczZKbzSQOVL2QGQNbpUFrBBQEpAtV"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
