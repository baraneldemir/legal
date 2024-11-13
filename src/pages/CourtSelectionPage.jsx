import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CourtSelectionPage() {
    const [query, setQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const courts = [
      'Divorce / Family Law',
      'Civil Disputes',
      'Employment Law',
      'Small Claims',
      'Criminal Law',
    ];
  
    const filteredCourts = courts.filter(court =>
      court.toLowerCase().includes(query.toLowerCase())
    );
  
    const handleFocus = () => {
      setIsDropdownOpen(true);
    };
  
    const handleBlur = () => {
      setTimeout(() => { setIsDropdownOpen(false); }, 100);
    };
  
    const handleClear = () => {
      setQuery('');
    };
  
    const handleProceedClick = () => {
      if (!query) {
        setError('Please select or enter a court option to proceed.');
      } else {
        setError('');
        navigate('/sessions');
      }
    };
  
    return (
      <div className="flex items-center justify-center bg-slate-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
        <div className="w-full px-4 sm:w-3/4 md:w-1/2">
          <label className="block m-3 font-medium text-center">
            Enter a brief description of your legal question or choose court manually
          </label>
          
          <div className="relative mb-2"> 
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleFocus}  
              onBlur={handleBlur}    
              placeholder="e.g., 'I want to take a case to court' or 'Which court should I file my claim?'"
              className="w-full px-4 py-2 pr-10 text-gray-700 transition duration-300 ease-in-out border border-gray-300 rounded-xl outline-1 outline-gray-900"
            />
            
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute p-1 text-gray-600 transform -translate-y-1/2 bg-gray-200 rounded-full right-2 top-1/2 hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
  
          {isDropdownOpen && (
            <div className="absolute z-10 overflow-y-auto bg-white border border-gray-300 shadow-lg rounded-xl ">
              <ul>
                {filteredCourts.length > 0 ? (
                  filteredCourts.map((court, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                      onClick={() => {
                        setQuery(court);
                        setIsDropdownOpen(false); 
                      }}
                    >
                      {court}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            </div>
          )}
  
          {error && (
            <p className="mt-2 text-sm text-center text-red-500">{error}</p>
          )}
  
          <div className="flex justify-end mt-4">
            <button
              onClick={handleProceedClick}
              className={`${
                !query ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 hover:bg-slate-700'
              } text-white px-6 py-2 rounded-full shadow-xl transition duration-200`}
              disabled={!query} 
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }
  