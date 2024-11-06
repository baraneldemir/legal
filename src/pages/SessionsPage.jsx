import React from 'react';
import { Link } from 'react-router-dom';

export default function SessionsPage() {
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
          className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
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
                
                <Link to='/chat' className="cursor-pointer next-page-triangle hover:scale-150 "></Link>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="w-full max-w-4xl p-4 mx-auto border-t border-gray-300 ">
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

     
      <style jsx>{`
        .next-page-triangle {
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 14px solid gray;
        }
      `}</style>
    </div>
  );
}
