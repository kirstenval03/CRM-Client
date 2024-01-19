// src/components/AcademyDashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios"; // Import Axios for making API requests
import { UserContext } from "../../context/user.context"; // Import UserContext

const AcademyDashboard = () => {
  const { currentUser } = useContext(UserContext); // Access currentUser from UserContext
  const [userProgress, setUserProgress] = useState(null);
  const totalLessons = 8; // Assuming a total of 8 lessons

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        if (currentUser) {
          // Assuming currentUser._id is the correct user ID
          const response = await axios.get(`/progress/user-progress/${currentUser._id}`);
          setUserProgress(response.data);
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [currentUser]);

  // Calculate the percentage of completed lessons
  const completedLessons = userProgress ? userProgress.completedLessons.length : 0;
  const percentageCompleted = (completedLessons / totalLessons) * 100;

  // Data for the pie chart
  const data = [
    {
      id: "Completed",
      label: "Completed",
      value: percentageCompleted,
      color: "#66bb6a", // Green color for completed
    },
    {
      id: "Remaining",
      label: "Remaining",
      value: 100 - percentageCompleted,
      color: "#f44336", // Red color for remaining
    },
  ];

  return (
    <div className="academy-dashboard">
      <h1>Academy Dashboard</h1>
      {userProgress ? (
        <div className="pie-chart-container">
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={(d) => d.color}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
          />
        </div>
      ) : (
        <p>Loading user progress...</p>
      )}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: "#66bb6a" }}></div>
          <div className="legend-label">Completed</div>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: "#f44336" }}></div>
          <div className="legend-label">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDashboard;



