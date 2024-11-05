import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// 버튼이 있는 커스텀 토스트를 띄우는 함수
export const useShowConfirmToast = () => {
  const { toast, dismiss } = useToast();

  // toast 함수 정의
  const confirmToast = (props: any) => {
    const { title, callbackConfirm, showCancel, duration } = props; // TODO: props 정의

    const handleConfirm = () => {
      callbackConfirm();
      dismiss();
    };

    // const handleCancel = () => {
    //   dismiss();
    //   if (callbackCancel) {
    //     callbackCancel();
    //   }
    // };

    toast({
      title: title,
      description: (
        <div className="mt-2 flex gap-2">
          <Button onClick={handleConfirm}>확인</Button>
          {showCancel && (
            <Button
              variant="outline"
              onClick={() => dismiss()}
            >
              취소
            </Button>
          )}
        </div>
      ),
      duration: duration ? duration : 3000, // 자동으로 닫히지 않도록 설정
    });
  };

  return { confirmToast };
};
