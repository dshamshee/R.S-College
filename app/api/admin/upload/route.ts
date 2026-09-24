import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import sharp from "sharp";

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
        const targetFolder = (formData.get("folder") as string) || "RDS";

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "No file provided",
            }, { status: 400 });
        }

        // Max file size: 50MB for videos/files, 15MB for raw images
        const MAX_FILE_SIZE = 50 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({
                success: false,
                message: "File size exceeds 50MB limit.",
            }, { status: 400 });
        }

        // 3. Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        let buffer: Buffer = Buffer.from(arrayBuffer);

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        // 4. Compress image if it is an image using Sharp
        if (isImage) {
            try {
                // Compress image to WebP/JPEG format with max dimensions 1400px & 80% quality
                const compressed = await sharp(buffer)
                    .resize(1400, 1400, {
                        fit: "inside",
                        withoutEnlargement: true,
                    })
                    .webp({ quality: 80 })
                    .toBuffer();
                buffer = Buffer.from(compressed);
            } catch (sharpError) {
                console.warn("Sharp compression warning, falling back to original buffer:", sharpError);
            }
        }

        // 5. Configure Cloudinary upload options
        const uploadOptions: any = {
            folder: targetFolder, // Defaults to "RDS"
            resource_type: isVideo ? "video" : isImage ? "image" : "auto",
        };

        // 6. Upload stream to Cloudinary
        const uploadResult = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully to Cloudinary",
            url: uploadResult.secure_url,
            resource_type: uploadResult.resource_type,
            folder: targetFolder,
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
