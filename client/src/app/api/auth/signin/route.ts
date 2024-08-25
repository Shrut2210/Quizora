import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import User from "@/app/api/models/user.model";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request) {
  const { password, email } = await req.json();

  await dbConnect();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Credentials are invalid" },
        { status: 401 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Credentials are invalid" },
        { status: 401 }
      );
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    user.token = token;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Credentials are valid." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while authenticating user:", error);
    return NextResponse.json(
      { success: false, message: "Error while authenticating user" },
      { status: 500 }
    );
  }
}
