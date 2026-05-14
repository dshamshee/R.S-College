'use server'
import axios from "axios";
import { ResponseType } from "@/types/response";

export const getUpdates = async (): Promise<ResponseType>=>{

    try {
        const response = await axios.get('http://localhost:3000/api/search/updates');

        if(!response.data.success){
            return {
                success: false,
                message: response.data.message,
                data: null,
                statusCode: response.data.statusCode,
                error: response.data.error,
            }
        }

        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
            statusCode: response.data.statusCode,
            error: null,
        }


    } catch (error) {
        
        return {
            success: false,
            message: "Internal Serrver Error",
            data: null,
            statusCode: 500,
            error: error as string,
        }
    }
}