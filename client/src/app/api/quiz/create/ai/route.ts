import { NextResponse } from "next/server";
import fs from "fs";
import {
  extractTextFromPDF,
  extractTextFromWord,
  getResponseFromGemini,
} from "@/lib/gemini";
import download from "@/lib/download";

export const POST = async (req: Request) => {
  let filePathForDelete = "";
  try {
    const { fileName, prompt } = await req.json();

    const filePath = await download(fileName);
    consol
    filePathForDelete = filePath;
    let text = "";
    if (fileName.endsWith(".pdf")) {
      text = await extractTextFromPDF(filePath);
    } else if (fileName.endsWith(".docx")) {
      text = await extractTextFromWord(filePath);
    }
    if (text === "ERROR") {
      return NextResponse.json({ message: "AI : Error processing file" });
    }
    // const responseText = await getResponseFromGemini(text, "text", prompt);

    return NextResponse.json({
      message: "File processed and saved successfully",
      responseText:"Hey"
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json({ message: "AI : Error processing file" });
  } finally {
    // fs.unlinkSync(filePathForDelete);
  }
};
