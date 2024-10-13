import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  const isKnownRoute = ['/', '/login', '/register', '/app'].includes(location.pathname);

  const headerClasses = `flex items-center justify-center p-4 bg-gray-100 w-full ${
    isLoginOrRegister ? 'fixed top-0' : ''
  }`;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!isKnownRoute) return null;

  return (
    <header className={headerClasses}>
      <div className="flex-grow"></div>
      <div className="flex items-center justify-center">
        <img src={logo} alt="NotesKeeper logo" className="w-10 h-10 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">NotesBox</h1>
      </div>
      <div className="flex-grow flex justify-end">
        <div className="relative group">
          <button onClick={handleLogout} className="flex items-center">
            <MdLogout className="text-2xl text-gray-800 hover:scale-125 transition-all duration-300" />
          </button>
          <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-sm text-gray-700 text-center">Logout</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
