import type { AxiosResponse } from "axios";
import request from "../../src/utils/baseURL";

export type Product = {
  id: number;
  productName: string;
  categoryId: number;
  pricePerM2: number;
  status: string;
};

//Get all Rooms in Database 
export const getProducts = async ():Promise<Product[]> => {
    try {
        const response:AxiosResponse<Product[]> = await request.get("Product")
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
