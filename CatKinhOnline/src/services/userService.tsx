import type { AxiosResponse } from "axios";
import request from "../../src/utils/baseURL";
export type APIResponse = {
  isSuccess: boolean;
  message: string;
  result: object;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type UserProfile = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: number;
  status: number;
};

export type UpdateUserDto = {
  id: number;
  fullName: string;
  phone: string;
};

export type RegisterInput = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: number;
  status: number;
};

export type ChangePasswordInput ={
  newPassword: string;
  oldPassword: string;
}

export const changePassword = async (email: string, data:ChangePasswordInput):Promise<APIResponse> => {
  try {
    const response: AxiosResponse<APIResponse> = await request.put(`User/ChangePassword/${email}`, data) 
      return response.data
  } catch (error) {
    console.log(error)
        return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [],
    };
  }
}

export const registerNewUser = async (
  data: RegisterInput,
): Promise<APIResponse> => {
  try {
    const response: AxiosResponse<APIResponse> = await request.post(
      "User",
      data,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [],
    };
  }
};

export const getUsers = async (): Promise<UserProfile[] | null> => {
  try {
    const response: AxiosResponse<UserProfile[]> = await request.get("User");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const LoginJWT = async (data: LoginInput): Promise<string | null> => {
  try {
    const response: AxiosResponse<string> = await request.post(
      "Auth/LoginJWT",
      data,
    );
    return response.data;
  } catch (error) {
    if (error) return null;
    console.error("Error updating product", error);
    throw error;
  }
};

export const getUserProfile = async (
  email: string,
): Promise<UserProfile | null> => {
  try {
    const response: AxiosResponse<UserProfile> = await request.get(
      `User/${email}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserProfile = async (
  id: number,
  dto: UpdateUserDto,
): Promise<UpdateUserDto> => {
  const response = await request.put<UpdateUserDto>(`User/${id}`, dto);
  return response.data;
};
