import React, { useState } from "react";
import { FileText } from "lucide-react";

const FileUpload = ({ buttonName = "Upload" }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleRemove = () => setFileName("");

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
      {/* Drag & Drop Area */}
      <div
        className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer text-center shadow-sm transition-all duration-300
        ${
          isDragging
            ? "border-sky-500 bg-sky-50 shadow-md"
            : "border-gray-300 bg-white hover:border-sky-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()} // trigger hidden input
      >
        <FileText className="mb-4 h-14 w-14 text-sky-500" />
        {!fileName ? (
          <>
            <span className="text-gray-800 font-semibold mb-1">
              Drag & Drop your file here
            </span>
            <span className="text-gray-400 text-sm">or click to browse</span>
          </>
        ) : (
          <span className="text-gray-800 font-semibold">{fileName}</span>
        )}
        {/* Hidden input */}
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Action Buttons */}
      {fileName && (
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex-1   rounded-lg  bg-sky-600 px-6 py-3 text-white font-medium shadow hover:bg-sky-700 transition-colors duration-300 cursor-pointer">
            {buttonName}
          </button>

          <button
            className="flex-1  rounded-lg bg-red-600 px-6 py-3 text-white font-medium shadow hover:bg-red-500 transition-colors duration-300 cursor-pointer"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
