export interface TUserSignupPayload {
  name: string;
  email: string;
  password: string;
  role?: "contributor" | "maintainer";
}

export interface TUserLoginPayload {
  email: string;
  password: string;
}

