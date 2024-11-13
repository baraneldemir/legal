import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SessionsPage() {
  const [isSearchExpanded, setSearchExpanded] = useState(false);

  const Sessions = [
    { id: 1, name: 'Parking Ticket', details: 'Waiting for Court hearing' },
    { id: 2, name: 'Divorce', details: 'Financial Statement awaiting' },
    { id: 3, name: 'Employment Dispute', details: 'Scheduled mediation next week' },
    { id: 4, name: 'Small Claims', details: 'Awaiting defendant’s response' },
    { id: 5, name: 'Property Dispute', details: 'Final evidence review pending' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex items-center justify-between w-full max-w-4xl p-4 mx-auto border-b border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg outline-1 outline-gray-900"
        />
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="w-full max-w-4xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Active Sessions</h2>
            <Link to='/chat' className="px-4 py-2 text-white transition duration-200 bg-gray-800 rounded-lg shadow-xl hover:bg-slate-700">
              Create New Session
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {Sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <div>
                  <h3 className="font-medium">{session.name}</h3>
                  <p className="text-sm text-gray-500">{session.details}</p>
                </div>
                <Link to='/chat' className="cursor-pointer next-page-triangle hover:scale-150"></Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 mx-auto border-t border-gray-300">
        <h2 className="mb-2 text-2xl font-semibold text-center">Archived Sessions ({Sessions.length})</h2>
        <div className="flex gap-4 overflow-x-auto">
          {Sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <p className="text-sm text-gray-500">{session.details}</p>
              </div>
              <Link to='/chat' className="cursor-pointer next-page-triangle hover:scale-150"></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Search Bar */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          isSearchExpanded ? 'w-full h-screen bg-white' : 'w-4/5 h-12 bg-gray-800'
        } rounded-full shadow-lg ${isSearchExpanded ? 'animate-expand' : 'animate-collapse'}`}
        onClick={() => setSearchExpanded(true)}
      >
        {isSearchExpanded ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4 text-xl font-semibold text-gray-700">
              What can I help you with?
            </div>
            <div className="flex items-center justify-center w-full">
              <input
                type="text"
                placeholder="I want to sue my partner..."
                className="w-3/4 p-4 text-lg border border-gray-300 rounded-lg outline-1 outline-black"
                autoFocus
              />
              <button
                className="px-4 py-2 ml-4 text-lg text-white bg-gray-800 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchExpanded(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full px-4 text-sm text-white">
            <svg className="w-5 h-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <span>What can I help with?</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .next-page-triangle {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 14px solid gray;
        }
        .animate-expand {
          animation: expand 0.5s forwards;
        }
        .animate-collapse {
          animation: collapse 0.5s forwards;
        }
        @keyframes expand {
          0% {
            height: 3rem;
          }
          100% {
            height: 100vh;
          }
        }
        @keyframes collapse {
          0% {
            height: 100vh;
          }
          100% {
            height: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
