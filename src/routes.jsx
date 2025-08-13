import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './Pages/LoginPage';
import SingUpPage from './Pages/SingUpPage';
import PasswordRecoveryPage from './Pages/PasswordRecoveryPage';
import ServiceRequest from './Pages/ServiceRequest';

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
        path: '/password-recovery',
        element: <PasswordRecoveryPage />,
      },
      {
        path: '/signup',
        element: <SingUpPage />,
      },
      {
        path: '/service-request',  // Make sure this matches your navigation path
        element: <ServiceRequest />,
      },
    ],
  },
]);

export default router;