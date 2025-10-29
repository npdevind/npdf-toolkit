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
  Trash2,
  Type,
} from "lucide-react";
import DraggableWrapper from "../helper/DraggableWrapper";
import { createTextAnnotation } from "@/utils/annotationHelpers";

const PdfEditor = ({ pdfFile }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [scale, setScale] = useState(1);

  const pdfContainerRef = useRef(null);

  const lastAnnotationRef = useRef(null);

  useEffect(() => {
    if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      setPdfUrl(fileUrl);
    }
  }, [pdfFile]);

  // ✅ Add text near the visible center of viewer
  const handleAddText = () => {
    const rect = pdfContainerRef.current?.getBoundingClientRect();
    const pdfWidth = rect?.width || 800;
    const pdfHeight = rect?.height || 600;

    const scrollX = pdfContainerRef.current?.scrollLeft || 0;
    const scrollY = pdfContainerRef.current?.scrollTop || 0;

    const newAnnotation = createTextAnnotation(
      "Edit me",
      pdfWidth,
      pdfHeight,
      scrollX,
      scrollY
    );
    setAnnotations((prev) => [...prev, newAnnotation]);
  };

  // ✅ Update edited text
  const handleTextChange = (id, newText) => {
    setAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, text: newText } : a))
    );
  };

  // ✅ Update drag positions
  const handleDragStop = (id, x, y) => {
    setAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, x, y } : a))
    );
  };

  // ✅ Delete text annotation
  const handleDelete = (id) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

  // ✅ Font size control
  const changeFontSize = (id, delta) => {
    setAnnotations((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, fontSize: Math.max(8, a.fontSize + delta) } : a
      )
    );
  };

  useEffect(() => {
    if (lastAnnotationRef.current) {
      const el = lastAnnotationRef.current.querySelector("[contenteditable]");
      el?.focus();
    }
  }, [annotations]);

  return (
    <div className="flex flex-col items-center w-full  min-h-screen">
      {/* Toolbar */}
      <div className="sticky top-3 z-50 flex flex-wrap items-center justify-center gap-3 px-5 py-2 rounded-full backdrop-blur-md bg-white/70 shadow-lg border border-gray-300">
        <button
          className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-sm cursor-pointer"
          onClick={handleAddText}
        >
          <TextCursorInput size={16} /> Add Text
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-sm cursor-pointer">
          <FileImage size={16} /> Add Image
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-sm cursor-pointer">
          <Signature size={16} /> Add Sign
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-sm cursor-pointer">
          <Link size={16} /> Add Link
        </button>

        <div className="border-l h-6 border-gray-400 mx-2"></div>

        {/* Zoom Controls */}
        <button
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={() => setScale((s) => Math.min(3, s + 0.1))}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => setScale(1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300"
        >
          <RefreshCcw size={14} />
        </button>
      </div>

      {/* PDF Viewer */}
      <div
        className="relative mt-4 border border-gray-400 shadow-lg bg-gray-50 overflow-auto rounded-lg"
        style={{
          width: "90vw",
          height: "85vh",
        }}
      >
        {pdfUrl ? (
          <>
            <div
              className="transform origin-top-left transition-transform duration-300 ease-in-out"
              style={{ scale }}
            >
              <PdfViewer fileUrl={pdfUrl} />
              {annotations.map((item, index) => (
                <DraggableWrapper
                  key={item.id}
                  defaultPosition={{ x: item.x, y: item.y }}
                  onStop={(e, data) => handleDragStop(item.id, data.x, data.y)}
                >
                  <div
                    ref={
                      index === annotations.length - 1
                        ? lastAnnotationRef
                        : null
                    }
                    className="absolute group "
                    style={{
                      fontSize: `${item.fontSize}px`,
                      minWidth: "100px",
                      padding: "4px",
                      cursor: "move",
                    }}
                  >
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleTextChange(item.id, e.target.innerText)
                      }
                      className="outline-none"
                    >
                      {item.text}
                    </div>

                    {/* Hover Toolbar for each annotation */}
                    <div className="absolute -top-3 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="bg-red-500 text-white rounded px-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        className="bg-gray-700 text-white rounded px-1"
                        onClick={() => changeFontSize(item.id, +2)}
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        className="bg-gray-700 text-white rounded px-1"
                        onClick={() => changeFontSize(item.id, -2)}
                      >
                        <Minus size={14} />
                      </button>
                      <Type size={14} className="text-gray-500 ml-1" />
                    </div>
                  </div>
                </DraggableWrapper>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 p-6">Upload a PDF to start editing.</p>
        )}
      </div>
    </div>
  );
};

export default PdfEditor;
