import TodoList, { TodoItemProps } from '@/components/Todo/TodoList';
import { Button } from '@/components/ui/button';

const todolist: TodoItemProps[] = [
  {
    title: 'hi',
    content: 'hello',
    id: 'z3FGrcRL55qDCFnP4KRtn',
    createdAt: '2022-07-24T14:15:55.537Z',
    updatedAt: '2022-07-24T14:15:55.537Z',
  },
  {
    title: 'hi',
    content: 'hello',
    id: 'z3FGrcRL55qDCFnP4KRtn1',
    createdAt: '2022-07-24T14:15:55.537Z',
    updatedAt: '2022-07-24T14:15:55.537Z',
  },
];

// const todos: TodoItem[] = await getTodos();
// console.log(todos); // 바로 배열로 접근

const Home = () => {
  return (
    <div className="m-auto flex h-screen max-w-2xl flex-col p-6 text-center">
      <div className="mb-5">
        <h1>TODO LIST</h1>
        <div className="flex w-full">
          <Button className="ms-auto">+ 추가</Button>
        </div>
      </div>

      <TodoList data={todolist} />
    </div>
  );
};

export default Home;
