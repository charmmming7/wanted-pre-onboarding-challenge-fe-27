import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthSchema } from '@/schema';
import { LoginParams } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type LoginFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof AuthSchema>>;
  onLogin: (data: LoginParams) => void;
};

type LoginFormInputs = z.infer<typeof AuthSchema>; // 타입 추론

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onLogin }) => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(AuthSchema),
    mode: 'onChange', // 입력이 변경될 때마다 유효성 검사를 실행
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    console.log(form);
  }, [form]);

  function getValues(): LoginParams {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <h1>로그인/회원가입</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="이메일을 입력해주세요"
                        {...field}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1.5">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        {...field}
                        className={errors.password ? 'border-red-500' : ''}
                      />
                    </FormControl>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-center gap-2">
                <Button
                  type="submit"
                  variant="outline"
                >
                  회원가입
                </Button>

                <Button
                  onClick={() => {
                    if (isValid) {
                      // 유효성 검사 통과 시에만 onLogin 호출
                      onLogin(getValues());
                    }
                  }}
                  className="w-full"
                  disabled={!isValid}
                >
                  로그인
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
