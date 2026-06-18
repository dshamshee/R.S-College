import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ResponseType } from "@/types/response";

export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        const cookieStore = await cookies();
        cookieStore.set("admin_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0), // expire immediately
        });

        return NextResponse.json({
            success: true,
            message: "Logout successful",
            data: null,
            statusCode: 200,
            error: null,
        }, { status: 200 });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
