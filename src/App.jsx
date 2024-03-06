import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UserContext } from "./context/user.context"; 


//LOGIN & CREATE USER
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

//TOP & SIDEBAR
import Sidebar from "./pages/global/Sidebar";
import AcademySidebar from "./pages/global/AcademySidebar";
import Topbar from "./pages/global/Topbar";

//ADMIN
import HomePage from "./pages/Home";
import TeamMembers from "./pages/agency/TeamMembers";
import Clients from "./pages/agency/Clients";

//EVENTS
import EventsPage from "./pages/coaches/EventsPage";
import ContactsPage from "./pages/coaches/ContactsPage"; // Import the ContactsPage component
import LinksPage from "./pages/coaches/linksPage";
import KanbanBoardPage from "./pages/coaches/KanbanBoard";

// ACADEMY
import AcademyDashboard from "./pages/academy/academyDashboard";
import AcademyModules from "./pages/academy/academyModules";
import AcademyLessonPage from "./pages/academy/academyLesson";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    const { currentUser } = useContext(UserContext); // Get currentUser from context

    return getToken() ? (
      <div className="app">
        {/* Conditional rendering of the sidebar based on the user's role */}
        {currentUser && currentUser.role === "admin" && <Sidebar />}
        {currentUser && currentUser.role === "academy_member" && <AcademySidebar />} {/* Import AcademySidebar */}
        {/* {currentUser && currentUser.role === "sales_coach" && <SalesCoachSidebar />} */}
        
        <main className="content">
          <Topbar />
          <Outlet />
        </main>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  };

  const NotLoggedIn = () => {
    return !getToken() ? (
      <div>
        <Topbar />
        <Outlet />
      </div>
    ) : (
      <Navigate to="/" />
    );
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
            <Route path="/team-members" element={<TeamMembers />} />
            <Route path="/clients" element={<Clients />} />
            
        
           <Route path="/events" element={<EventsPage/>}/>
           <Route path="/contact/:eventId" element={<ContactsPage />} />
           <Route path="/links/:eventId" element={<LinksPage />} />
           <Route path="/contact/board/:eventId" element={<KanbanBoardPage />} />


          {/* Add Academy-related routes */}
          <Route path="/academy-dashboard" element={<AcademyDashboard />} />
          <Route path="/academy-curriculum" element={<AcademyModules />} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<AcademyLessonPage />} />
           

            {/* ... other routes ... */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;