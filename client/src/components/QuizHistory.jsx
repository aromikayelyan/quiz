import React, { useEffect, useState } from 'react';
import API from '../api';

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('/myhistory')
      .then(res => setHistory(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Quiz History</h2>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.result.title} — Answer ID: {h.answerId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizHistory;
