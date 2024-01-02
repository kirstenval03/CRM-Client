import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { ClientProvider } from "./context/client.context.jsx";

import { EventProvider } from "./context/event.context.jsx";
import { UserProvider } from "./context/user.context.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ClientProvider>
          <EventProvider>
            
                <App />
              
          </EventProvider>
          </ClientProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
