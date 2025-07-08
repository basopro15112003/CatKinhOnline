import request from "@/utils/baseURL";
import type { APIResponse } from "./userService";
import type { AxiosResponse } from "axios";

export interface ViewOrder {
  id: number,
  userId: number,
  fullName: string,
  phone: string,
  email: string,
  shippingAddressId: number,
  createdAt: string,
  status: number,
  deliveryType: number,
  paymentMethod: number,
  note: string,
  totalAmount: number,
  orderItems: OrderItems[]
}

export interface Order {
    id: number,
    userId: number,
    fullName: string,
    phone: string,
    email: string,
    shippingAddressId: number,
    createdAt: string,
    status: number,
    deliveryType: number,
    paymentMethod: number,
    note: string,
    totalAmount: number,
}

export interface OrderItems {
    id: number;
    orderId: number;
    productId: number;
    widthM: number;
    heightM: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }

  export interface OrderCreateRequest{
    order: Order;
    orderItems: OrderItems[];
  }

  export const getOrders = async ():Promise<APIResponse> => {
    try {
        const response:AxiosResponse<APIResponse> = await request.get("Order");
        if (response.data.isSuccess) {
            return response.data;
        } else {
            return {
                isSuccess: false,
                message: response.data.message,
                result: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
            result: [],
        };
    }
  }

  export const addOrder = async (orderCreateRequest: OrderCreateRequest) => {
    try {
        const response = await request.post("Order", orderCreateRequest);
        console.log(response.data); 
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
  } 
   export const getOrderById = async (id: number):Promise<APIResponse> => {
    try {
        const response:AxiosResponse<APIResponse> = await request.get(`Order/${id}`);
        if (response.data.isSuccess) {
            return response.data;
        } else {
            return {
                isSuccess: false,
                message: response.data.message,
                result: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
            result: [],
        };
    }
  }

  export const getOrderByUserId = async (userId: number):Promise<APIResponse> => {
    try {
        const response:AxiosResponse<APIResponse> = await request.get(`Order/user/${userId}`);
        if (response.data.isSuccess) {
            return response.data;
        } else {
            return {
                isSuccess: false,
                message: response.data.message,
                result: [],
            };
        }
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
            result: [],
        };
    }
  }
export const updateOrderStatus = async (id: number, status: number): Promise<APIResponse> => {
  try {
    const response: AxiosResponse<APIResponse> = await request.put(`Order/${id}/status/${status}`);
    if (response.data.isSuccess) {
      return response.data;
    } else {
              return {
          isSuccess: false,
          message: response.data.message,
          result: {},
        };
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Đã có lỗi xảy ra khi kết nối tới máy chủ.",
      result: {},
    };
  }
}
