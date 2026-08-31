import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Admin routes that require authentication
const protectedAdminPrefixes = ["/admin/dashboard"];

// Admin API routes that require authentication
const protectedApiPrefixes = [
    "/api/admin/logout",
    "/api/admin/holidays",
    "/api/admin/updates",
    "/api/admin/upload",
    "/api/admin/vacations",
    "/api/admin/seed-sample",
];

function isProtected(pathname: string, prefixes: string[]) {
    return prefixes.some(
        (p) => pathname === p || pathname.startsWith(`${p}/`)
    );
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Protect admin pages (except /admin/login) ───────────────
    if (isProtected(pathname, protectedAdminPrefixes)) {
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.redirect(
                new URL("/admin/login", request.url)
            );
        }
    }

    // ── Protect admin API routes (except /api/admin/login) ──────
    if (isProtected(pathname, protectedApiPrefixes)) {
        const token = request.cookies.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                    data: null,
                    statusCode: 401,
                    error: "Authentication required",
                },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

// Match admin pages and admin API routes
export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};

