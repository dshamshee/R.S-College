import dbConnect from "@/config/dbConnection";
import { ResponseType } from "@/types/response";
import { NextRequest, NextResponse } from "next/server";
import UpdatesModel from "@/models/updates";
import { UpdatesType } from "@/models/updates";

export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>>{

    try {

        const sampleData = await request.json();
        console.log("sampleData", sampleData);

        if(!Array.isArray(sampleData) || sampleData.length === 0){
            return NextResponse.json({
                success: false,
                message: "Sample data is required",
                data: null,
                statusCode: 400,
                error: "Please provide sample data",
            }, { status: 400 });
        }

        await dbConnect();

        const newUpdates: UpdatesType[] = [];
        for(const data of sampleData){
            const {title, description, type, files} = data;
            const newUpdate: UpdatesType = await UpdatesModel.create({
                title,
                description,
                type,
                files,
            });
            newUpdates.push(newUpdate);
        }

        return NextResponse.json({
            success: true,
            message: "Data seeded successfully",
            data: newUpdates,
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