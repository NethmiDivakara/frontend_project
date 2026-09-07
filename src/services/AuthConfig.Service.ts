import { callApi } from './ApiService.Services';
import type { AxiosObject } from '../types/Axios.Types';
import type { 
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '../types/AuthDetails';

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const apiObject: AxiosObject = {
    method: "POST",
    endpoint: "auth/login",
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

export async function refreshAccessToken(payload: RefreshTokenPayload): Promise<RefreshTokenResponse> {
  const apiObject: AxiosObject = {
    method: "POST",
    endpoint: "auth/refresh",
    body: payload,
  };

  return callApi<RefreshTokenResponse>(apiObject);
}

export async function logoutUser(payload: LogoutPayload): Promise<LogoutResponse> {
  const apiObject: AxiosObject = {
    method: "POST", 
    endpoint: "auth/logout", 
    body: payload,
  };

  return callApi<LogoutResponse>(apiObject);
}