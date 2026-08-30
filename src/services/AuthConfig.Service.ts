import { callApi } from './ApiService.Services';
import type { AxiosObject } from '../types/Axios.Types';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types/AuthDetails';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const apiObject: AxiosObject = {
    method: "POST",
    endpoint: "auth/login",
    body: payload,
  };

  return callApi<LoginResponse>(apiObject);
}


export async function loginAdmin(payload: LoginPayload): Promise<LoginResponse> {
  const apiObject: AxiosObject = {
    method: "POST",
    endpoint: "auth/admin/login",
    body: payload,
  };

  return callApi<LoginResponse>(apiObject);
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const apiObject: AxiosObject = {
    method: "POST",
    endpoint: "auth/register",
    body: payload,
  };

  return callApi<RegisterResponse>(apiObject);
}