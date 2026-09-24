import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import GalleryModel from "@/models/galarry";
import { ResponseType } from "@/types/response";

export async function GET(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const typeParam = searchParams.get("type");

        const query: any = {};
        if (typeParam && typeParam !== "ALL") {
            query.types = typeParam.toUpperCase();
        }

        const items = await GalleryModel.find(query).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            message: "Gallery items fetched successfully",
            data: items,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Public Gallery GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch gallery items",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
