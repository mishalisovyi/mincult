/* Request View Models */

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

/* Response View Models */

export interface UserRegisterResponse {
  content: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
}

export interface UserLoginResponse {
  content: {
    id: number;
    token: string;
    email: string;
    role: string;
  }
}

export interface UserLogoutResponse {
  content: {
    detail: string;
  }
}