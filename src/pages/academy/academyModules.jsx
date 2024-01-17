import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModuleContext } from '../../context/module.context';
import { useLessonContext } from '../../context/lesson.context';

import AddModule from '../../components/AddModule';
import AddLesson from '../../components/AddLesson'; 

function AcademyModules() {
  const { modules, isLoading: isModuleLoading } = useModuleContext();
  const { lessons, isLoading: isLessonLoading } = useLessonContext();

  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

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

  if (isModuleLoading || isLessonLoading) {
    return <div>Loading curriculum...</div>;
  }

  return (
    <div>
      <h1>Curriculum</h1>

      <div>
        <button onClick={openAddModuleModal}>Create Module</button>
      </div>

      {modules.length === 0 ? (
        <div>
          <p>No modules available.</p>
        </div>
      ) : (
        modules.map((module) => (
          <div key={module._id}>
            <h2>{module.name}</h2>
            <ul>
              {module.lessons.map((lesson) => (
                 <li key={lesson._id}>
                 <Link to={`/modules/${module._id}/lessons/${lesson._id}`}>{lesson.title}</Link>
               </li>
              ))}
            </ul>
            <button onClick={() => openAddLessonModal(module._id)}>Add Lesson</button>
          </div>
        ))
      )}

      {isAddModuleModalOpen && <AddModule closeModal={closeAddModuleModal} />}
      {isAddLessonModalOpen && (
        <AddLesson closeModal={closeAddLessonModal} moduleId={selectedModuleId} />
      )}
    </div>
  );
}

export default AcademyModules;
