
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SessionsPage from './pages/SessionsPage';
import NavBar from './components/NavBar';
import ChatPage from './pages/ChatPage';
import { useState } from "react";
import { getUser } from './utilities/users-service';


function App() {

  const [user, setUser] = useState(getUser())

  return (
    <div >
      <NavBar user={user} setUser={setUser}/>
      
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/sessions" element={<SessionsPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
