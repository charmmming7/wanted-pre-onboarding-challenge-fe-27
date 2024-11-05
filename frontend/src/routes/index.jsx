import ErrorPage from '@/ErrorPage';
import Layout from '@/components/Layout';
import TodoDetail from '@/components/Todo/TodoDetail';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '',
    index: true,
    label: '메인페이지',
    element: <Home />,
  },
  {
    path: 'todo',
    element: <TodoDetail />,
    label: '투두리스트 상세페이지',
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':id',
        element: <TodoDetail />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

export { router };
