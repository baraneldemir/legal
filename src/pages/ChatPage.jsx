import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Predefined bot responses
  const botResponses = [
    "Hello! How can I assist you with your legal questions today?",
    "I can help with various legal matters. Could you provide more details?",
    "I'm here to guide you through your legal inquiries. What do you need assistance with?",
    "Please let me know the issue you're facing, and I’ll do my best to help.",
    "Feel free to ask me anything about the law. I’m here to help you navigate through it.",
    "I can help with legal documents, procedures, and advice. How can I assist you today?",
    "If you need clarification on legal terms or processes, just ask. I’m here to guide you.",
    "Would you like to know more about a specific area of law? I’m happy to provide guidance.",
    "I can provide general legal information, but remember, it's important to consult a professional for complex matters.",
    "If you're unsure about something legal, don’t hesitate to ask. I'm here to help you understand your rights and options.",
    "Got a legal question? I’m your digital lawyer in the cloud (minus the fancy briefcase).",
    "I’m not a real lawyer, but I sure do know a lot about the law! What can I help you with?",
    "The law can be tricky, but don’t worry—I’ll help you navigate through it. No need for a magnifying glass!",
    "If you ever find yourself in a legal pickle, I’m here to offer guidance (but no, I can't help with actual pickles).",
    "Did you know? In some places, it's illegal to chew gum while walking. I’m not here to give weird laws like that... unless you ask!",
    "It’s always a good idea to read the fine print. You don’t want a surprise bill for 'pizza delivery fees' after signing a contract!",
    "Need help with a contract? I can help! Just don’t ask me to sign anything—I’m a digital assistant, not a notary!",
    "If you’re thinking about signing something, maybe take a second to consider: 'Is this legally binding? Or am I just signing away my coffee addiction?'",
    "If you’re unsure, always remember: 'When in doubt, don’t sign it.' Unless it's a pizza order, of course. That’s always a good idea.",
    "I can’t tell you how to win a case, but I can certainly offer some sound legal advice: Never trust a pirate who offers you a free treasure map.",
    "I’m here to answer your legal questions, but I’ll leave the courtroom drama to the actors. I’d just be too good at it!",
    "Did you know? In some places, it's legal to marry a pizza if you really, really want to. But don’t take that as actual advice!",
    "Remember: A contract is only as good as the parties involved—unless it’s a pizza contract. That’s solid gold in my book!"
  ];

  const filteredBotResponses = [
    "Senin agzina sicarim sus lan amk npcsi",
    "Please refrain from using inappropriate language. I'm here to help with legal matters.",
    "olum bak seni yogurtlaya...",
    "yeter olum ne kufur bu.",
    "sus lan",
    "konumunu biliyorum kardesim atlayip gelirim bak hemen agzini topla"
  ];

  // Reference to the message container to scroll it into view
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial bot message when the component loads
    const initialBotMessage = {
      text: "Got a legal question? I’m your digital lawyer in the cloud (minus the fancy briefcase).",
      timestamp: new Date(),
      isUser: false,
    };
    setMessages([initialBotMessage]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, timestamp: new Date(), isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      // Check if the message contains 'sik'
      if (newMessage.toLowerCase().includes("sik","fuck")) {
        // Add the special bot response
        setTimeout(() => {
          const botMessage = {
            text: filteredBotResponses[Math.floor(Math.random() * filteredBotResponses.length)],
            timestamp: new Date(),
            isUser: false,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000); // 1-second delay for a more natural interaction
      } else {
        // Add a normal bot response
        setTimeout(() => {
          const botMessage = {
            text: botResponses[Math.floor(Math.random() * botResponses.length)],
            timestamp: new Date(),
            isUser: false,
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000); // 1-second delay
      }
    }
  };

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]); // Triggered when messages array changes

  return (
    <div className="flex flex-col bg-slate-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* Centered Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Top Section: Search Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <Link to='/sessions' className="cursor-pointer next-page-triangle hover:scale-125"></Link>
          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
  
        {/* Main Section: Chat and Actions */}
        <div className="flex items-center justify-center flex-1 p-4">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Chat Box */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[550px]">
              <h2 className="mb-4 text-xl font-semibold">Chat</h2>
  
              {/* Scrollable Message Container */}
              <div className="flex-1 p-4 overflow-y-auto rounded-lg max-h-96">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${msg.isUser ? 'ml-auto text-right' : 'mr-auto text-left'}`}
                  >
                    <div
                      className={`inline-block px-3 py-2 break-words rounded-lg ${
                        msg.isUser ? 'bg-slate-300' : 'bg-slate-100'
                      }`}
                      style={{
                        maxWidth: '80%', // Optional: adjust the maximum width to your liking
                      }}
                    >
                      <p className="text-gray-800">{msg.text}</p>
                    </div>
                    <small className="block mt-1 text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                ))}
                {/* Scroll to the bottom */}
                <div ref={messagesEndRef} />
              </div>
  
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button onClick={handleSendMessage} className="px-4 py-2 ml-2 text-white bg-gray-900 rounded-lg hover:bg-slate-600">
                  Send
                </button>
              </div>
            </div>
  
            {/* Files and Actions */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Files</h2>
              <div className="space-y-4">
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700">File 1.pdf</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700">File 2.docx</p>
                </div>
                <h2 className="mb-4 text-xl font-semibold">Actions</h2>
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700">Legal Action 1</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700">Legal Action 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
