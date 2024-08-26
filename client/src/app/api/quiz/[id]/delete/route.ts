import { NextResponse } from "next/server";
import dbConnect from "@/app/api/db/dbConnection";
import User from "@/app/api/models/user.model";
import Quiz from "@/app/api/models/quiz.model";
import Question from "@/app/api/models/question.model";
import dotenv from "dotenv";

dotenv.config()

import { NextApiRequest } from "next";

//user , questions, 

export const DELETE = async(req: NextApiRequest) => {
    try {
        await dbConnect();
	    const id = req.url!.split("quiz/")[1].split("/delete")[0];

        console.log(id)
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });
        }

        for (const id of quiz.questions) {
          await Question.findOneAndDelete({ _id: id });
        }

        const user = await User.findById(quiz.creatorId);
        let index = user.quizzesCreated.indexOf(quiz._id)
        user.quizzesCreated.splice(index,1)
        await user.save();
        
        await Quiz.findByIdAndDelete(id);
        return NextResponse.json(
          { success: true, message: "Quiz deleted successfully" },
          { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
          { success: false, message: "DELETE : Error while fetching quiz" },
          { status: 500 }
        );
    }
}