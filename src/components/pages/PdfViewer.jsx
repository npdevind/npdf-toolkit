import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect } from "react";

const PdfViewer = ({ fileUrl, onPdfReady }) => {
  useEffect(() => {
    const checkRoot = setInterval(() => {
      const pagesLayer = document.querySelector(".rpv-core__inner-pages");
      if (pagesLayer) {
        clearInterval(checkRoot);
        pagesLayer.style.position = "relative"; // ensure absolute children align correctly
        onPdfReady?.(pagesLayer);
      }
    }, 300);
    return () => clearInterval(checkRoot);
  }, [onPdfReady]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
      <Viewer fileUrl={fileUrl} />
    </Worker>
  );
};

export default PdfViewer;
