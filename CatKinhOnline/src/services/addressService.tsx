import request from "@/utils/baseURL";
import axios, { type AxiosResponse } from "axios";
import type { APIResponse } from "./userService";

export interface Ward {
  code: string;
  name: string;
}
export interface District {
  code: string;
  name: string;
}
export interface Province {
  code: string;
  name: string;
}
export interface Address {
  id: number;
  userId: number;
  addressLine: string;
  contactName: string;
  contactPhone: string;
  note: string;
  isDefault: boolean;
}

const API_BASE = "https://provinces.open-api.vn/api";

export const addressService = {
  async getProvinces(): Promise<Province[]> {
    const res = await axios.get<Province[]>(`${API_BASE}/p?depth=1`);
    return res.data;
  },

  async getDistricts(provinceCode: string): Promise<District[]> {
    const res = await axios.get<{ districts: District[] }>(
      `${API_BASE}/p/${provinceCode}?depth=2`,
    );
    return res.data.districts;
  },

  async getWards(districtCode: string): Promise<Ward[]> {
    const res = await axios.get<{ wards: Ward[] }>(
      `${API_BASE}/d/${districtCode}?depth=2`,
    );
    return res.data.wards;
  },
};


export const getAddress = async ():Promise<APIResponse>=>{
  try {
    const response:AxiosResponse<APIResponse> = await request.get("Address")
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [],
    };
  }
}

export const getAddressByUserId = async (userId: number):Promise<APIResponse>=>{
  try {
    const response:AxiosResponse<APIResponse> = await request.get(`Address/user/${userId}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [],
    };
  }
}

export const deleteAddress = async (id: number):Promise<APIResponse>=>{
  try {
    const response:AxiosResponse<APIResponse> = await request.delete(`Address/${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [], 
    };
  }
}

export const updateAddress = async (id: number, address: Address):Promise<APIResponse>=>{
  try {
    const response:AxiosResponse<APIResponse> = await request.put(`Address/${id}`, address)
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [], 
    };
  }
}

export const createAddress = async (address: Address):Promise<APIResponse>=>{
  try {
    const response:AxiosResponse<APIResponse> = await request.post("Address", address)
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: [],   
    };
  }
}