import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileX, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onFileProcess: (content: string, fileInfo: { name: string; type: string; size: number }) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcess }) => {
  const processExcel = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const content = JSON.stringify(jsonData, null, 2);
      
      onFileProcess(content, {
        name: file.name,
        type: file.type,
        size: file.size
      });
    };
    reader.readAsBinaryString(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) {
      processExcel(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxSize: 31457280 // 30MB
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-10 border-2 border-dashed rounded-lg transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${isDragReject ? 'border-red-500 bg-red-50' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-gray-600">
        {isDragReject ? (
          <>
            <FileX className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-red-500 font-medium">File type not supported</p>
            <p className="text-sm text-red-400">Please upload an Excel file</p>
          </>
        ) : isDragActive ? (
          <>
            <FileSpreadsheet className="w-12 h-12 text-blue-500 mb-4 animate-bounce" />
            <p className="text-blue-500 font-medium">Drop your Excel file here</p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-blue-500 mb-4" />
            <p className="text-lg mb-2 font-medium">Drag & drop your Excel file here</p>
            <p className="text-sm text-gray-500 mb-4">or click to select a file</p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Supports .xlsx and .xls files
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Maximum file size: 30MB
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};