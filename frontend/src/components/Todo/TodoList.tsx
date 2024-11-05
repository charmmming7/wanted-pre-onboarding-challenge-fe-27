import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [isEditing, setIsEditing] = useState(false);

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
            console.log(item);
            return (
              <TodoItem
                data={item}
                key={i}
              />
            );
          })}
      </CardContent>
    </Card>
  );
};
export default TodoList;
