import { login, signUp } from '@/api/useApi';
import LoginForm from '@/components/LoginForm';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useShowConfirmToast } from '@/hooks/useComfirmToast';
import { AuthSchema } from '@/schema';
import { LoginParams } from '@/store/useAuthStore';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { confirmToast } = useShowConfirmToast();

  const goToMain = () => {
    navigate('/');
  };

  // 회원가입
  const handleSubmit: SubmitHandler<z.infer<typeof AuthSchema>> = async (data) => {
    console.log(data);
    try {
      const res = await signUp(data);
      console.log('회원가입 성공:', res);

      toast({
        title: '회원가입 성공',
        action: <ToastAction altText="닫기"></ToastAction>,
      });

      setTimeout(() => {
        goToMain();
      }, 3000);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  // 로그인
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>, data: LoginParams) => {
    e.preventDefault();
    try {
      const res = await login(data);
      console.log('로그인 성공:', res);
      localStorage.setItem('token', res.token); // 토큰 저장

      confirmToast({
        title: res.message,
        callbackConfirm: () => goToMain,
        showCancel: false,
        duration: 1000,
      });

      setTimeout(() => {
        goToMain();
      }, 1000);
    } catch (error) {
      console.error('로그인 실패:', error);
      toast({
        variant: 'destructive',
        title: '아이디 또는 비밀번호를 다시 확인해주세요.',
        action: <ToastAction altText="닫기">닫기</ToastAction>,
      });
    }
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
