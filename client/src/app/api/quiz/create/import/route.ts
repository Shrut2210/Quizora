import { NextResponse } from "next/server";
import fs from "fs";
import download from "@/lib/download";
import csv from "csv-parser";
import path from "path";
import dbConnect from "@/app/api/db/dbConnection";
import Question from "@/app/api/models/question.model";
import Quiz from "@/app/api/models/quiz.model";
import User from "@/app/api/models/user.model";
const { v4: uuidv4 } = require("uuid");

export const POST = async (req: Request) => {
  let filePathForDelete = "";
  try {
    // console.log("checkpoint1");
    const {
      fileName,
      title,
      description,
      creatorId,
      timeLimit,
      difficultyLevel,
      category,
      visibility,
      tags,
      totalQuestions,
    } = await req.json();
    const filePath = await download(fileName);
    // console.log(path.join(process.cwd(), `/public/uploads/Book1.csv`))
    // const filePath = path.join(process.cwd(), `/public/uploads/Book1.csv`);
    console.log(filePath);
    filePathForDelete = filePath;

    const quizData: any = [];
    let fQuestions: any = [];
    // console.log("checkpoint2");
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row["Question Text"] !== "") {
          quizData.push(row);
        }
      })
      .on("end", async () => {
        // console.log("checkpoint3");
        // Convert the parsed CSV data into quiz questions
        const questions = quizData.map((row: any) => {
          console.log("reached here");
          return {
            questionText: row["Question Text"].trim(),
            options: getOptions(
              row["Option 1"],
              row["Option 2"],
              row["Option 3"],
              row["Option 4"],
              row["Correct Ans"]
            ),
            explanation: row["Answer Explanation"] || "No explanation provided",
            timeLimit: convertTimeFromSecToMin(row["Time in Seconds"]),
            points: parseInt(row["Points"]),
          };
        });
        // console.log("checkpoint4");
        // fQuestions = questions;
        await dbConnect();
        const quizId = uuidv4().slice(0, 6);
        const finalQuestions: any = [];
        // console.log("checkpoint5");
        for (const element of questions) {
          const question = new Question(element);
          await question.save();
          finalQuestions.push(question._id);
        }
        // console.log("checkpoint6");
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
          createdAt: new Date().toISOString().slice(0, 10),
        });

        await quiz.save();
        // console.log("checkpoint7");
        const user = await User.findById(creatorId);
        user.quizzesCreated.push(quiz._id);
        await user.save();
        // console.log("checkpoint8");
      });
    return NextResponse.json(
      { success: true, data: "passed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "IMPORT : Error processing file" },
      { status: 500 }
    );
  }
};

function getOptions(
  option1: any,
  option2: any,
  option3: any,
  option4: any,
  correctAns: any
) {
  let options: any = [];
  option1 = option1.trim();
  option2 = option2.trim();
  option3 = option3.trim();
  option4 = option4.trim();
  correctAns = correctAns.trim();

  if (correctAns.includes(",")) {
    correctAns = correctAns.split(",");
  }
  if (option1 != "") {
    options.push({
      optionText: option1,
      isCorrect: correctAns.includes(option1) || correctAns === option1,
    });
  }
  if (option2 != "") {
    options.push({
      optionText: option2,
      isCorrect: correctAns.includes(option2) || correctAns === option2,
    });
  }
  if (option3 != "") {
    options.push({
      optionText: option3,
      isCorrect: correctAns.includes(option3) || correctAns === option3,
    });
  }
  if (option4 != "") {
    options.push({
      optionText: option4,
      isCorrect: correctAns.includes(option4) || correctAns === option4,
    });
  }
  return options;
}

function convertTimeFromSecToMin(timeInSeconds: any) {
  return parseInt(timeInSeconds) / 60;
}
