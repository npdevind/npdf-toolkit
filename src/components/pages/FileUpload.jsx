import React, { useState, useRef } from "react";
import { FileText, UploadCloud, X } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

const FileUpload = ({
  buttonName = "Upload",
  onFileSelect,
  handleFileAction,
  isPending = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setFileName(file.name);
    if (onFileSelect) onFileSelect(file);
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

  const handleRemove = (e) => {
    e.stopPropagation();
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div
        className={`relative group flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed rounded-3xl transition-all duration-300 ease-out
        ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-gray-200 hover:border-primary/50 hover:bg-gray-50/50"
        }
        ${
          fileName
            ? "bg-white border-solid border-gray-200 shadow-xl"
            : "bg-white/50 backdrop-blur-sm"
        }
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => !fileName && fileInputRef.current.click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
        />

        {fileName ? (
          <div className="flex flex-col items-center w-full p-8">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-100"
              >
                <X size={14} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center break-all max-w-md">
              {fileName}
            </h3>
            <p className="text-sm text-gray-500 mb-8">Ready to process</p>

            {isPending ? (
              <div className="flex flex-col items-center gap-3">
                <Spinner className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-primary animate-pulse">
                  Processing...
                </span>
              </div>
            ) : (
              <div className="flex gap-4 w-full max-w-xs">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-12 text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileAction();
                  }}
                >
                  {buttonName}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <div
              className={`w-20 h-20 mb-6 rounded-full bg-primary/5 flex items-center justify-center transition-transform duration-500 ${
                isDragging ? "scale-110" : "group-hover:scale-110"
              }`}
            >
              <UploadCloud
                className={`w-10 h-10 text-primary transition-all duration-500 ${
                  isDragging ? "scale-110" : ""
                }`}
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Upload your PDF
            </h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              Drag and drop your file here, or click to browse your computer
            </p>

            <Button
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/50"
            >
              Choose File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
