export type LoginPayload = {
  email: string;
  password: string;
};

type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  avatar_url: string | null;
  phone: string;
  address: string;
  is_active: boolean;
  permissions: string[];
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  role:string;
};

export type AuthTokens = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    auth: AuthTokens;
  };
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  address: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    auth: AuthTokens;
  };
};