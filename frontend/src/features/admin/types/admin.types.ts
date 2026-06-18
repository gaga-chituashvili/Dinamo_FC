export interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "user";
}

export interface JwtPayload {
  sub: string;
  name: string;
  role: "admin" | "user";
  exp: number;
}
