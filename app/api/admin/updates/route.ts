import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import UpdatesModel from "@/models/updates";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { ResponseType } from "@/types/response";
import { zodUpdates } from "@/zod/updates";

// Auth helper
async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token) !== null;
}

// POST: Add a new Update
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
        const validation = zodUpdates.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { title, description, type, files } = validation.data;
        const newUpdate = await UpdatesModel.create({
            title,
            description,
            type,
            files: files || [],
        });

        return NextResponse.json({
            success: true,
            message: "Update added successfully",
            data: newUpdate,
            statusCode: 201,
            error: null,
        }, { status: 201 });

    } catch (error) {
        console.error("Updates POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PUT: Modify an existing Update
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
        const { id, ...updateFields } = body;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Update ID is required",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to update",
            }, { status: 400 });
        }

        // Validate the update fields using Zod
        const validation = zodUpdates.safeParse(updateFields);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const { title, description, type, files } = validation.data;
        const updatedUpdate = await UpdatesModel.findByIdAndUpdate(
            id,
            { title, description, type, files: files || [], updatedAt: new Date() },
            { new: true }
        );

        if (!updatedUpdate) {
            return NextResponse.json({
                success: false,
                message: "Update not found",
                data: null,
                statusCode: 404,
                error: "No update found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Update modified successfully",
            data: updatedUpdate,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Updates PUT error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// DELETE: Delete an Update
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
                message: "Update ID is required in query parameters",
                data: null,
                statusCode: 400,
                error: "Please provide an ID to delete",
            }, { status: 400 });
        }

        const deletedUpdate = await UpdatesModel.findByIdAndDelete(id);

        if (!deletedUpdate) {
            return NextResponse.json({
                success: false,
                message: "Update not found",
                data: null,
                statusCode: 404,
                error: "No update found with this ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Update deleted successfully",
            data: deletedUpdate,
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Updates DELETE error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
