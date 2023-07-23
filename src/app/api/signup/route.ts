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
