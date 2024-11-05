import { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      navigate('/auth'); // 로그인 페이지로 리다이렉트
    }
    console.log(localStorage);
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
