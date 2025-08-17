import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SingUpPage';
import PasswordRecoveryPage from './Pages/PasswordRecoveryPage';
import ServiceRequest from './Pages/ServiceRequest';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DashBoard from './Pages/DashBoard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      // {
      //   path: '/password-recovery',
      //   element: <PasswordRecoveryPage />,
      // },
      // {
      //   path: '/signup',
      //   element: <SingUpPage />,
      // },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/service-request',
            element: <ServiceRequest />,
          },
          {
            path: '/dashboard',
            element: <DashBoard />,
          },
          // Add other protected routes here
        ],
      },
    ],
  },
]);

export default router;