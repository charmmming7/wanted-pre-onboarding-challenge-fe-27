import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

export { router };
