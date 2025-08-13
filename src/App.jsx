import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <Outlet /> {/* This renders the matched child route */}

    </div>
  );
}

export default App;