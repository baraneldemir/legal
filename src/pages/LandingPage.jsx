import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to programmatically navigate

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility
  const [error, setError] = useState(''); // Track error message
  const navigate = useNavigate(); // Initialize navigate function

  // List of UK Courts
  const courts = [
    'Divorce / Family Law',
    'Civil Disputes',
    'Employment Law',
    'Small Claims',
    'Criminal Law',
  ];

  // Filter courts based on user query
  const filteredCourts = courts.filter(court =>
    court.toLowerCase().includes(query.toLowerCase())
  );

  // Handle input focus and blur to show/hide dropdown
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => { setIsDropdownOpen(false); }, 100); // Delay to allow click on dropdown item
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleProceedClick = () => {
    if (!query) {
      setError('Please select or enter a court option to proceed.');
    } else {
      setError('');
      navigate('/sessions'); // Navigate only if query is valid
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full sm:w-3/4 md:w-1/2 px-4">

        <label className="block mb-2 text-center font-medium">
          Enter a brief description of your legal question or choose court manually
        </label>
        

        <div className="relative mb-4"> 
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}  
            onBlur={handleBlur}    
            placeholder="e.g., 'I want to take a case to court' or 'Which court should I file my claim?'"
            className="rounded-xl px-4 py-2 w-full text-gray-700 border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out pr-10"  // Added padding for the clear button
          />
          
     
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>


        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 mx-3 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto sm:w-full md:w-auto">
            <ul>
              {filteredCourts.length > 0 ? (
                filteredCourts.map((court, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
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
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
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
