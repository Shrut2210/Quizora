import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
import dotenv from "dotenv";

dotenv.config();

export const GET = async (req: Request) => {
    try {
        await dbConnect();
        const id = req.url!.split("quiz/")[1];
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });
        }
        const questions = [];
        for (const id of quiz.questions) {
            const question = await Question.findById(id);
            questions.push(question);
        }
        return NextResponse.json({ success: true, quiz: quiz, questions: questions }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "GET : Error while fetching quiz" },
            { status: 500 }
        );
    }
}