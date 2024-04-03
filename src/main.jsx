import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/auth.context.jsx';
import { ClientProvider } from './context/client.context.jsx'; 
import { ContactProvider } from './context/contact.context.jsx'; 
import { EventProvider } from './context/event.context.jsx';
import { UserProvider } from './context/user.context.jsx'; 

//BOARD
import { BoardProvider } from './context/Board/board.jsx';
import { ColumnProvider } from './context/Board/column.jsx';
import { CardProvider } from './context/Board/card.jsx';

//ACADEMY
import { ModuleProvider } from './context/module.context.jsx'; 
import { LessonProvider } from './context/lesson.context.jsx'; 

function Main() {
  // Assuming you have a state variable to store the selected eventId
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Your handleEventSelection function to update selectedEventId
  const handleEventSelection = (eventId) => {
    setSelectedEventId(eventId);
  };

  return (
    // <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ClientProvider>
              <EventProvider>
                <ModuleProvider> 
                  <LessonProvider>
                    <ContactProvider initialEventId={selectedEventId}>
                    <BoardProvider>
                      <ColumnProvider>
                        <CardProvider>

                      <App handleEventSelection={handleEventSelection} />
                    
                          </CardProvider>
                        </ColumnProvider>
                      </BoardProvider>
                    </ContactProvider>
                  </LessonProvider>
                </ModuleProvider>
              </EventProvider>
            </ClientProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    // </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
