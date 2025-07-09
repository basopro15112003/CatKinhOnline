import type { AxiosResponse } from "axios";
import request from "../../src/utils/baseURL";
import type { APIResponse } from "./userService";

 type Category = {
  id: number;
  categoryName: string;
  description: string;
};

export type Product = {
  id: number;
  productName: string;
  categoryId: number;
  pricePerM2: number;
  status: number    ;
  category: Category;
};


export type ProductInput = Omit<Product, "id" | "category">;


export const getProducts = async ():Promise<APIResponse> => {
    try {
        const response:AxiosResponse<APIResponse> = await request.get("Product")
        if(response.data.isSuccess){
            return response.data;
        }
        return {
            isSuccess: response.data.isSuccess,
            message: response.data.message,
            result: response.data.result
        };
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            message: "Lỗi khi lấy sản phẩm",
            result: []
        };
    }
}

export const getProductById = async (id: number): Promise<APIResponse | null> => {
  try {
    const response: AxiosResponse<APIResponse> = await request.get(`Product/${id}`);
    if(response.data.isSuccess){
      return response.data;
  }
  return {
      isSuccess: response.data.isSuccess,
      message: response.data.message,
      result: response.data.result
  };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: "Lỗi khi lấy sản phẩm",
      result: []
  };
  }
};

export const AddProduct = async(data:ProductInput ) => {
    try {
        const response:AxiosResponse<ProductInput >= await request.post("Product",data)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}
export const updateProduct = async (
  id: number,
  data: ProductInput
): Promise<APIResponse | null> => {
  try {
    const response: AxiosResponse<APIResponse> = await request.put(
      `Product/${id}`,
      data
    );
    if(response.data.isSuccess){
      return response.data;
  }
  return {
      isSuccess: response.data.isSuccess,
      message: response.data.message,
      result: response.data.result
  };
  } catch (error) {
    if (error) return null;
    console.error("Error updating product", error);
    throw error;
  }
};