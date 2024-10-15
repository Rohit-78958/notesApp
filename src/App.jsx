import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setScrollWidth(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <div className="seek-bar" style={{ width: `${scrollWidth}%` }}></div>
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

function PrivateRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? children : 
    ( 
      toast.error('Please login to access this page'),
      <Navigate to="/login" />

    );
}

export default App
