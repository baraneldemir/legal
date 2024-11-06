
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SessionsPage from './pages/SessionsPage';
import NavBar from './components/NavBar';


function App() {
  return (
    <div >
      <NavBar/>
      <LandingPage/>
      <Routes>
        <Route path="/sessions" element={<SessionsPage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
