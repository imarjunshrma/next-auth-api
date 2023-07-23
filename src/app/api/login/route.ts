/**
 * This TypeScript function handles user login by checking the email and password, verifying them, and
 * generating a JWT token for authentication.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request, such as headers, body, and query parameters. It is used to extract the email
 * and password from the request body.
 * @returns The code is returning a NextResponse object. If the email or password is missing, it
 * returns a JSON response with a "msg" property set to "invalid fields" and a status code of 400. If
 * the user is not found, it returns a JSON response with a "msg" property set to "User is not
 * available" and a status code of 409. If the password does
 */
import User from "@/Models/userModels";
import connection from "@/db/config";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body
    if (!email || !password) {
        return NextResponse.json({ msg: "invalid fields" }, { status: 400 })
    }
    connection()
    try {
        const isUserPresent = await User.findOne({ email });
        if (!isUserPresent) {
            return NextResponse.json({ msg: "User is not available" }, { status: 409 })
        }
        const isPasswordMatch = await bcrypt.compare(password, isUserPresent.password)
        if (!isPasswordMatch) {
            return NextResponse.json({ msg: "Invalid Credentials" }, { status: 409 })
        }
        const privateKey = crypto.randomUUID();
        const name = isUserPresent.name;
        const token = jwt.sign({ email, name }, privateKey)
        const response = NextResponse.json({ msg: "User successfull login", success: true }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: err, success: false }, { status: 500 })
    }
}
