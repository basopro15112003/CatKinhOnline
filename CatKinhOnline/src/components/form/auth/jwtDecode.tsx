// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  email: string;
  unique_name: string;
  exp: number;
}

  export function getUserFromToken(): { email: string; name: string } | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = jwtDecode<JwtPayload>(token);
        localStorage.setItem("name",  payload.unique_name );
        localStorage.setItem("email", payload.email);

      return { email: payload.email, name: payload.unique_name };
    } catch {
      return null;
    }
}


