import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SingUpPage';
import PasswordRecoveryPage from './Pages/PasswordRecoveryPage';
import ServiceRequest from './Pages/ServiceRequest';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { DashBoard } from './Pages/DashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />, // Redirect to dashboard if logged in
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashBoard />,
          },
          {
            path: '/service-request',
            element: <ServiceRequest />,
          },
          // Add other protected routes here
        ],
      },
    ],
  },
]);

export default router;