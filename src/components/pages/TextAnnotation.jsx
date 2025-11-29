import React, { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Type,
  Palette,
  Link as LinkIcon,
  Move,
  Copy,
  Trash2,
  ChevronDown,
} from "lucide-react";
import DraggableWrapper from "../helper/DraggableWrapper";

const TextAnnotation = ({
  annotation,
  onChange,
  onDelete,
  onDuplicate,
  scale,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerText = annotation.text;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount to avoid cursor jumping

  const handleInput = (e) => {
    onChange(annotation.id, { text: e.target.innerText });
  };

  const updateStyle = (key, value) => {
    onChange(annotation.id, { [key]: value });
  };

  const toggleStyle = (key, valueOn, valueOff) => {
    const current = annotation[key];
    updateStyle(key, current === valueOn ? valueOff : valueOn);
  };

  return (
    <DraggableWrapper
      defaultPosition={{ x: annotation.x, y: annotation.y }}
      onStop={(e, data) => onChange(annotation.id, { x: data.x, y: data.y })}
      scale={scale}
      className="absolute top-0 left-0"
    >
      <div
        className="group relative"
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => {
          if (document.activeElement !== contentRef.current) {
            setIsFocused(false);
          }
        }}
      >
        {/* Toolbar */}
        {isFocused && (
          <div
            className="absolute -top-11 left-0 z-50 flex items-center gap-1 px-2 py-1 bg-white rounded-md shadow-lg border border-gray-200 whitespace-nowrap"
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag start on toolbar click
          >
            <button
              className={`p-1 rounded hover:bg-gray-100 ${
                annotation.fontWeight === "bold" ? "bg-gray-200" : ""
              }`}
              onClick={() => toggleStyle("fontWeight", "bold", "normal")}
              title="Bold"
            >
              <Bold size={14} className="text-gray-700" />
            </button>
            <button
              className={`p-1 rounded hover:bg-gray-100 ${
                annotation.fontStyle === "italic" ? "bg-gray-200" : ""
              }`}
              onClick={() => toggleStyle("fontStyle", "italic", "normal")}
              title="Italic"
            >
              <Italic size={14} className="text-gray-700" />
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Font Size */}
            <div className="flex items-center gap-0.5">
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() =>
                  updateStyle("fontSize", Math.max(8, annotation.fontSize - 2))
                }
              >
                <span className="text-xs font-bold">-</span>
              </button>
              <span className="text-xs w-4 text-center">
                {annotation.fontSize}
              </span>
              <button
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => updateStyle("fontSize", annotation.fontSize + 2)}
              >
                <span className="text-xs font-bold">+</span>
              </button>
            </div>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Font Family (Simplified) */}
            <button
              className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-gray-100 text-xs text-gray-700"
              onClick={() => {
                const fonts = [
                  "Arial",
                  "Times New Roman",
                  "Courier New",
                  "Georgia",
                ];
                const currentIdx = fonts.indexOf(annotation.fontFamily);
                const nextFont = fonts[(currentIdx + 1) % fonts.length];
                updateStyle("fontFamily", nextFont);
              }}
            >
              {annotation.fontFamily} <ChevronDown size={10} />
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Color (Simplified) */}
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => {
                const colors = ["#000000", "#FF0000", "#0000FF", "#008000"];
                const currentIdx = colors.indexOf(annotation.color);
                const nextColor = colors[(currentIdx + 1) % colors.length];
                updateStyle("color", nextColor);
              }}
            >
              <div
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: annotation.color }}
              />
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            <button className="p-1 rounded hover:bg-gray-100" title="Link">
              <LinkIcon size={14} className="text-gray-700" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 cursor-move"
              title="Move"
            >
              <Move size={14} className="text-gray-700" />
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => onDuplicate(annotation.id)}
              title="Duplicate"
            >
              <Copy size={14} className="text-gray-700" />
            </button>
            <button
              className="p-1 rounded hover:bg-red-100 text-red-600"
              onClick={() => onDelete(annotation.id)}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

        {/* Text Area */}
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="outline-none min-w-[50px] p-1 border border-transparent hover:border-blue-300 focus:border-blue-500 rounded"
          style={{
            fontSize: `${annotation.fontSize}px`,
            fontFamily: annotation.fontFamily,
            fontWeight: annotation.fontWeight,
            fontStyle: annotation.fontStyle,
            color: annotation.color,
            cursor: "text",
          }}
        />
      </div>
    </DraggableWrapper>
  );
};

export default TextAnnotation;
