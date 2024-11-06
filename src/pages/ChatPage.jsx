import React from 'react';

export default function ChatPage() {
  return (
    <div className="flex flex-col bg-slate-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Centered Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Top Section: Search Bar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
          />
        </div>

        {/* Main Section: Chat and Actions */}
        <div className="flex-1 flex justify-center items-center p-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chat Box */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[550px]">
              <h2 className="text-xl font-semibold mb-4">Chat</h2>
              <div className="flex-1 rounded-lg p-4 overflow-y-auto">
                <p className="text-gray-500">Start chatting here...</p>
              </div>
              <input
                type="text"
                placeholder="Ask MyLegalAI..."
                className="mt-4 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Files and Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Files</h2>
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">File 1.pdf</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">File 2.docx</p>
                </div>
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">Action 1</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <p className="text-gray-700">Action 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
