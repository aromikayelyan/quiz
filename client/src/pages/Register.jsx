import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    const res = await fetch('http://localhost:8004/reg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.message?.includes('удачно')) {
      alert('Регистрация прошла успешно. Можете войти.');
      navigate('/login');
    } else {
      alert(data.message || 'Registration error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="form-input"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-input"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={register}
       className="btn-primary"
      >
        Register
      </button>
    </div>
  );
};

export default Register;