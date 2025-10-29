import FileUpload from "@/components/pages/FileUpload";
import PdfEditor from "@/components/pages/PdfEditor";
import Header from "@/layouts/Header";
import React, { useState } from "react";

const EditPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-6 py-5 text-center">
        <h2 className="font-bold tracking-tight text-cyan-900 sm:text-5xl">
          PDF Editor
        </h2>
        <span className="w-1/3 text-gray-500 text-xl">
          Edit PDF by adding text, shapes, comments and highlights. Your secure
          and simple tool to edit PDF.
        </span>

        {!selectedFile ? (
          <FileUpload buttonName={"Edit PDF"} onFileSelect={setSelectedFile} />
        ) : (
          <PdfEditor
            pdfFile={selectedFile}
            onBack={() => setSelectedFile(null)}
          />
        )}
      </div>
    </>
  );
};

export default EditPDF;
