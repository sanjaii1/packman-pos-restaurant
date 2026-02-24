import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import PosMainPage from './pages/POS-Dash/PosMainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pos" element={<PosMainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
