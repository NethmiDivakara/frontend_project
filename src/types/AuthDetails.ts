export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    email: string;
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
  name: string;
  email: string;
  phone: string;
  address: string;
};