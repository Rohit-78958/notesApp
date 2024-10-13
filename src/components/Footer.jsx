import React from 'react'
import { useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  const isKnownRoute = ['/', '/login', '/register', '/app'].includes(location.pathname);

  const footerClasses = `text-center p-4 bg-gray-100 w-full font-semibold ${
    isLoginOrRegister ? 'fixed bottom-0' : 'mt-10'
  }`;

  if (!isKnownRoute) return null;

  return (
    <div className={footerClasses}>
      <p>© 2024 NoteBox By Rohit. All rights reserved.</p>
    </div>
  )
}

export default Footer
