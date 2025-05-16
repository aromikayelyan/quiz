import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get('/myquizes').then(res => setQuizzes(res.data));
  }, []);

  const remove = (id) => {
    API.delete(`/${id}`).then(() => {
      setQuizzes(prev => prev.filter(q => q.uid !== id));
    });
  };

  return (
    <div>
      <h2>My Quizzes</h2>
      <ul>
        {quizzes.map(q => (
          <li key={q.uid}>
            {q.title} | <Link to={`/edit/${q.uid}`}>Edit</Link> | <button onClick={() => remove(q.uid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuizzes;
