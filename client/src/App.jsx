import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizList from './components/QuizList';
import MyQuizzes from './components/MyQuizzes';
import QuizHistory from './components/QuizHistory';
import QuizDetails from './components/QuizDetails';
import QuizForm from './components/QuizForm';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/history" element={<QuizHistory />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/create" element={<QuizForm />} />
        <Route path="/edit/:id" element={<QuizForm edit />} />
         <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
