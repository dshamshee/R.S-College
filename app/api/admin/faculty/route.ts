import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import FacultyModel from "@/models/faculty";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { ResponseType } from "@/types/response";
import { zodFaculty } from "@/zod/faculty";

async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token) !== null;
}

// GET: Fetch all faculties for admin
export async function GET(): Promise<NextResponse<ResponseType>> {
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
        const faculties = await FacultyModel.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            message: "Faculties fetched successfully",
            data: faculties,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Faculty GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// POST: Add new faculty
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

        const validation = zodFaculty.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const newFaculty = await FacultyModel.create(validation.data);

        return NextResponse.json({
            success: true,
            message: "Faculty created successfully",
            data: newFaculty,
            statusCode: 201,
            error: null,
        }, { status: 201 });
    } catch (error) {
        console.error("Admin Faculty POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PUT: Update existing faculty
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
        const { id, ...facultyData } = body;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Faculty ID is required",
                data: null,
                statusCode: 400,
                error: "ID parameter missing",
            }, { status: 400 });
        }

        const validation = zodFaculty.safeParse(facultyData);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const updatedFaculty = await FacultyModel.findByIdAndUpdate(
            id,
            { ...validation.data, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedFaculty) {
            return NextResponse.json({
                success: false,
                message: "Faculty not found",
                data: null,
                statusCode: 404,
                error: "No faculty found with provided ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Faculty updated successfully",
            data: updatedFaculty,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Faculty PUT error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// DELETE: Delete faculty record
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
                message: "Faculty ID required",
                data: null,
                statusCode: 400,
                error: "ID query param missing",
            }, { status: 400 });
        }

        const deleted = await FacultyModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({
                success: false,
                message: "Faculty not found",
                data: null,
                statusCode: 404,
                error: "No faculty record found with ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Faculty deleted successfully",
            data: deleted,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Faculty DELETE error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
