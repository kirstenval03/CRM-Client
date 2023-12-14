import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { EventProvider } from "./context/event.context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          
          <App />
          
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
