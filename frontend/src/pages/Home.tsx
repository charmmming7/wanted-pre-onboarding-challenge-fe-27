import { getTodos } from '@/api/useApi';
import TodoList, { TodoItemProps } from '@/components/Todo/TodoList';
import { buttonVariants } from '@/components/ui/button';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);

  const fetchTodos = async () => {
    try {
      const fetchedTodos: TodoItemProps[] = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Todos 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div className="mb-5 text-center">
        <div className="relative w-full">
          <h1>TODO LIST</h1>

          <Link
            to="/add"
            className={cx(buttonVariants(), 'absolute right-0 top-0')}
          >
            + 추가
          </Link>
        </div>
      </div>

      <TodoList data={todos} />
    </>
  );
};

export default Home;
