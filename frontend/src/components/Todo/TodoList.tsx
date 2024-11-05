import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShowConfirmToast } from '@/hooks/useComfirmToast';
import { deleteTodo, getTodos } from '@/api/useApi';
import axios from 'axios';

export interface TodoItemProps {
  title: string;
  content?: string;
  id: string;
  createdAt: string; // ISO 형식 날짜 문자열
  updatedAt: string; // ISO 형식 날짜 문자열
}

export interface TodoListProps {
  data: TodoItemProps[];
}

const TodoItem = ({ data }: { data: TodoItemProps }) => {
  const { confirmToast } = useShowConfirmToast();
  const navigate = useNavigate();

  const handleDeleteTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    confirmToast({
      title: '할 일을 삭제하시겠습니까?',
      callbackConfirm: fetchDeleteTodo,
      showCancel: true,
    });
  };

  const fetchDeleteTodo = async () => {
    try {
      const response = await deleteTodo(data.id);
      console.log(response);
      // TODO: 목록 다시 조회 추가
      navigate(0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        console.error('Todos 삭제 실패:', error.response?.data || error.message);
        console.error('상태 코드:', error.response?.status);
      } else {
        console.error('알 수 없는 오류:', error);
      }
    }
  };

  return (
    <Card className="flex h-auto flex-row justify-between gap-2 p-4">
      <Link
        to={`/todo/${data.id}`}
        className="flex-1 overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-left leading-9"
      >
        {data.title}
      </Link>

      <div className="flex flex-shrink-0 gap-1">
        <Button
          variant="destructive"
          size="icon"
          onClick={handleDeleteTodo}
        >
          <span className="blind">삭제</span>
          <Trash2 />
        </Button>

        <Link
          to={`/todo/${data.id}`}
          className={buttonVariants({ size: 'icon' })}
        >
          <span className="blind">수정</span>
          <Pencil />
        </Link>
      </div>
    </Card>
  );
};

// TODO: { data }: TodoListProps에서 TodoItemProps[] 를 타입으로 지정해주면 오류나는 이유?
const TodoList = ({ data }: TodoListProps) => {
  return (
    <Card className="mt-2 min-h-20 w-full overflow-y-auto bg-zinc-100">
      <CardContent className="flex flex-col gap-3 pt-6">
        {data &&
          data.length > 0 &&
          data.map((item: TodoItemProps, i: number) => {
            return (
              <TodoItem
                key={i}
                data={item}
              />
            );
          })}
      </CardContent>
    </Card>
  );
};
export default TodoList;
