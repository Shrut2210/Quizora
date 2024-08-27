import { NextResponse } from "next/server";
import fs from "fs";
import dbConnect from "@/app/api/db/dbConnection";
import {
  extractTextFromPDF,
  extractTextFromWord,
  getResponseFromGemini,
} from "@/lib/gemini";
import download from "@/lib/download";
const { v4: uuidv4 } = require('uuid');
import dotenv from "dotenv";
import User from "@/app/api/models/user.model";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
dotenv.config()


export const POST = async (req: Request) => {
  let filePathForDelete = "";
  try {
    await dbConnect();

    const { fileName, title, description, timeLimit, difficultyLevel, category, visibility, tags, totalQuestions, creatorId } = await req.json();

    console.log(fileName);
    const filePath = await download(fileName);
    console.log(filePath);
    filePathForDelete = filePath;
    let text;

    if (fileName.endsWith(".pdf")) {
      text = await extractTextFromPDF(filePath);
    } else if (fileName.endsWith(".docx")) {
      text = await extractTextFromWord(filePath);
    }
    if (text === "ERROR") {
      return NextResponse.json({ message: "AI : Error processing file" });
    }

    const prompt = "Generate a quiz based on the following text. Each question should be in the JSON format provided below, with `questionText`, `options`, `explanation`, `timeLimit`, and `points`. The `options` array should contain " + totalQuestions + " options, one of which is correct, and the others are incorrect. Include an explanation for each question, set a `timeLimit` of 20 seconds, and assign 10 points per question.\n\nHere is the JSON format for each question:\n\n{\n  \"question\": {\n    \"questionText\": \"xyzq\",\n    \"options\": [\n      {\n        \"optionText\": \"bjhbc\",\n        \"isCorrect\": true\n      },\n      {\n        \"optionText\": \"bjhbc\",\n        \"isCorrect\": false\n      },\n      {\n        \"optionText\": \"bjhbc\",\n        \"isCorrect\": false\n      }\n    ],\n    \"explanation\": \"fantastic\",\n    \"timeLimit\": 20,\n    \"points\": 10\n  }\n}\n\nPlease generate the questions based on the following text:\n\n. Please do not append anything at first and last in response json and return array of objects."

    const responseText = await getResponseFromGemini(text, "text", prompt);

    const questionsArray: [] = JSON.parse(responseText!);

    console.log(questionsArray);
    console.log(typeof questionsArray);


    const quizId = uuidv4().slice(0, 6);
    const quizKey = `quiz:${creatorId}`

    const finalQuestions: any = []

    for (const element of questionsArray) {
      let question: any = new Question((element as any).question);
      await question.save();
      finalQuestions.push(question._id);
    }

    const quiz = new Quiz({
      title,
      quizId,
      description,
      timeLimit,
      questions: finalQuestions,
      difficultyLevel,
      category,
      visibility,
      tags,
      totalQuestions,
      creatorId,
    });

    await quiz.save();

    const user = await User.findById(creatorId);
    user.quizzesCreated.push(quiz._id);
    await user.save();

    return NextResponse.json({
      message: "File processed and saved successfully",
      responseText: quiz
    });

  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ message: "AI : Error processing file" });
  } finally {
    // fs.unlinkSync(filePathForDelete);
  }
};
