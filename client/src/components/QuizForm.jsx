import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const QuizForm = ({ edit = false }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState([{ id: 1, text: '' }]);
  const [images, setImages] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (edit) {
      API.get(`/${id}`).then(res => {
        setTitle(res.data.title);
        setAnswers(res.data.answers);
        setImages(res.data.images);
      });
    }
  }, [edit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, answers, images };
    const method = edit ? API.put(`/${id}`, payload) : API.post('/', payload);
    method.then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Quiz Title" />
      <input value={images} onChange={e => setImages(e.target.value)} placeholder="Image URL" />
      {answers.map((a, i) => (
        <input
          key={i}
          value={a.text}
          onChange={e => {
            const copy = [...answers];
            copy[i].text = e.target.value;
            setAnswers(copy);
          }}
          placeholder={`Answer ${i + 1}`}
        />
      ))}
      <button type="button" onClick={() => setAnswers([...answers, { id: answers.length + 1, text: '' }])}>Add Answer</button>
      <button type="submit">Save</button>
    </form>
  );
};

export default QuizForm;
