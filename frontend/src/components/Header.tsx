import { Button } from '@/components/ui/button';
import { useShowConfirmToast } from '@/hooks/useComfirmToast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { confirmToast } = useShowConfirmToast();

  const goToLogin = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  useEffect(() => {
    const _isLoggedIn = localStorage.getItem('token');
    setIsLoggedIn(Boolean(_isLoggedIn));

    if (!_isLoggedIn) {
      navigate('/auth');
    }

    console.log('로그인상태: ', isLoggedIn, localStorage);
  }, [navigate, isLoggedIn]);

  return (
    <header className="flex justify-between px-2 py-3">
      {isLoggedIn && (
        <Button
          variant="outline"
          className="ms-auto"
          onClick={() =>
            confirmToast({
              title: '로그아웃 하시겠습니까?',
              callbackConfirm: goToLogin,
              showCancel: true,
              duration: Infinity,
            })
          }
        >
          로그아웃
        </Button>
      )}
    </header>
  );
};

export default Header;
