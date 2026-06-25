import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import HolidayModel from "@/models/holiday";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { ResponseType } from "@/types/response";
import { zodHoliday } from "@/zod/holiday";

// Auth helper
async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token) !== null;
}

// POST: Add a new Holiday
export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        if (!await checkAuth()) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                data: null,
                statusCode: 401,
                error: "Unauthorized access",
            }, { status: 401 });
        }

        await dbConnect();
        const body = await request.json();

        // Validate using Zod
        const validation = zodHoliday.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { date, occasion, type } = validation.data;
        const newHoliday = await HolidayModel.create({
            date: new Date(date),
            occasion,
            type,
        });

        return NextResponse.json({
            success: true,
            message: "Holiday added successfully",
            data: newHoliday,
            statusCode: 201,
            error: null,
        }, { status: 201 });

    } catch (error) {
        console.error("Holidays POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PUT: Modify an existing Holiday
export async function PUT(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        if (!await checkAuth()) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                data: null,
                statusCode: 401,
                error: "Unauthorized access",
            }, { status: 401 });
        }

        await dbConnect();
        const body = await request.json();
        const { id, ...holidayFields } = body;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Holiday ID is required",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to update",
            }, { status: 400 });
        }

        // Validate the update fields using Zod
        const validation = zodHoliday.safeParse(holidayFields);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { date, occasion, type } = validation.data;
        const updatedHoliday = await HolidayModel.findByIdAndUpdate(
            id,
            { date: new Date(date), occasion, type },
            { new: true }
        );

        if (!updatedHoliday) {
            return NextResponse.json({
                success: false,
                message: "Holiday not found",
                data: null,
                statusCode: 404,
                error: "No holiday found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Holiday modified successfully",
            data: updatedHoliday,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Holidays PUT error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// DELETE: Delete a Holiday
export async function DELETE(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        if (!await checkAuth()) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                data: null,
                statusCode: 401,
                error: "Unauthorized access",
            }, { status: 401 });
        }

        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Holiday ID is required in query parameters",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to delete",
            }, { status: 400 });
        }

        const deletedHoliday = await HolidayModel.findByIdAndDelete(id);

        if (!deletedHoliday) {
            return NextResponse.json({
                success: false,
                message: "Holiday not found",
                data: null,
                statusCode: 404,
                error: "No holiday found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Holiday deleted successfully",
            data: deletedHoliday,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Holidays DELETE error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
