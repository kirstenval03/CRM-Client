import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../services/SERVER_URL';
import VimeoVideo from '../../components/VimeoVideo';

function AcademyLessonPage() {
  const { moduleId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construct the URL with the moduleId and lessonId
    const lessonURL = `${SERVER_URL}/modules/${moduleId}/lessons/${lessonId}`;

    // Fetch the specific lesson from your server
    axios
      .get(lessonURL)
      .then((response) => {
        setLesson(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching lesson:', error);
        setIsLoading(false);
        setError(error);
      });
  }, [moduleId, lessonId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!lesson) {
    return <div>Lesson not found.</div>;
  }

  return (
    <div>
      <h1>{lesson.title}</h1>
      <VimeoVideo videoId={lesson.vimeoLink} /> {/* Pass the video ID as a prop */}
    </div>
  );
}

export default AcademyLessonPage;
