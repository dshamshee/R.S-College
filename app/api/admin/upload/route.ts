import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // 1. Verify Authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized. Please log in first.",
            }, { status: 401 });
        }

        // 2. Parse FormData
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "No file provided",
            }, { status: 400 });
        }

        // 3. Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 4. Upload stream to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto", // Automatically detects images, PDFs, etc.
                    folder: "rs_college_updates",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully to Cloudinary",
            url: uploadResult.secure_url,
        }, { status: 200 });

    } catch (error) {
        console.error("Upload route error:", error);
        return NextResponse.json({
            success: false,
            message: "Upload failed. Please check your Cloudinary credentials and try again.",
            error: error instanceof Error ? error.message : String(error),
        }, { status: 500 });
    }
}
