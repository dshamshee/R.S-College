import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rs_college_default_jwt_secret_key_123!";
const SALT = process.env.ADMIN_PASSWORD_SALT || "rs_college_salt_value";

export function hashPassword(password: string): string {
    return crypto.createHmac("sha256", SALT).update(password).digest("hex");
}

export function generateToken(payload: { id: string; username: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): { id: string; username: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
    } catch (error) {
        return null;
    }
}
