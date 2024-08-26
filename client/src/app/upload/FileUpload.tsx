import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase'; // Adjust path as necessary

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = (e : any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, file ? `files/${file.name}` : '');
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setDownloadURL(downloadURL));
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload progress: {progress}%</p>}
      {downloadURL && (
        <p>
          File available at: <a href={downloadURL}>{downloadURL}</a>
        </p>
      )}
    </div>
  );
}
