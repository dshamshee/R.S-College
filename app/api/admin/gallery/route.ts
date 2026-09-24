import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import GalleryModel from "@/models/galarry";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { ResponseType } from "@/types/response";
import { zodGallery } from "@/zod/gallery";

async function checkAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    return verifyToken(token) !== null;
}

// GET: Fetch all gallery items for admin
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
        const items = await GalleryModel.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            message: "Gallery items fetched successfully",
            data: items,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Gallery GET error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// POST: Add new gallery item
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

        const validation = zodGallery.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const newItem = await GalleryModel.create(validation.data);

        return NextResponse.json({
            success: true,
            message: "Gallery item created successfully",
            data: newItem,
            statusCode: 201,
            error: null,
        }, { status: 201 });
    } catch (error) {
        console.error("Admin Gallery POST error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// PUT: Update existing gallery item
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
        const { id, ...galleryData } = body;

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Gallery ID is required",
                data: null,
                statusCode: 400,
                error: "ID parameter missing",
            }, { status: 400 });
        }

        const validation = zodGallery.safeParse(galleryData);
        if (!validation.success) {
            return NextResponse.json({
                success: false,
                message: "Validation failed",
                data: null,
                statusCode: 400,
                error: validation.error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(", "),
            }, { status: 400 });
        }

        const updatedItem = await GalleryModel.findByIdAndUpdate(
            id,
            { ...validation.data, updatedAt: new Date() },
            { new: true }
        );

        if (!updatedItem) {
            return NextResponse.json({
                success: false,
                message: "Gallery item not found",
                data: null,
                statusCode: 404,
                error: "No gallery item found with provided ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Gallery item updated successfully",
            data: updatedItem,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Gallery PUT error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}

// DELETE: Delete gallery item
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
                message: "Gallery ID required",
                data: null,
                statusCode: 400,
                error: "ID query param missing",
            }, { status: 400 });
        }

        const deleted = await GalleryModel.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({
                success: false,
                message: "Gallery item not found",
                data: null,
                statusCode: 404,
                error: "No gallery item found with ID",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Gallery item deleted successfully",
            data: deleted,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Admin Gallery DELETE error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
