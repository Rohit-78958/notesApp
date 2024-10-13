import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
      toast.error('Username already exists');
      return;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('Registration successful');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster/>
      <div className="px-10 py-8 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register a new account</h3>
        <form onSubmit={handleRegister}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input type="text" placeholder="Username" id="username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600"
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password" id="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" placeholder="Confirm Password" id="confirmPassword"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-yellow-400 rounded-lg hover:bg-yellow-700">Register</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
