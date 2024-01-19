import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useModuleContext } from "../../context/module.context";
import { useLessonContext } from "../../context/lesson.context";

import AddModule from "../../components/AddModule";
import AddLesson from "../../components/AddLesson";
import { AuthContext } from "../../context/auth.context";

function AcademyModules() {
  return (
    <AuthContext.Consumer>
      {(authContext) => <AcademyModulesInner authContext={authContext} />}
    </AuthContext.Consumer>
  );
}

function AcademyModulesInner({ authContext }) {
  const { modules, isLoading: isModuleLoading } = useModuleContext();
  const { lessons, isLoading: isLessonLoading } = useLessonContext();

  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [checkboxes, setCheckboxes] = useState(
    JSON.parse(localStorage.getItem("checkboxes")) || {}
  );

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

  const handleCheckboxChange = (moduleId, lessonId) => {
    const updatedCheckboxes = {
      ...checkboxes,
      [moduleId]: {
        ...(checkboxes[moduleId] || {}),
        [lessonId]: !checkboxes[moduleId]?.[lessonId],
      },
    };
    setCheckboxes(updatedCheckboxes);
    localStorage.setItem("checkboxes", JSON.stringify(updatedCheckboxes));
  };

  useEffect(() => {
    // Load checkbox state from local storage when the component mounts
    const savedCheckboxes = JSON.parse(localStorage.getItem("checkboxes"));
    if (savedCheckboxes) {
      setCheckboxes(savedCheckboxes);
    }
  }, []);

  if (isModuleLoading || isLessonLoading) {
    return <div>Loading curriculum...</div>;
  }

  const userRole = authContext.user ? authContext.user.role : "";

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
                      <input
                        type="checkbox"
                        className="lesson-checkbox"
                        checked={checkboxes[module._id]?.[lesson._id] || false}
                        onChange={() =>
                          handleCheckboxChange(module._id, lesson._id)
                        }
                      />
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

