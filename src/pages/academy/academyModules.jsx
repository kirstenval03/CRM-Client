import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useModuleContext } from "../../context/module.context";
import { useLessonContext } from "../../context/lesson.context";
import AddModule from "../../components/AddModule";
import AddLesson from "../../components/AddLesson";
import { UserContext } from "../../context/user.context";
import { SERVER_URL } from '../../services/SERVER_URL';

import axios from "axios"; // Import Axios for making API requests

import { AuthContext } from "../../context/auth.context"; // Import AuthContext

function AcademyModules() {
  return (
    <UserContext.Consumer>
      {(userContext) => <AcademyModulesInner userContext={userContext} />}
    </UserContext.Consumer>
  );
}

function AcademyModulesInner({ userContext }) {
  const authContext = useContext(AuthContext); // Use useContext to access AuthContext
  const authToken = localStorage.getItem("authToken");

  console.log("AuthContext:", authContext);

  const { modules, isLoading: isModuleLoading } = useModuleContext();
  const { lessons, isLoading: isLessonLoading } = useLessonContext();

  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [checkboxes, setCheckboxes] = useState(
    JSON.parse(localStorage.getItem("checkboxes")) || {}
  );
  const [userProgress, setUserProgress] = useState(null);

  const openAddModuleModal = () => {
    setIsAddModuleModalOpen(true);
  };

  const closeAddModuleModal = () => {
    setIsAddModuleModalOpen(false);
  };

  const openAddLessonModal = (moduleId) => {
    setSelectedModuleId(moduleId);
    setIsAddLessonModalOpen(true);
  };

  const closeAddLessonModal = () => {
    setIsAddLessonModalOpen(false);
  };

  const fetchUserProgress = async () => {
    try {
      if (userContext.currentUser && userContext.currentUser._id) {
        const userId = userContext.currentUser._id;
        const response = await axios.get(`/progress/user-progress/${userId}`);
        setUserProgress(response.data);
      } else {
        // Handle the case where the user is not authenticated or the user ID is not available
      }
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const handleCheckboxChange = async (moduleId, lessonId) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [moduleId]: {
        ...(checkboxes[moduleId] || {}),
        [lessonId]: !checkboxes[moduleId]?.[lessonId],
      },
    };

    setCheckboxes(updatedCheckboxes);
    localStorage.setItem("checkboxes", JSON.stringify(updatedCheckboxes));

    try {
      if (userContext.currentUser && userContext.currentUser._id) {
        const userId = userContext.currentUser._id;

        // Construct the complete URL using SERVER_URL
        const completeLessonURL = `${SERVER_URL}/progress/unmark-lesson/${lessonId}`;

        // If the checkbox is unchecked, send a DELETE request instead of POST
        if (!updatedCheckboxes[moduleId]?.[lessonId]) {
          // Make an API request to unmark the lesson as completed using DELETE method
          await axios.delete(completeLessonURL, {
            headers: {
              Authorization: `Bearer ${authToken}`, // Use authToken from localStorage
            },
            data: { userId }, // Include the data in the request body
          });
        } else {
          // If the checkbox is checked, send a POST request to mark the lesson as completed
          await axios.post(
            completeLessonURL,
            { lessonId, userId },
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Use authToken from localStorage
              },
            }
          );
        }

        // Fetch updated user progress after the API request
        fetchUserProgress();
      }
    } catch (error) {
      console.error("Error marking/unmarking lesson as completed:", error);
    }
  };

  if (isModuleLoading || isLessonLoading) {
    return <div>Loading curriculum...</div>;
  }

  // Use userContext to access the user's role
  const userRole = userContext.currentUser ? userContext.currentUser.role : "";

  // Function to render checkboxes based on user progress
  const renderCheckboxes = (moduleId, lessonId) => {
    if (userProgress && userProgress.completedLessons) {
      return userProgress.completedLessons.includes(lessonId) ? (
        <input
          type="checkbox"
          className="lesson-checkbox"
          checked={true}
          onChange={() => handleCheckboxChange(moduleId, lessonId)}
        />
      ) : (
        <input
          type="checkbox"
          className="lesson-checkbox"
          checked={false}
          onChange={() => handleCheckboxChange(moduleId, lessonId)}
        />
      );
    } else {
      return (
        <input
          type="checkbox"
          className="lesson-checkbox"
          checked={checkboxes[moduleId]?.[lessonId] || false}
          onChange={() => handleCheckboxChange(moduleId, lessonId)}
        />
      );
    }
  };

  return (
    <div className="modules-page">
      <h1>Curriculum</h1>

      {userRole === "admin" && (
        <div>
          <button onClick={openAddModuleModal}>Create Module</button>
        </div>
      )}

      {modules.length === 0 ? (
        <div>
          <p>No modules available.</p>
        </div>
      ) : (
        modules.map((module) => (
          <div key={module._id} className="module-container">
            <h2>{module.name}</h2>
            <div className="lessons-container">
              <ul>
                {module.lessons.map((lesson) => (
                  <div className="lesson-container" key={lesson._id}>
                    <li>
                      <Link
                        to={`/modules/${module._id}/lessons/${lesson._id}`}
                        className="lesson-link"
                      >
                        {lesson.title}
                      </Link>
                      {userRole === "academy_member" && (
                        // Render checkboxes based on user progress
                        renderCheckboxes(module._id, lesson._id)
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
            {userRole === "admin" && (
              <button onClick={() => openAddLessonModal(module._id)}>
                Add Lesson
              </button>
            )}
          </div>
        ))
      )}

      {isAddModuleModalOpen && <AddModule closeModal={closeAddModuleModal} />}
      {isAddLessonModalOpen && (
        <AddLesson
          closeModal={closeAddLessonModal}
          moduleId={selectedModuleId}
        />
      )}
    </div>
  );
}

export default AcademyModules;





