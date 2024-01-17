import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/auth.context.jsx';
import { ClientProvider } from './context/client.context.jsx'; // Corrected import path
import { ContactProvider } from './context/contact.context.jsx'; // Corrected import path
import { EventProvider } from './context/event.context.jsx'; // Corrected import path
import { UserProvider } from './context/user.context.jsx'; // Corrected import path

// Import the modules and lessons contexts or modules here
import { ModuleProvider } from './context/module.context.jsx'; // Replace with the actual import path
import { LessonProvider } from './context/lesson.context.jsx'; // Replace with the actual import path

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
                <ModuleProvider> {/* Use the modules context/provider */}
                  <LessonProvider> {/* Use the lessons context/provider */}
                    <ContactProvider initialEventId={selectedEventId}>
                      <App handleEventSelection={handleEventSelection} />
                    </ContactProvider>
                  </LessonProvider>
                </ModuleProvider>
              </EventProvider>
            </ClientProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
