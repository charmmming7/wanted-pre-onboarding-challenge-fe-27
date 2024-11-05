import { z } from 'zod';

// 사용자 계정 검증 스키마 정의
export const AuthSchema = z.object({
  email: z.string().max(50).email({ message: '유효한 이메일 주소를 입력하세요. @, . 이 포함되어야 합니다.' }), // 이메일 형식 검증
  password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }).max(50), // 최소 길이 8자
});
