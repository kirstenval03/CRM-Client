import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/Home";
import AgencyDashboard from "./pages/agency/agencyDashPage";
import TeamMembers from "./pages/agency/TeamMembers";
import Clients from "./pages/agency/Clients";

import EventsPage from "./pages/coaches/EventsPage";
import ContactsPage from "./pages/coaches/ContactsPage"; // Import the ContactsPage component

// import RegistrantsPage from "./pages/agency/RegistrantsPage";
// import LeadsPage from "./pages/coaches/LeadsPage";
// import CalendarPage from "./pages/coaches/CalendarPage";

import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? (
      <div className="app">
        <Sidebar />
        <main className="content">
        <Topbar/>
          <Outlet />
        </main>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  const NotLoggedIn = () => {
    return !getToken() ? 
    <div>
      <Topbar/>
    <Outlet />
     </div>
    : <Navigate to="/" />;
  };

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<LoggedIn />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/agency-dashboard" element={<AgencyDashboard />} />
            <Route path="/team-members" element={<TeamMembers />} />
            <Route path="/clients" element={<Clients />} />
            
        
           <Route path="/events" element={<EventsPage/>}/>
           <Route path="/contact/:eventId" element={<ContactsPage />} /> 
            {/* <Route path="/calendar" element={<CalendarPage/>}/> */}

            {/* ... other routes ... */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;