import { TodoItemProps } from '@/components/Todo/TodoList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Clock, Pencil, Trash2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

const formatToKoreanDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const res: TodoItemProps = {
  title: 'hi',
  content: 'hello',
  id: 'z3FGrcRL55qDCFnP4KRtn',
  createdAt: '2022-07-24T14:15:55.537Z',
  updatedAt: '2022-07-24T14:15:55.537Z',
};

const TodoDetail = (id: string) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditToggle = () => setIsEditing(!isEditing);
  const [data, setData] = useState(res);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setData({
      ...data,
      content: e.target.value,
    });
  };

  return (
    <div className="h-screen bg-zinc-100 p-8">
      <div className="mb-5 text-center">
        <h1>TODO LIST 상세페이지</h1>
      </div>
      <Card className="m-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            {!isEditing ? (
              <h2 className="leading-9">{data.title}</h2>
            ) : (
              <div className="flex w-full flex-col">
                <Input
                  id="title"
                  value={data.title}
                  placeholder={data.title}
                  onChange={handleChangeTitle}
                  autoFocus
                />
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {' '}
            <span>
              <span className="blind">생성일</span>
              <Clock /> {formatToKoreanDate(data.createdAt)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div>
              {!isEditing ? (
                <p className="min-h-[60px] px-3 py-2">{data.content}</p>
              ) : (
                <div className="flex w-full flex-col">
                  <Textarea
                    id="content"
                    placeholder="내용을 입력해주세요"
                    value={data.content}
                    onChange={handleChangeContent}
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
              <Button
                onClick={handleEditToggle}
                size="icon"
              >
                {!isEditing ? (
                  <>
                    <span className="blind">수정하기</span>
                    <Pencil />
                  </>
                ) : (
                  <>
                    <span className="blind">수정 적용</span>
                    <Check />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoDetail;
