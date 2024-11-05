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

// 1-3) Todos 관련 API 함수
export const getTodos = async () => {
  const response = await api.get('/todos');
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
export const login = async ({ email, password }: LoginParams) => {
  console.log(email, password);
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const signUp = async ({ email, password }: LoginParams) => {
  // const response = await api.post('/users/create', { email, password });
  // return response.data;
  console.log(email, password);
  try {
    const response = await axios.post('http://localhost:8080/users/create', { email, password });
    console.log('응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리하도록 합니다.
  }
};
