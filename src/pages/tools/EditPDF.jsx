import FileUpload from "@/components/pages/FileUpload";
import PdfEditor from "@/components/pages/PdfEditor";
import Header from "@/layouts/Header";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {!selectedFile ? (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col items-center text-center gap-6 mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
              <span className="text-3xl">✏️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              PDF Editor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Edit your PDF by adding text, shapes, comments, and highlights. A
              secure and simple tool for all your editing needs.
            </p>
          </div>

          <FileUpload
            buttonName="Start Editing"
            onFileSelect={setSelectedFile}
            handleFileAction={() => {}} // No action needed as selecting file triggers editor
          />
        </div>
      ) : (
        <div className="relative animate-in fade-in duration-500">
          <div className="absolute top-4 left-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFile(null)}
              className="gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ArrowLeft size={16} />
              Back to Upload
            </Button>
          </div>
          <PdfEditor
            pdfFile={selectedFile}
            onBack={() => setSelectedFile(null)}
          />
        </div>
      )}
    </div>
  );
};

export default EditPDF;
