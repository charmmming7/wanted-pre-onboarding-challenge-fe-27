import { getTodoById, updateTodo } from '@/api/useApi';
import { TodoItemProps } from '@/components/Todo/TodoList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Clock, Pencil, Trash2 } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const formatToKoreanDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TodoDetail = () => {
  const { id } = useParams<{ id?: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => setIsEditing(!isEditing);
  const [data, setData] = useState<TodoItemProps>({
    id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
  });

  const handleChangeTitle = (value: string) => {
    setData({
      ...data,
      title: value,
    });
  };

  const handleChangeContent = (value: string) => {
    setData({
      ...data,
      content: value,
    });
  };

  const fetchTodo = async () => {
    try {
      const response = await getTodoById(id as string);
      setData(response);
    } catch (error) {
      console.error('Todos 가져오기 실패:', error);
    }
  };

  const fetchUpdateTodo = async () => {
    try {
      const response = await updateTodo(data.id, data.title, data.content);
      setData(response);
    } catch (error) {
      console.error('Todos 가져오기 실패:', error);
    } finally {
      fetchTodo();
    }
  };

  const handleUpdate = async () => {
    fetchUpdateTodo();
  };

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  return (
    <div className="rounded-xl bg-zinc-100 p-8">
      <div className="mb-5 text-center">
        <h1>TODO LIST 상세페이지</h1>
      </div>
      <Card className="m-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            {!isEditing ? (
              <h2 className="leading-9">{data?.title}</h2>
            ) : (
              <div className="flex w-full flex-col">
                <Input
                  id="title"
                  value={data?.title || ''}
                  placeholder={data?.title}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {' '}
            <span>
              <span className="blind">생성일</span>
              <Clock /> {formatToKoreanDate(data?.createdAt)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              {!isEditing ? (
                <p className="min-h-[60px] px-3 py-2">{data?.content}</p>
              ) : (
                <div className="flex w-full flex-col">
                  <Textarea
                    id="content"
                    placeholder="내용을 입력해주세요"
                    value={data?.content || ''}
                    onChange={(e) => handleChangeContent(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="ms-auto mt-4 flex gap-1">
              <Button
                variant="destructive"
                size="icon"
              >
                <span className="blind">삭제</span>
                <Trash2 />
              </Button>

              {!isEditing ? (
                <Button
                  onClick={handleEditToggle}
                  size="icon"
                >
                  <span className="blind">수정하기</span>
                  <Pencil />
                </Button>
              ) : (
                <Button
                  onClick={handleUpdate}
                  size="icon"
                >
                  <span className="blind">수정 적용</span>
                  <Check />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoDetail;
