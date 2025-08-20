import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import { SidebarProvider } from "./components/Context/SidebarContext";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Outlet />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
