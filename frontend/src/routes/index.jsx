import ErrorPage from '@/ErrorPage';
import Layout from '@/components/Layout';
import TodoDetail from '@/components/Todo/TodoDetail';
import Auth from '@/pages/Auth';
import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AddTodo from '@/components/Todo/AddTodo';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        index: true,
        label: '메인페이지',
        element: <Home />,
      },
      {
        path: 'todo',
        element: <TodoDetail />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ':id',
            element: <TodoDetail />,
            label: '투두리스트 상세페이지',
          },
        ],
      },
      {
        path: 'add',
        element: <AddTodo />,
        label: '투두리스트 추가하기',
      },
      {
        path: 'auth',
        element: <Auth />,
        label: '로그인/회원가입',
      },
    ],
  },
]);

export { router };
