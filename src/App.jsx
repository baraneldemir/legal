
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SessionsPage from './pages/SessionsPage';
import NavBar from './components/NavBar';
import ChatPage from './pages/ChatPage';


function App() {
  return (
    <div >
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/sessions" element={<SessionsPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
