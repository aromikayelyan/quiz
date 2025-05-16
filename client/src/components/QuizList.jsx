import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get('/')
      .then(res => setQuizzes(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      {/* Навигация для входа и регистрации */}

      <h2>Все викторины</h2>

      {quizzes.length === 0 ? (
        <p>Загрузка викторин...</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {quizzes.map(q => (
            <li key={q.uid} style={{ marginBottom: '0.8rem' }}>
              <Link to={`/quiz/${q.uid}`} style={{ fontWeight: '600', fontSize: '1.1rem', color: '#3b82f6' }}>
                {q.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
