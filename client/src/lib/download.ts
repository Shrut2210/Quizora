import axios from "axios";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import path from "path";
import fs from "fs";


export default async function download (fileName : string) {
    const fileRef = ref(storage, `files/${fileName}`);
    const fileURL = await getDownloadURL(fileRef);
    console.log(fileURL);

    const response = await axios.get(fileURL, { responseType: "arraybuffer" });
    const fileData = response.data;

    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFileSync(filePath, fileData);
    return filePath;
}