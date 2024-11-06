import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav className={`bg-gradient-to-r ${darkMode ? 'from-slate-700 to-slate-300' : 'from-gray-900 to-gray-700' } shadow-lg`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to='/' className="text-3xl font-bold text-white transform transition-transform duration-300 hover:scale-110">
          MyLegalAI
        </Link>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-8 text-white">
          <Link to="/about" className="hover:scale-110 transition-colors duration-200">About</Link>
          <Link to="/services" className="hover:scale-110 transition-colors duration-200">Services</Link>
          <Link to="/contact" className="hover:scale-110 transition-colors duration-200">Contact</Link>
          <Link to="/settings" className="hover:scale-110 transition-colors duration-200">Settings</Link>
          <button onClick={toggleDarkMode} className="hover:scale-150 bg-white text-gray-800 rounded-xl px-1 hover:bg-gray-200">
            {darkMode ? '🌙' : '🌞'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        
        
        <button onClick={toggleSidebar} className="md:hidden flex items-center text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        </div>
      

      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r ${darkMode ? 'from-gray-900 to-gray-700' : 'from-slate-600 to-slate-400'} shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 rounded-l-3xl`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <Link to='/' onClick={toggleSidebar} className="text-3xl font-bold text-white">MyLegalAI</Link>
          <button onClick={toggleSidebar} className="text-white">
            <svg className="w-6 h-6 transform transition-transform duration-300 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4 text-white">
          <Link to="/about" className="hover:scale-110 transition-colors duration-200" onClick={toggleSidebar}>About</Link>
          <Link to="/services" className="hover:scale-110 transition-colors duration-200" onClick={toggleSidebar}>Services</Link>
          <Link to="/contact" className="hover:scale-110 transition-colors duration-200" onClick={toggleSidebar}>Contact</Link>
          <Link to="/settings" className="hover:scale-110 transition-colors duration-200" onClick={toggleSidebar}>Settings</Link>
          
        </div>
      </div>

      {/* Overlay for closing sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
}
