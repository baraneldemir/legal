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
    
      <div className="flex justify-between items-center p-4  border-b border-gray-300 max-w-4xl mx-auto w-full">
        
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
        />
      </div>

      
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-4xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Active Sessions</h2>
            <Link to='/chat' className="bg-gray-800 hover:bg-slate-700 text-white rounded-lg shadow-xl transition duration-200 px-4 py-2">
              Create New Session
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            
            {Sessions.map((session) => (
              <div key={session.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{session.name}</h3>
                  <p className="text-sm text-gray-500">{session.details}</p>
                </div>
                
                <Link to='/chat' className="next-page-triangle cursor-pointer"></Link>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className=" p-4 border-t border-gray-300 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-2">Archived Sessions ({Sessions.length})</h2>
        <div className="flex overflow-x-auto gap-4">
          {Sessions.map((session) => (
            <div key={session.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <p className="text-sm text-gray-500">{session.details}</p>
              </div>
              
              <Link to='/chat' className="next-page-triangle cursor-pointer"></Link>
            </div>
          ))}
        </div>
      </div>

     
      <style jsx>{`
        .next-page-triangle {
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 12px solid gray;
        }
      `}</style>
    </div>
  );
}
