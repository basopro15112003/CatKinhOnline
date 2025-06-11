import type { AxiosResponse } from "axios";
import request from "../../src/utils/baseURL";

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


export const getProducts = async ():Promise<Product[]> => {
    try {
        const response:AxiosResponse<Product[]> = await request.get("Product")
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const AddProduct = async(data:ProductInput ) => {
    try {
        const response:AxiosResponse<ProductInput >= await request.post("Product",data)
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}
export const updateProduct = async (
  id: number,
  data: ProductInput
): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await request.put(
      `Product/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (error) return null;
    console.error("Error updating product", error);
    throw error;
  }
};