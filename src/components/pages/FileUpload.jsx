import React, { useState, useRef } from "react";
import { FileText } from "lucide-react";
import { Spinner } from "../ui/spinner";

const FileUpload = ({
  buttonName = "Upload",
  onFileSelect,
  handleFileAction,
  isPending = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  // store the actual file
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setFileName(file.name);
    if (onFileSelect) onFileSelect(file); // send file to parent
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleRemove = () => {
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (onFileSelect) onFileSelect(null); // notify parent removal
  };

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
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
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

        <input
          id="fileInput"
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </div>

      {fileName &&
        (isPending ? (
          <Spinner className="size-15 text-sky-900" />
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="flex-1 rounded-lg bg-sky-600 px-6 py-3 text-white font-medium shadow hover:bg-sky-700 transition-colors duration-300 cursor-pointer"
              onClick={() => handleFileAction()}
              disabled={isPending}
            >
              {buttonName}
            </button>

            <button
              className="flex-1 rounded-lg bg-red-600 px-6 py-3 text-white font-medium shadow hover:bg-red-500 transition-colors duration-300 cursor-pointer"
              onClick={handleRemove}
              disabled={isPending}
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
};

export default FileUpload;
