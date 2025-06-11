import request from "@/utils/baseURL";
import type { AxiosResponse } from "axios";

export type Category = {id : number; categoryName : string, description: string}

export const getCategories = async ():Promise<Category[]> => {
    try {
        const response:AxiosResponse<Category[]> = await request.get("Category")
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}