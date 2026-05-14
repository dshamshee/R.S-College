import { ResponseType } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import UpdatesModel from "@/models/updates";

export async function GET(request: NextRequest): Promise<NextResponse<ResponseType>>{

    try {
        await dbConnect();
        const updates = await UpdatesModel.find();

        if(!updates){
            return NextResponse.json({
                success: false,
                message: "No updates found",
                data: null,
                statusCode: 404,
                error: "No updates found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Updates fetched successfully",
            data: updates,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error as string,
        }, { status: 500 });
    }
}