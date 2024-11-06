import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSend } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";


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
  // "I can provide general legal information, but remember, it's important to consult a professional for complex matters.",
  // "If you're unsure about something legal, don’t hesitate to ask. I'm here to help you understand your rights and options.",
  // "Got a legal question? I’m your digital lawyer in the cloud (minus the fancy briefcase).",
  // "I’m not a real lawyer, but I sure do know a lot about the law! What can I help you with?",
  // "The law can be tricky, but don’t worry—I’ll help you navigate through it. No need for a magnifying glass!",
  // "If you ever find yourself in a legal pickle, I’m here to offer guidance (but no, I can't help with actual pickles).",
  // "Did you know? In some places, it's illegal to chew gum while walking. I’m not here to give weird laws like that... unless you ask!",
  // "It’s always a good idea to read the fine print. You don’t want a surprise bill for 'pizza delivery fees' after signing a contract!",
  // "Need help with a contract? I can help! Just don’t ask me to sign anything—I’m a digital assistant, not a notary!",
  // "If you’re thinking about signing something, maybe take a second to consider: 'Is this legally binding? Or am I just signing away my coffee addiction?'",
  // "If you’re unsure, always remember: 'When in doubt, don’t sign it.' Unless it's a pizza order, of course. That’s always a good idea.",
  // "I can’t tell you how to win a case, but I can certainly offer some sound legal advice: Never trust a pirate who offers you a free treasure map.",
  // "I’m here to answer your legal questions, but I’ll leave the courtroom drama to the actors. I’d just be too good at it!",
  // "Did you know? In some places, it's legal to marry a pizza if you really, really want to. But don’t take that as actual advice!",
  // "Remember: A contract is only as good as the parties involved—unless it’s a pizza contract. That’s solid gold in my book!"
];

const filteredBotResponses = [
  "I'll shut your mouth, you dirty bastard.",
  "Please refrain from using inappropriate language. I'm here to help with legal matters.",
  "You better watch out, I'll give you a piece of my mind.",
  "Enough with the swearing already.",
  "Shut up, idiot.",
  // "I know where you live, watch your mouth.",
  // "If I had a dollar for every swear word, I’d be richer than you, pal.",
  // "Did you say something? Oh wait, it was just a fart in words.",
  // "If you don’t stop cursing, I’ll turn this chat into a library. No swearing allowed.",
  // "What’s with the foul mouth? Did you just come from a pirate ship?",
  // "I’m here for legal advice, not a stand-up comedy show—stop cussing!",
  // "Hey, let’s keep it PG-13 here. I’m not your mom, but I’m definitely telling you off!",
  // "Watch it, or I'll slap a ‘Warning: Explicit Content’ sticker on this chat.",
  // "I can’t process that much negativity. Do you need a nap or something?",
  // "I’m a legal bot, not a punching bag for your bad mood!",
  // "You’ve got more swear words than a sailor on shore leave!",
  // "Come on, it's not even a Monday—chill out, buddy.",
  // "If I wanted to hear that much swearing, I’d watch a reality TV show.",
  // "Take it easy! I'm not the one who gets paid to deal with this stuff.",
  // "Is there a swear word contest happening? Because you're definitely winning!"
];



const offensiveWords = ["sik", "fuck"]; // Define offensive words list

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const botTimeoutRef = useRef(null); // Ref to store timeout ID
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial bot message
    setMessages([{ text: botResponses[0], timestamp: new Date(), isUser: false }]);

    // Cleanup on unmount
    return () => clearTimeout(botTimeoutRef.current);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, timestamp: new Date(), isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");

      const containsOffensiveWord = offensiveWords.some((word) =>
        newMessage.toLowerCase().includes(word)
      );
      const responseList = containsOffensiveWord ? filteredBotResponses : botResponses;

      // Clear any existing timeout
      clearTimeout(botTimeoutRef.current);

      // Set response timeout
      botTimeoutRef.current = setTimeout(() => {
        const botMessage = {
          text: responseList[Math.floor(Math.random() * responseList.length)],
          timestamp: new Date(),
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Set timeout to remove each message after 5 seconds
    if (messages.length > 0) {
      const removeTimeout = setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 50000); // Adjust delay as needed

      // Clear the timeout if component unmounts or messages change
      return () => clearTimeout(removeTimeout);
    }
  }, [messages]);

  return (
    <div className="flex items-center justify-center bg-slate-100" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <Link to='/sessions' className="cursor-pointer next-page-triangle hover:scale-125"></Link>
          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex items-center justify-center flex-1 p-4">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Chat Box */}
            <div className="bg-white p-6 rounded-lg shadow-md min-h-[550px] flex flex-col">
              <h2 className="mb-4 text-xl font-semibold">Chat</h2>
              <div className="flex-1 p-4 overflow-y-auto rounded-lg max-h-96">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${msg.isUser ? 'text-right ml-auto' : 'text-left mr-auto'}`}
                  >
                    <div
                      className={`inline-block px-3 py-2 break-words rounded-lg ${
                        msg.isUser ? 'bg-slate-300' : 'bg-slate-100'
                      }`}
                      style={{ maxWidth: '80%' }}
                    >
                      <p className="text-gray-800">{msg.text}</p>
                    </div>
                    <small className="block mt-1 text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center w-10 h-10 mr-2 transition-all duration-700 bg-gray-800 rounded-full cursor-pointer hover:scale-125">
                  <FaRegFile className="text-2xl text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Ask a question to MyLegalAi"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center w-10 h-10 ml-1 text-white bg-gray-900 rounded-full hover:bg-slate-600"
                >
                  <MdSend className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Files Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Files</h2>
              <div className="space-y-4">
                <div className="p-3 bg-gray-100 rounded-lg">File 1.pdf</div>
                <div className="p-3 bg-gray-100 rounded-lg">File 2.docx</div>
                <h2 className="mt-4 text-xl font-semibold">Actions</h2>
                <div className="p-3 bg-gray-100 rounded-lg">Legal Action 2</div>
                <div className="p-3 bg-gray-100 rounded-lg">Legal Action 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}