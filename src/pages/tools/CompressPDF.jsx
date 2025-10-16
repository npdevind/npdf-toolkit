import FileUpload from "@/components/pages/FileUpload";
import Header from "@/layouts/Header";
import React from "react";

const CompressPDF = () => {
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

        <div>
          <FileUpload buttonName={"Compress"} />
        </div>
      </div>
    </>
  );
};

export default CompressPDF;
