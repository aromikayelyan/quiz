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
      

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => (
//   <header className="bg-blue-600 py-4 text-white">
//     <div className="container mx-auto flex justify-between items-center px-4">
//       <h1 className="text-2xl font-bold">QuizApp</h1>
//       <nav className="space-x-4">
//         <Link to="/" className="hover:underline">Главная</Link>
//         <Link to="/my-quizzes" className="hover:underline">Мои викторины</Link>
//         <Link to="/login" className="hover:underline">Войти</Link>
//         <Link to="/register" className="hover:underline">Регистрация</Link>
//       </nav>
//     </div>
//   </header>
// );

// export default Header;