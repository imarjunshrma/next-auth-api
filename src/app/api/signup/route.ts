/**
 * This TypeScript function handles the POST request for user registration, including validation,
 * hashing the password, saving the user to the database, generating a JWT token, and setting it as a
 * cookie in the response.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request. It is used to extract the request body and other details.
 * @returns The code is returning a NextResponse object. If the fields in the request body are invalid,
 * it returns a JSON response with a "msg" property set to "invalid fields" and a status code of 400.
 * If the user is already present, it returns a JSON response with a "msg" property set to "User is
 * already present" and a status code of 409. If the
 */
import User from "@/Models/userModels";
import connection from "@/db/config";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const salt = 10;
export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password } = body
    if (!name || !email || !password) {
        return NextResponse.json({ msg: "invalid fields" }, { status: 400 })
    }
    connection()
    const isUserAlreadyPresent = await User.findOne({ email });
    if (isUserAlreadyPresent) {
        return NextResponse.json({ msg: "User is already present" }, { status: 409 })
    }
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        let user = new User({ email, password: hashPassword, name });
        const res = await user.save();
        const privateKey = crypto.randomUUID();
        const token = jwt.sign({ email, name }, privateKey)
        const response = NextResponse.json({ mgs: "ok", success: true }, { status: 201 })
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;
    } catch (err: any) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}
