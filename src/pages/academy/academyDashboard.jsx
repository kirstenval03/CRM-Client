import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/user.context";
import { AuthContext } from "../../context/auth.context";
import { SERVER_URL } from '../../services/SERVER_URL';
import PieChart from "../../components/PieChartAcademy"; // Import your custom PieChart component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import AcademyDashboardImage from '../../assets/images/AcademyDashboard.png'; // Import your AcademyDashboard.png image
import { Link } from "react-router-dom"; // Import Link component for the button

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

  // Array of images for the carousel
  const carouselImages = [
    { src: AcademyDashboardImage, alt: 'Academy Dashboard' },
    // Add more images as needed
  ];

  return (
    <div className="academy-dashboard">
      {/* Carousel */}
      <div className="carousel-container">
        <Carousel showArrows={true} showStatus={false} showThumbs={false} interval={5000} infiniteLoop={true} autoPlay={true}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image.src} alt={image.alt} className="carousel-image" />
            </div>
          ))}
        </Carousel>
      </div>

      {/* User Progress */}
      <div className="user-progress">
        <h1>User Progress:</h1>
        {userProgress ? (
          <div className="progress-container">
            <div className="pie-chart-container">
              <PieChart percentage={percentageCompleted} colour="#66bb6a" />
            </div>
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
        ) : (
          <p>Loading user progress...</p>
        )}
        {/* Button to go to /academy-curriculum */}
        <Link to="/academy-curriculum" className="go-to-curriculum-button">
          Go to Curriculum
        </Link>
      </div>
    </div>
  );
};

export default AcademyDashboard;
