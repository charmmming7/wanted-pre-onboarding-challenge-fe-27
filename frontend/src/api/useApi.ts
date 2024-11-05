import axios from 'axios';
import { LoginParams } from './../store/useAuthStore';

const API_URL = 'http://localhost:8080';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Authorization Token 설정
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const fetchAPI = async (url: string, method: string, data: any) => {
  console.log(data);
  try {
    const response = await api.request({
      url: url,
      method: method,
      data: data,
    });
    console.log('응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API 요청 에러:', error.response?.data);
    } else {
      console.error('알 수 없는 에러:', error);
    }
    throw error;
  }
};

// 1-3) Todos 관련 API 함수
export const getTodos = async () => {
  const response = await fetchAPI('/todos', 'GET', null);
  return response.data;
};

export const getTodoById = async (id: string) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (title: string, content: string) => {
  const response = await api.post('/todos', { title, content });
  return response.data;
};

export const updateTodo = async (id: string, title: string, content: string) => {
  const response = await api.put(`/todos/${id}`, { title, content });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};

// 1-4) Auth 관련 API 함수
// 로그인
export const login = async ({ email, password }: LoginParams) => {
  return await fetchAPI('/users/login', 'POST', { email, password });
};

// 회원가입
export const signUp = async ({ email, password }: LoginParams) => {
  return await fetchAPI('/users/create', 'POST', { email, password });
};
