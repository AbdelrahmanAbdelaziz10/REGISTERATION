import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;