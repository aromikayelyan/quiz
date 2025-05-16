import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    API.get(`/${id}`).then(res => setQuiz(res.data));
  }, [id]);

  const answer = (answerId) => {
    API.post(`/answer/${id}`, { answerId })
      .then(res => alert(`Ответ сохранен: ${res.data.answer?.text || 'OK'}`))
      .catch(err => alert(err.response?.data?.message || 'Ошибка'));
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.answers.map(ans => (
        <button key={ans.id} onClick={() => answer(ans.id)}>
          {ans.text}
        </button>
      ))}
    </div>
  );
};

export default QuizDetails;
