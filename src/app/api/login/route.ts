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
