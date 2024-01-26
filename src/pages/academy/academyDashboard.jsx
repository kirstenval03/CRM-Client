import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/user.context";
import { AuthContext } from "../../context/auth.context";
import { SERVER_URL } from '../../services/SERVER_URL';
import PieChart from "../../components/PieChartAcademy"; // Import your custom PieChart component

const AcademyDashboard = () => {
  const { currentUser } = useContext(UserContext);
  const [userProgress, setUserProgress] = useState(null);
  const totalLessons = 22; // Total number of lessons

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        if (authContext.isLoggedIn && currentUser) {
          const token = localStorage.getItem("authToken");

          const response = await axios.get(`${SERVER_URL}/progress/user-progress/${currentUser._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserProgress(response.data);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [authContext.isLoggedIn, currentUser]);

  const completedLessonsCount = userProgress ? userProgress.completedLessons.length : 0;
  const remainingLessonsCount = totalLessons - completedLessonsCount; // Calculate remaining lessons

  const percentageCompleted = (completedLessonsCount / totalLessons) * 100;

  return (
    <div className="academy-dashboard">
      <h1>Academy Dashboard</h1>
      {userProgress ? (
        <div className="pie-chart-container">
          <PieChart percentage={percentageCompleted} colour="#66bb6a" />
        </div>
      ) : (
        <p>Loading user progress...</p>
      )}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: "#66bb6a" }}></div>
          <div className="legend-label">Completed Lessons: {completedLessonsCount}</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: "#f44336" }}></div>
          <div className="legend-label">Remaining Lessons: {remainingLessonsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDashboard;
