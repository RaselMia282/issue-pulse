export interface TDecodedUser {
  id: number;
  name: string;
  role: "contributor" | "maintainer";
  iat?: number;
  exp?: number;
}