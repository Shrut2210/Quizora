import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../../../../firebase'; // Adjust path as necessary
import axios from 'axios';
import { Request, Response } from 'express';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { extractTextFromPDF, extractTextFromWord, getResponseFromGemini } from '@/lib/gemini';

// TODO: get file name from req, check file ext and call appropte func, Delete file once used 
// http://localhost:3000/FileUpload

export const POST = async(req: Request, res: Response) => {
    let fileName = "ARRAY.ppt";

    try {
      const fileRef = ref(storage, `files/${fileName}`);
      const fileURL = await getDownloadURL(fileRef);
      console.log(fileURL);
      
      const response = await axios.get(fileURL, { responseType: "arraybuffer" });
      const fileData = response.data;
      
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      fs.writeFileSync(filePath, fileData);
      console.log(`File saved to ${filePath}`);
      let text;
      if (fileName.endsWith(".pdf")) {
        text = await extractTextFromPDF(filePath);
    }
    else if (fileName.endsWith(".docx")) {
      text = await extractTextFromWord(filePath);
    }
      const responseText = await getResponseFromGemini(text, "text", "Summarize: ");

      return NextResponse.json({ message: 'File processed and saved successfully', responseText});
    } catch (error) {
      console.error('Error processing file:', error);
      return res.status(500).json({ error: 'Failed to process and save file' });
    }
}