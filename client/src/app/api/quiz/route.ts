import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
import dotenv from "dotenv";

dotenv.config();

export const GET = async (req: Request) => {
  try {
    await dbConnect();
    const quizzes = await Quiz.find();
    const resQuiz = [];

    for (const quiz of quizzes) {
      let questions: any = [];
      for (const id of quiz.questions) {
        const question = await Question.findById(id);
        questions.push(question);
      }
      resQuiz.push({ quiz: quiz, questions: questions });
    }

    return NextResponse.json({ success: true, data: resQuiz }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "GET : Error while fetching quiz" },
      { status: 500 }
    );
  }
};
