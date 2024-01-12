import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { ClientProvider } from "./context/client.context.jsx";
import { ContactProvider } from "./context/contact.context.jsx";
import { EventProvider } from "./context/event.context.jsx";
import { UserProvider } from "./context/user.context.jsx";

function Main() {
  // Assuming you have a state variable to store the selected eventId
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Your handleEventSelection function to update selectedEventId
  const handleEventSelection = (eventId) => {
    setSelectedEventId(eventId);
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ClientProvider>
              <EventProvider>
                <ContactProvider initialEventId={selectedEventId}>
                  <App handleEventSelection={handleEventSelection} />
                </ContactProvider>
              </EventProvider>
            </ClientProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
