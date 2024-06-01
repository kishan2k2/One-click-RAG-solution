import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import fileIcon from '../assests/images/file-arrow-up-solid (1).svg';
const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  return (
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
  );
};
export default FileUpload;