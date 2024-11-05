import { signUp } from '@/api/useApi';
import LoginForm from '@/components/LoginForm';
import { useToast } from '@/hooks/use-toast';
import { AuthSchema } from '@/schema';
import { LoginParams } from '@/store/useAuthStore';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const Auth = () => {
  const { toast } = useToast();
  // const [result, setResult] = useState<any>(null);

  // 회원가입
  const handleSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async (data) => {
    console.log(data);

    // try {
    //   const res = await signUp(data);
    //   console.log('회원가입 성공:', res);
    // } catch (error) {
    //   console.error('회원가입 실패:', error);
    // }
  };

  // 로그인
  const handleLogin = async (data: LoginParams) => {
    // console.log(data);
    // try {
    //   const res = await login(data);
    //   console.log('로그인 성공:', res);
    //   localStorage.setItem('token', res.token); // 토큰 저장
    // } catch (error) {
    //   console.error('로그인 실패:', error);
    // }
    // if (error) {
    //   toast({
    //     title: '아이디 또는 비밀번호를 다시 확인해주세요.',
    //     action: <ToastAction altText="닫기">닫기</ToastAction>,
    //   });
    // } else {
    //   console.log('성공');
    // }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <LoginForm
        onSubmit={handleSubmit}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Auth;
