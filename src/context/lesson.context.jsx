import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const LessonContext = createContext();

export function useLessonContext() {
  return useContext(LessonContext);
}

export function LessonProvider({ children }) {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of lessons from your server
    axios
      .get(`${SERVER_URL}/lessons`)
      .then((response) => {
        setLessons(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
        setIsLoading(false);
        setError(error);
      });
  }, []);

  // Fetch a lesson by its ID
  const getLessonById = (lessonId) => {
    return lessons.find((lesson) => lesson._id === lessonId);
  };

  // CREATE LESSON
  const createLesson = async (newLesson, moduleId) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/lesson/modules/${moduleId}/new-lesson`,
        newLesson
      );

      // The response will contain the newly created lesson
      const createdLesson = response.data;

      // Update the local state with the newly created lesson
      setLessons((prevLessons) => [...prevLessons, createdLesson]);

      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error creating lesson:', error);
      setError(error); // Set the error state on failure
    }
  };

  // UPDATE LESSON
  const updateLesson = async (moduleId, lessonId, updatedLesson) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/modules/${moduleId}/lessons/${lessonId}`,
        updatedLesson
      );

      // The response will contain the updated lesson
      const updatedLessonData = response.data;

      // Update the local state with the updated lesson
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson._id === updatedLessonData._id ? updatedLessonData : lesson
        )
      );

      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error updating lesson:', error);
      setError(error); // Set the error state on failure
    }
  };

  // DELETE LESSON
  const deleteLesson = async (moduleId, lessonId) => {
    try {
      await axios.delete(`${SERVER_URL}/modules/${moduleId}/lessons/${lessonId}`);

      // Remove the deleted lesson from the local state
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson._id !== lessonId)
      );

      setError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error deleting lesson:', error);
      setError(error); // Set the error state on failure
    }
  };

  return (
    <LessonContext.Provider value={{ lessons, isLoading, error, createLesson, updateLesson, deleteLesson, getLessonById }}>
      {children}
    </LessonContext.Provider>
  );
}

