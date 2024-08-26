// // src/app/api/upload/route.ts
// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parser
//   },
// };

// export async function POST(req: Request) {
//   const chunks: Uint8Array[] = [];

//   // Read the incoming request as a stream
//   const reader = req.body!.getReader();
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     chunks.push(value);
//   }

//   // Convert chunks into a complete Uint8Array
//   const fileBuffer = new Uint8Array(
//     chunks.reduce((acc, chunk) => acc + chunk.length, 0)
//   );

//   let offset = 0;
//   for (const chunk of chunks) {
//     fileBuffer.set(chunk, offset);
//     offset += chunk.length;
//   }

//   // Here, you would typically use a library to parse the multipart/form-data
//   // For simplicity, we're just saving the file to the server
//   const filePath = path.join(process.cwd(), "public/uploads", "uploadedFile");
//   fs.writeFileSync(filePath, fileBuffer);

//   // You would handle extraction and response logic here
//   // For now, we'll just respond with a success message
//   return NextResponse.json({ message: "File uploaded successfully!" });
// }

// const data = await req.formData();
// const file = data.get("file") as File | null;

import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import {
  extractTextFromPDF,
  extractTextFromPPT,
  extractTextFromWord,
  getResponseFromGemini,
} from "@/lib/gemini";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req: Request) {
  try {
    // Parse the incoming form data to handle file uploads
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const fileName: string = Math.random().toString(36).substring(2, 17);
    const fileExtension = file.type.split("/")[1];
    console.log(fileName, fileExtension);
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      `${fileName}.${fileExtension}`
    );

    // Convert the file to a buffer
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Save the file to the file system
    console.log("haise save chalu to thai gai");
    await fs.writeFile(filePath, buffer);
    console.log("haise save to thai gai");

    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: file.type,
      displayName: file.name,
    });

    const getResponse = await fileManager.getFile(uploadResponse.file.name);
    console.log(
      `Retrieved file ${getResponse.displayName} as ${getResponse.uri}`
    );

    let extractedText = "";

    console.log(uploadResponse.file.mimeType);

    console.log(filePath);
    
    // extractedText = await extractTextFromWord(filePath);
    extractedText = await extractTextFromPPT(filePath);
    console.log(extractedText);
         

    //  try {
    //    if (uploadResponse.file.mimeType === "application/pdf") {
    //      extractedText = await extractTextFromPDF(filePath);
    //    } else if (
    //      uploadResponse.file.mimeType ===
    //      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    //    ) {
    //      extractedText = await extractTextFromWord(filePath);
    //    } else if (
    //      uploadResponse.file.mimeType ===
    //      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    //    ) {
    //      extractedText = await extractTextFromPPT(filePath);
    //    } else {
    //      return NextResponse.json({ error: "Unsupported file type" });
    //    }

       const response = await getResponseFromGemini(
         extractedText,
         "text",
         "Generate a json which contains 5 question with 4 option for each from the data of this file."
     );

    return NextResponse.json({ message: response });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "GEMINI : Error while fetching quiz" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "File saved successfully",
  });
}
