import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>QuizApp</h2>
        <nav>
          <Link to="/" style={{ marginRight: '1rem', color: 'white', fontWeight: '600' }}>Главная</Link>
          <Link to="/my-quizzes" style={{ marginRight: '1rem', color: 'white', fontWeight: '600' }}>Мои викторины</Link>
          <Link to="/login" style={{ marginRight: '1rem', color: 'white', fontWeight: '600' }}>Войти</Link>
          <Link to="/register" style={{ color: 'white', fontWeight: '600' }}>Регистрация</Link>
        </nav>
      </div>
    </header>
);

export default Header;




/* <header style={{ background: '#3b82f6', padding: '1rem 2rem', color: 'white' }}> */
      