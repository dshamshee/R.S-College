import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import FacultyModel from "@/models/faculty";
import { ResponseType } from "@/types/response";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse<ResponseType>> {
    try {
        await dbConnect();
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Faculty ID is required",
                data: null,
                statusCode: 400,
                error: "Missing ID parameter",
            }, { status: 400 });
        }

        const faculty = await FacultyModel.findById(id);

        if (!faculty) {
            return NextResponse.json({
                success: false,
                message: "Faculty member not found",
                data: null,
                statusCode: 404,
                error: "No faculty found with provided ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Faculty fetched successfully",
            data: faculty,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Public Single Faculty GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch faculty details",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
