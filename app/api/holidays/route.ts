import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import HolidayModel from "@/models/holiday";
import VacationModel from "@/models/vacation";
import { ResponseType } from "@/types/response";

export async function GET(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        await dbConnect();
        
        // Fetch all holidays sorted by date ascending
        const holidays = await HolidayModel.find().sort({ date: 1 });
        
        // Fetch all vacations sorted by startDate ascending
        const vacations = await VacationModel.find().sort({ startDate: 1 });

        return NextResponse.json({
            success: true,
            message: "Holidays and vacations retrieved successfully",
            data: {
                holidays,
                vacations
            } as any,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Public holidays GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
