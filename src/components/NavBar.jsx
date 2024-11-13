import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../utilities/users-service'
import SignUpFormModal from './SignUpFormModal';
import LoginFormModal from './LoginFormModal';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ user, setUser }) {
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [showSignUpFormModal, setShowSignUpFormModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  function handleLogOut() {
    userService.logOut();
    navigate('/');
    setUser(null);
  }

  return (
    <nav className={`bg-gradient-to-r ${darkMode ? 'from-slate-700 to-slate-300' : 'from-gray-900 to-gray-700' } shadow-lg`}>
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to='/' className="text-3xl font-bold text-white transition-transform duration-300 transform hover:scale-110">
          MyLegalAI
        </Link>


        <div className="hidden space-x-8 text-white md:flex">
          <Link to="/" className="transition-colors duration-200 hover:scale-110">About</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110">Services</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110">Contact</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110">Settings</Link>
          <button onClick={toggleDarkMode} className="px-1 text-gray-800 bg-white hover:scale-150 rounded-xl hover:bg-gray-200">
            {darkMode ? '🌞' : '🌙'}
          </button>
          {user ? 
          <>
            <h2>Welcome {user.name}</h2>
            <button onClick={handleLogOut}>Log Out</button>
          </> 
          :
          <>
            <button onClick={() => setShowLoginFormModal(true)}>Login</button>
            <button onClick={() => setShowSignUpFormModal(true)}>SignUp</button>
          </>
          }
        </div>
          


        
        
        <button onClick={toggleSidebar} className="flex items-center text-white md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        </div>
      


      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r ${darkMode ? 'from-gray-900 to-gray-700' : 'from-slate-600 to-slate-400'} shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 rounded-l-3xl`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link to='/' onClick={toggleSidebar} className="text-3xl font-bold text-white">MyLegalAI</Link>
          <button onClick={toggleSidebar} className="text-white">
            <svg className="w-6 h-6 transition-transform duration-300 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4 text-white">
          <Link to="/" className="transition-colors duration-200 hover:scale-110" onClick={toggleSidebar}>About</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110" onClick={toggleSidebar}>Services</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110" onClick={toggleSidebar}>Contact</Link>
          <Link to="/" className="transition-colors duration-200 hover:scale-110" onClick={toggleSidebar}>Settings</Link>
          
        </div>
      </div>


      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

<LoginFormModal show={showLoginFormModal} handleClose={() => setShowLoginFormModal(false)} setUser={setUser} />
<SignUpFormModal show={showSignUpFormModal} handleClose={() => setShowSignUpFormModal(false)} setUser={setUser} />
    </nav>
  );
}
