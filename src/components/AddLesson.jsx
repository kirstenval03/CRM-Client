import React, { useState } from 'react';
import { useLessonContext } from '../context/lesson.context';

function AddLesson({ closeModal, moduleId }) {
  const { createLesson } = useLessonContext();
  const [lessonData, setLessonData] = useState({
    title: '',
    vimeoLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the createLesson function from the context to create the lesson
    try {
      await createLesson(lessonData, moduleId);
      closeModal(); // Close the modal after successfully creating the lesson
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Lesson</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Lesson Title:
            <input
              type="text"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Vimeo ID:
            <input
              type="text"
              name="vimeoLink"
              value={lessonData.vimeoLink}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Create</button>
        </form>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default AddLesson;

