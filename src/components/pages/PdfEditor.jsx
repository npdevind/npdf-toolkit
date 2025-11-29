import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import PdfViewer from "./PdfViewer";
import {
  FileImage,
  Link,
  Minus,
  Plus,
  RefreshCcw,
  Signature,
  TextCursorInput,
} from "lucide-react";
import TextAnnotation from "./TextAnnotation";
import { createTextAnnotation } from "@/utils/annotationHelpers";

const PdfEditor = ({ pdfFile }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [scale, setScale] = useState(1);
  const [isAddingText, setIsAddingText] = useState(false);

  const pdfContainerRef = useRef(null);

  useEffect(() => {
    if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      setPdfUrl(fileUrl);
    }
  }, [pdfFile]);

  // ✅ Toggle Add Text mode
  const handleAddText = () => {
    setIsAddingText((prev) => !prev);
  };

  // ✅ Handle click on PDF to add text
  const handlePdfClick = (e) => {
    if (!isAddingText) return;

    const rect = pdfContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Adjust for scroll if needed, but since we are clicking relative to the container which might be scrolling,
    // we need to be careful.
    // The previous implementation used scrollLeft/scrollTop.
    // If the container is the one scrolling, e.clientX is relative to viewport.
    // rect.left is relative to viewport.
    // <div className="relative ... overflow-auto ...">
    //   <div style={{ scale }}> <PdfViewer ... /> {annotations...} </div>
    // </div>
    // The annotations are inside the scaled div.
    // So if I click at 100px from left of container, and scale is 1.
    // And scroll is 0.
    // x should be 100.

    // If scale is 2.
    // Click at 100px.
    // The internal coordinate should be 50 (because 50 * 2 = 100).

    // If scroll is 50.
    // Click at 100px from left of container.
    // The point is actually at 150px from the start of the content.
    // So (100 + 50) / scale.

    const adjustedX =
      (e.clientX - rect.left + (pdfContainerRef.current?.scrollLeft || 0)) /
      scale;
    const adjustedY =
      (e.clientY - rect.top + (pdfContainerRef.current?.scrollTop || 0)) /
      scale;

    const newAnnotation = createTextAnnotation("Edit me", adjustedX, adjustedY);
    setAnnotations((prev) => [...prev, newAnnotation]);
    setIsAddingText(false);
  };

  // ✅ Update annotation (text, style, position)
  const handleAnnotationChange = (id, updates) => {
    setAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  // ✅ Duplicate annotation
  const handleDuplicate = (id) => {
    const annotation = annotations.find((a) => a.id === id);
    if (annotation) {
      const newAnnotation = {
        ...annotation,
        id: Date.now(),
        x: annotation.x + 20,
        y: annotation.y + 20,
      };
      setAnnotations((prev) => [...prev, newAnnotation]);
    }
  };

  // ✅ Delete text annotation
  const handleDelete = (id) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50/50 pb-20">
      {/* Toolbar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-1 pr-4 border-r border-gray-200/50">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isAddingText
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "hover:bg-secondary text-foreground"
            }`}
            onClick={handleAddText}
          >
            <TextCursorInput size={18} />
            <span>{isAddingText ? "Click PDF" : "Text"}</span>
          </button>

          <button
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            title="Add Image"
          >
            <FileImage size={18} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            title="Add Signature"
          >
            <Signature size={18} />
          </button>
          <button
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            title="Add Link"
          >
            <Link size={18} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 pl-2">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm font-medium w-12 text-center select-none">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(3, s + 0.1))}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => setScale(1)}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
            title="Reset Zoom"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        ref={pdfContainerRef}
        className="relative mt-4 shadow-2xl bg-white overflow-auto rounded-xl border border-border/50"
        onClick={handlePdfClick}
        style={{
          width: "90vw",
          height: "85vh",
          cursor: isAddingText ? "text" : "default",
        }}
      >
        {pdfUrl ? (
          <>
            <div
              className="transform origin-top-left transition-transform duration-300 ease-in-out"
              style={{ scale }}
            >
              <PdfViewer fileUrl={pdfUrl} />
              {annotations.map((item) => (
                <TextAnnotation
                  key={item.id}
                  annotation={item}
                  onChange={handleAnnotationChange}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  scale={scale}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-lg">Upload a PDF to start editing.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfEditor;
