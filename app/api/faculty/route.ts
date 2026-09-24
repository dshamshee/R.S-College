import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import FacultyModel from "@/models/faculty";
import { ResponseType } from "@/types/response";

export async function GET(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        const query = type ? { type: type.toUpperCase() } : {};
        const faculties = await FacultyModel.find(query).sort({ name: 1 });

        return NextResponse.json({
            success: true,
            message: "Faculties fetched successfully",
            data: faculties,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Public Faculty GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch faculties",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
