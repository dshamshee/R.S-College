import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/config/dbConnection";
import AdminModel from "@/models/admin";
import { hashPassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { ResponseType } from "@/types/response";

export async function POST(request: NextRequest): Promise<NextResponse<ResponseType>> {
    try {
        await dbConnect();

        // 1. Auto-seed admin user if none exists
        const adminCount = await AdminModel.countDocuments();
        if (adminCount === 0) {
            const seedUsername = process.env.ADMIN_USERNAME || "admin";
            const seedPassword = process.env.ADMIN_PASSWORD || "admin123";
            const hashedPassword = hashPassword(seedPassword);

            await AdminModel.create({
                username: seedUsername,
                password: hashedPassword,
            });
            console.log(`Auto-seeded admin user: ${seedUsername}`);
        }

        // 2. Parse request body
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({
                success: false,
                message: "Username and password are required",
                data: null,
                statusCode: 400,
                error: "Username and password are required",
            }, { status: 400 });
        }

        // 3. Find admin by username
        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials",
                data: null,
                statusCode: 401,
                error: "Invalid username or password",
            }, { status: 401 });
        }

        // 4. Verify password
        const hashedInput = hashPassword(password);
        if (admin.password !== hashedInput) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials",
                data: null,
                statusCode: 401,
                error: "Invalid username or password",
            }, { status: 401 });
        }

        // 5. Generate token
        const token = generateToken({
            id: admin._id.toString(),
            username: admin.username,
        });

        // 6. Set HttpOnly JWT cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({
            success: true,
            message: "Login successful",
            data: {
                username: admin.username,
            },
            statusCode: 200,
            error: null,
        }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            data: null,
            statusCode: 500,
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
