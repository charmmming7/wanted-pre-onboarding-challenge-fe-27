import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

interface CustomError extends Error {
  message: string;
}

const ErrorPage = () => {
  const error = useRouteError() as CustomError;

  return (
    <div>
      <h1>404 에러</h1>
      <p>{error.message}</p>
      <Link to="/">메인 페이지로 가기</Link>
    </div>
  );
};

export default ErrorPage;
