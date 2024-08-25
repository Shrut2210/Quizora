import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import User from "../../models/user.model";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const { username, password, email } = await req.json();
    const hashedPassword = await hash(password, 10);
    //token creation code for jwt
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const newUser = await User.create({
      userID: Math.random().toString(36).substr(2, 9)+'@'+username,
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: newUser._id }, secretKey, {
      expiresIn: "1h",
    });
    
    newUser.token = token;

    newUser.save();

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return NextResponse.json(
      { success: true, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error while Creating user",
      },
      { status: 500 }
    );
  }
};
