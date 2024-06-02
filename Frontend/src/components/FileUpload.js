import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import fileIcon from '../assests/images/file-arrow-up-solid (1).svg';
import axios from 'axios';
const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleUpload = async () => {
   
    if (uploadedFiles.length === 0) {
      console.log('No files to upload');
      return;
    }
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('files', file);
    });
    try {
      console.log("working inside handleupload")
      const response = await axios.post('https://one-click-rag-solution.onrender.com/pdfInput_VectorDB/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
      // Handle success (e.g., show a success message, clear the uploaded files, etc.)
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <div className='flex flex-col gap-4'>
      <div {...getRootProps()} className='border-2 border-dashed border-[#374151] p-12 rounded-md'>
      <input {...getInputProps()} />
      <div className='flex flex-col justify-center items-center gap-4'>
        <img src={fileIcon} alt="file icon" className='h-[30px] w-[30px]'/>
      <p className='text-xl text-center text-white font-semibold max-[400px]:text-sm max-[600px]:text-base max-[1000px]:text-lg min-[1600px]:text-2xl'>Drag and drop your PDF files here</p>
      <p className='text-base text-center text-[#9ca3af]  max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl'>or browse your files</p>
      <ul className='font-semibold text-base max-[400px]:text-xs max-[600px]:text-sm max-[1000px]:text-base min-[1600px]:text-xl'>
        {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
      </div>
      
    </div>
    <button className='border-white  border-solid  border-[1px] p-2 rounded-md' onClick={handleUpload}>Upload it</button>
    </div>
  );
};
export default FileUpload;