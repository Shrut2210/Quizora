import { NextResponse } from "next/server";
import fs from "fs";
import download from "@/lib/download";
import csv from "csv-parser";
import path from "path";
import dbConnect from "@/app/api/db/dbConnection";
import Question from "@/app/api/models/question.model";
const { v4: uuidv4 } = require('uuid');


export const POST = async (req: Request) => {
  let filePathForDelete = "";
  try {
    const {fileName, title, description, creatorId, createdAt, updatedAt, timeLimit, difficultyLevel, category, visibility, tags, totalQuestions} = await req.json();
    // const filePath = await download(fileName);
    const filePath = path.join(process.cwd(), `/public/uploads/Book1.csv`);
    console.log(filePath);
    filePathForDelete = filePath;

    const quizData: any = [];
    let questions: any = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row["Question Text"] !== "") {
          quizData.push(row);
        }
      })
      .on("end", () => {
        // Convert the parsed CSV data into quiz questions
        questions = quizData.map((row : any) => {
          return { 
              questionText: row["Question Text"].trim(),
              options: getOptions(row["Option 1"], row["Option 2"], row["Option 3"], row["Option 4"], row["Correct Ans"]),
              explanation: row["Answer Explanation"].trim(),
              timeLimit: convertTimeFromSecToMin(row["Time in Seconds"]),
              points: parseInt(row["Points"])
          }
        })
        console.log("File Read Successfully");
      });

      await dbConnect();
      const quizId = uuidv4().slice(0,6);
      const quizKey = `quiz:${creatorId}`
      const finalQuestions :any=[]

        for (const element of questions) {
          const question = new Question(element);
          await question.save();
          finalQuestions.push(question._id);
        }
    } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "AI : Error processing file" },
      { status: 500 }
    );
  } finally {
    // fs.unlinkSync(filePathForDelete);
  }
};

function getOptions (option1 : any, option2: any, option3 : any, option4 : any, correctAns : any) {
    let options: any= []
    option1 = option1.trim();
    option2 = option2.trim();
    option3 = option3.trim();
    option4 = option4.trim();
    correctAns = correctAns.trim();
    
    if (correctAns.includes(",")) {
        correctAns = correctAns.split(",");
    }
    if (option1 != "") {
        options.push({ optionText: option1, isCorrect: correctAns.includes(option1) || correctAns === option1 });
    }
    if (option2 != "") {
        options.push({ optionText: option2, isCorrect: correctAns.includes(option2) || correctAns === option2 });
    }
    if (option3 != "") {
        options.push({ optionText: option3, isCorrect: correctAns.includes(option3) || correctAns === option3 });
    }
    if (option4 != "") {
        options.push({ optionText: option4, isCorrect: correctAns.includes(option4) || correctAns === option4 });
    }
    return options;
}

function convertTimeFromSecToMin(timeInSeconds:any) {
  return parseInt(timeInSeconds)/ 60;
}