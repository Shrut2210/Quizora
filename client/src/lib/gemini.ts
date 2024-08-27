import mammoth from "mammoth";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { pdfToText } from "pdf-ts";
import pptxgen from "pptxgenjs";
import {
  DocumentProcessorServiceClient,
  UploadDocumentRequest
} from "@google-cloud/documentai";


dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Extract text from PDF
export async function extractTextFromPDF(filePath: any) {
  console.log("Occured at extractPdf function ", filePath);
  try {
    const pdfBuffer:Buffer = await fs.readFileSync(filePath);
    const text = await pdfToText(pdfBuffer);
    return text;
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

// Gemini API interaction
export async function getResponseFromGemini(text: any, type: any, prompt: any) {
  if (type === "text") {
    const result = await model.generateContent(prompt + text);
    return result.response.text();
  } else if (type === "chat") {
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(prompt + text);
    return result.response.text();
  }
}

export async function extractingTextFromPPT(pptFilePath: any){
  const client = new DocumentProcessorServiceClient();

  // Upload the PPT file to Cloud Storage
  const [bucketName, fileName] = await client.uploadDocument(pptFilePath);

  // Process the document
  const [result]:any = await client.processDocument({
    name: `gs://${bucketName}/${fileName}`,
    processorType: "PROCESSOR_TYPE_UNSPECIFIED",
  });

  // Extract the text from the processed document
  const text = result.text;

  return text;
}

/**

const pdfPath = "../learning/helloworld.pdf";

// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "../../build/webpack/pdf.worker.bundle.js";

// Loading a document.
const loadingTask = pdfjsLib.getDocument(pdfPath);
const pdfDocument = await loadingTask.promise;
// Request a first page
const pdfPage = await pdfDocument.getPage(1);
// Display page on the existing canvas with 100% scale.
const viewport = pdfPage.getViewport({ scale: 1.0 });
const canvas = document.getElementById("theCanvas");
canvas.width = viewport.width;
canvas.height = viewport.height;
const ctx = canvas.getContext("2d");
const renderTask = pdfPage.render({
  canvasContext: ctx,
  viewport,
});
await renderTask.promise;
 */