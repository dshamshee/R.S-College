import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import VacationModel from "@/models/vacation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { ResponseType } from "@/types/response";
import { zodVacation } from "@/zod/vacation";

// Auth helper
async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token) !== null;
}

// POST: Add a new Vacation
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
        const validation = zodVacation.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { name, startDate, endDate } = validation.data;
        const newVacation = await VacationModel.create({
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });

        return NextResponse.json({
            success: true,
            message: "Vacation added successfully",
            data: newVacation,
            statusCode: 201,
            error: null,
        }, { status: 201 });

    } catch (error) {
        console.error("Vacations POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PUT: Modify an existing Vacation
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
        const { id, ...vacationFields } = body;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Vacation ID is required",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to update",
            }, { status: 400 });
        }

        // Validate the update fields using Zod
        const validation = zodVacation.safeParse(vacationFields);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { name, startDate, endDate } = validation.data;
        const updatedVacation = await VacationModel.findByIdAndUpdate(
            id,
            { name, startDate: new Date(startDate), endDate: new Date(endDate) },
            { new: true }
        );

        if (!updatedVacation) {
            return NextResponse.json({
                success: false,
                message: "Vacation not found",
                data: null,
                statusCode: 404,
                error: "No vacation found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Vacation modified successfully",
            data: updatedVacation,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Vacations PUT error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// DELETE: Delete a Vacation
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
                message: "Vacation ID is required in query parameters",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to delete",
            }, { status: 400 });
        }

        const deletedVacation = await VacationModel.findByIdAndDelete(id);

        if (!deletedVacation) {
            return NextResponse.json({
                success: false,
                message: "Vacation not found",
                data: null,
                statusCode: 404,
                error: "No vacation found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Vacation deleted successfully",
            data: deletedVacation,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Vacations DELETE error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
