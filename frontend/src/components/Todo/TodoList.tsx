import { Button } from '@/components/ui/button';
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
  const handleEditToggle = () => setIsEditing(!isEditing);

  return (
    <Card className="flex flex-row justify-between gap-2 p-4">
      <Link
        to={`/todo/${data.id}`}
        className="flex-1 overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-left leading-9"
      >
        {data.title}
      </Link>

      <div className="flex flex-shrink-0">
        <Button
          variant="destructive"
          size="icon"
        >
          <span className="blind">삭제</span>
          <Trash2 />
        </Button>
        <Button
          onClick={handleEditToggle}
          size="icon"
        >
          <span className="blind">수정</span>
          <Pencil />
        </Button>
      </div>
    </Card>
  );
};

const TodoList = ({ data }: TodoListProps) => {
  console.log(data);
  return (
    <Card className="mt-2 h-full w-full overflow-y-auto bg-zinc-100">
      <CardContent className="flex flex-col gap-3 pt-6">
        {data &&
          data.length > 0 &&
          data.map((item: TodoItemProps, i: number) => {
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
