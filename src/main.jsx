import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { EventProvider } from "./context/event.context.jsx";
import { UserProvider } from "./context/user.context.jsx";
import { CustomerProvider } from "./context/customer.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
        <EventProvider>
          <CustomerProvider>
          <App />
          </CustomerProvider>
        </EventProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
