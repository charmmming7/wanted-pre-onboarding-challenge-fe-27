import { createTodo } from '@/api/useApi';
import { TodoItemProps } from '@/components/Todo/TodoList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useShowConfirmToast } from '@/hooks/useComfirmToast';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTodo = (id: string) => {
  const navigate = useNavigate();
  const { confirmToast } = useShowConfirmToast();

  const [data, setData] = useState<TodoItemProps>({
    id: '',
    title: '',
    content: '',
    createdAt: '', // TODO: 날짜 저장안하려면 각 페이지마다 TodoItemProps 따로 있어야 할지
    updatedAt: '',
  });

  const goToMain = () => {
    navigate('/');
  };

  const fetchCreateTodo = async () => {
    try {
      const response = await createTodo(data.title, data.content);
      console.log(response);
      setData(response);
      goToMain(); // 메인으로 이동
    } catch (error) {
      console.error('Todos 추가하기 실패:', error);

      confirmToast({
        title: '할 일 추가에 실패하였습니다.',
        callbackConfirm: null,
        showCancel: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchCreateTodo();
  };

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

  return (
    <div className="rounded-xl bg-zinc-100 p-8">
      <div className="mb-5 text-center">
        <h1>TODO LIST 추가</h1>
      </div>
      <Card className="m-auto max-w-2xl">
        <form onSubmit={fetchCreateTodo}>
          <CardHeader>
            <CardTitle>
              <div className="flex w-full flex-col">
                <Input
                  id="title"
                  name="title"
                  placeholder="제목을 입력해주세요"
                  value={data.title}
                  // onChange={(e) => handleChangeTitle(e.target.value)}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  autoFocus
                  required
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="flex w-full flex-col">
                <Textarea
                  id="content"
                  name="content"
                  placeholder="내용을 입력해주세요"
                  value={data.content}
                  // onChange={(e) => handleChangeContent(e.target.value)}
                  onChange={(e) => setData({ ...data, content: e.target.value })}
                />
              </div>
              <div className="ms-auto mt-4 flex gap-1">
                <Button type="submit">추가하기</Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default AddTodo;
