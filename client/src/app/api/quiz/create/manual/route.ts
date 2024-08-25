import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import User from "@/app/api/models/user.model";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
import dotenv from "dotenv";
import client from "@/lib/redis";
const { v4: uuidv4 } = require('uuid');
dotenv.config()

export const POST = async(res : Request)=>{
    try{
        await dbConnect();
        await client.connect();
        const {title, description, timeLimit, difficultyLevel, category, visibility, tags, totalQuestions, creatorId} = await res.json();
        const quizId = uuidv4().slice(0,6);

        const quizKey = `quiz:12v32r2vftt`
        
        console.log(quizId)
        const questions = await client.hGetAll(quizKey);
        // console.log(questions);
        
        const questionKeys = [];
        
        // const allQuestions = await client.hgetall(key);

        // Parse each field's JSON string back into an object
        for (let field in questions) {
            let q = JSON.parse(questions[field]);
            questionKeys.push(q);
        }

        const finalQuestions :any=[]

        for (const element of questionKeys) {
          const question = new Question(element);
          await question.save();
          finalQuestions.push(question._id);
        }
        
        console.log(finalQuestions);

        const quiz = new Quiz({
          title,
          quizId,
          description,
          timeLimit,
          questions:finalQuestions,
          difficultyLevel,
          category,
          visibility,
          tags,
          totalQuestions,
          creatorId,
        });
        
        await quiz.save();
        // await client.del(quizKey);
        await client.quit();
        
        return NextResponse.json({success:true,data:quiz},{status:200})
    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:"Error while fetching quiz"},{status:500})
    }
}
