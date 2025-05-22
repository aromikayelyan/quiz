import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch('http://localhost:8004/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn-primary"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('http://localhost:8004/log', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         navigate('/');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Network error');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={e => setUsername(e.target.value)}
//         className="mb-3 w-full px-4 py-2 border border-gray-300 rounded-md"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
//       />
//       <button
//         onClick={handleLogin}
//         className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;