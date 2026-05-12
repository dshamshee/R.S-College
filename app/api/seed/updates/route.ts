import dbConnect from "@/config/dbConnection";
import { ResponseType } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";
import UpdatesModel from "@/models/updates";
import { UpdatesType } from "@/models/updates";

export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>>{

    try {

        const {title, description, type, files} = await request.json();

        if(!title || !description || !type){
            return NextResponse.json({
                success: false,
                message: "All fields are required",
                data: null,
                statusCode: 400,
                error: "Please provide all the fields",
            }, { status: 400 });
        }

        await dbConnect();
        const newUpdate: UpdatesType = await UpdatesModel.create({
            title,
            description,
            type,
            files,
        });

        return NextResponse.json({
            success: true,
            message: "Data seeded successfully",
            data: newUpdate,
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