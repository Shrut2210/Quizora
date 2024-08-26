import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
import dotenv from "dotenv";
import _ from "lodash";

dotenv.config();

export const POST = async (req: Request) => {
    try {
        await dbConnect();
	    const id = req.url!.split("quiz/")[1].split("/edit")[0];
        
        const {quizData} = await req.json();        
        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });
        }

        const questions = quizData.questions;
        
        let finalQuestions :any=[]

        if(!_.isEqual(questions, quiz.questions)) {
            for (const id of quiz.questions) {
                await Question.findOneAndDelete({ _id: id });
            }
            
            for (const que of questions) {
                const question = new Question(que);
                await question.save();
                finalQuestions.push(question._id);
            }
        }else{
            finalQuestions = quiz.questions;
        }

        await Quiz.findByIdAndUpdate(id,{
          title: quizData.title,
          quizId: quizData.quizId,
          description: quizData.description,
          timeLimit: quizData.timeLimit,
          questions: finalQuestions,
          difficultyLevel: quizData.difficultyLevel,
          category: quizData.category,
          visibility : quizData.visibility,
          tags: quizData.tags,
          totalQuestions : quizData.totalQuestions,
          creatorId : quizData.creatorId,
          updatedAt: Date.now()
        });

        return NextResponse.json({ success: true, message: "Quiz updated successfully" }, { status: 200 });

    }catch (err){
        console.log(err);
        return NextResponse.json(
            { success: false, message: "EDIT : Error while fetching quiz" },
            { status: 500 }
        );
    }
}