// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  email: string;
  unique_name: string;
  exp: number;
  role: string;
}

  export function getUserFromToken(): { role:string } | null {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      sessionStorage.setItem("name",  payload.unique_name );
      sessionStorage.setItem("email", payload.email);
      return { role: payload.role};
    } catch {
      return null;
    }
}




