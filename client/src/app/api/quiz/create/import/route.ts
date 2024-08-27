import { NextResponse } from "next/server";
import fs from "fs";
import download from "@/lib/download";
import csv from "csv-parser";

export const POST = async (req: Request) => {
    let filePathForDelete = "";
    try {
        const {fileName, title, description, creatorId, createdAt, updatedAt, timeLimit, difficultyLevel, category, visibility, tags, totalQuestions} = await req.json();
        // const filePath = await download(fileName);
        const filePath = ""
        filePathForDelete = filePath;

        const quizData :any= [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          quizData.push(row);
        }).on('end', () => {
            // Convert the parsed CSV data into quiz questions
            // const questions = quizData.map((row : any) => ({
            //   questionText: row['Question Text'], 
            //   options: getOptions(row['Options 1'], row['Options 2'], row['Options 3'], row['Options 4'], row['Correct Ans']),
            // }))})
            console.log(quizData);
        
    })

    }catch(err) { 
        console.log(err);
        return NextResponse.json(
            { success: false, message: "AI : Error processing file" },
            { status: 500 }
        
    )}
    finally {
        fs.unlinkSync(filePathForDelete);
    }
}

// async function getOptions (option1 : any, option2: any, option3 : any, option4 : any, correctAns : any) {
//     let options: any= []
//     if (option1 != "") {
//         options.push({ optionText: option1, isCorrect: correctAns === option1 });
//     }

//     return options;
// }