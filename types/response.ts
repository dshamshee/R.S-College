
export interface ResponseType{
    success: boolean;
    message: string;
    data: unknown
    statusCode?: number;
    error: unknown | null;
}