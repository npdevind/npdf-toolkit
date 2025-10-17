import FileUpload from "@/components/pages/FileUpload";
import Header from "@/layouts/Header";
import { noAuthUpdater } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const CompressPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedPDF, setCompressedPDF] = useState(null);

  const { mutate, isPending, status } = useMutation({
    mutationFn: ({ body, method, url }) =>
      noAuthUpdater({ url, method, body, responseType: "arraybuffer" }),
    onSuccess: (data) => {
      const blob = new Blob([data], { type: "application/pdf" });
      setCompressedPDF(blob); // store blob for download
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCompress = () => {
    if (!selectedFile) return alert("Select a PDF first!");
    mutate({
      url: "/compress-pdf",
      method: "POST",
      body: { pdf: selectedFile },
    });
  };

  console.log(status);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-6 py-5 text-center">
        <h2 className="font-bold tracking-tight text-cyan-900 sm:text-5xl">
          Compress PDF files
        </h2>
        <span className="w-1/2 text-gray-500 text-xl">
          Reduce file size while optimizing for maximal PDF quality.
        </span>

        {status != "success" && (
          <FileUpload
            buttonName={"Compress"}
            onFileSelect={setSelectedFile}
            handleFileAction={handleCompress}
            isPending={isPending}
            status={status}
          />
        )}
        {compressedPDF && (
          <button
            onClick={() => {
              const url = window.URL.createObjectURL(compressedPDF);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "compressed.pdf");
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            }}
            className="mt-4 rounded-lg bg-green-600 px-6 py-3 text-white font-medium shadow hover:bg-green-700 transition-colors duration-300 cursor-pointer"
          >
            Download Compressed PDF
          </button>
        )}
      </div>
    </>
  );
};

export default CompressPDF;
