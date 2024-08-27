import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import pptx2json from "pptx2json";
import dotenv from "dotenv";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JSZip from "jszip";
import path from "path";
import { PDFDocument } from "pdf-lib";

// import PptxGenJs from "node-pptx";

// import { PptxParser } from "pptx2json";
// import officeParser from "office-parser";



dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Extract text from PDF
export async function extractTextFromPDF(filePath: any) {
  console.log("Occured at extractPdf function");
   try {
    console.log(filePath);
    return "Hello"
     // Path to the PDF file in your project folder
    //  const filePath = path.join(process.cwd(), filePath);

    //  const pdfBuffer = fs.readFileSync(filePath);
    //  const data = await pdfParse(pdfBuffer);

   } catch (error) {
     console.error("Error extracting text from PDF:", error);
     return "ERROR";
   }
}

// Extract text from Word
export async function extractTextFromWord(filePath: any) {
  const { value: text } = await mammoth.extractRawText({ path: filePath });
  return text;
}


// export const extractTextFromPPT = async (filePath: string): Promise<string> => {
//   const absolutePath = path.resolve(filePath);
//   const buffer = fs.readFileSync(absolutePath);

//   const parser = new PptxParser();
//   const presentation = await parser.parse(buffer);

//   let extractedText = "";

//   presentation.slides.forEach((slide:any) => {
//     slide.content.forEach((content:any) => {
//       if (content.type === "text") {
//         extractedText += `${content.text}\n`;
//       }
//     });
//   });

//   return extractedText;
// };


// Gemini API interaction
export async function getResponseFromGemini(text: any, type: any, prompt : any) {
  if (type === "text") {
    const result = await model.generateContent(prompt + text);
    return result.response.text();
  } else if (type === "chat") {
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(prompt + text);
    return result.response.text();
  }
}

// import { parse } from 'pptx-parse';
// import fs from 'fs';

// async function extractTextFromPptx(filePath : any) {
//   try {
//     const fileBuffer = fs.readFileSync(filePath);
//     const pptxData = await parse(fileBuffer);

//     // Extract text from parsed data
//     const textContent = pptxData.slides.map(slide =>
//       slide.texts.map(text => text.text).join(' ')
//     ).join('\n');

//     console.log('Extracted Text:', textContent);
//     return textContent;
//   } catch (error) {
//     console.error('Error extracting text from PPTX:', error);
//     throw error;
//   }
// }

// extractTextFromPptx('path/to/your/file.pptx');
