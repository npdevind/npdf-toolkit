import React, { useState } from "react";
import PDFToolData from "../data/pdfToolsData";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

const Index = () => {
  const [getToolCategory, setGetToolCategory] = useState("all");
  const toolCategory = [
    { label: "All", value: "all" },
    { label: "Workflow", value: "workflow" },
    { label: "Organized PDF", value: "organized-pdf" },
    { label: "Convert PDF", value: "convert-pdf" },
    { label: "Optimize PDF", value: "optimize-pdf" },
    { label: "Edit PDF", value: "edit-pdf" },
    { label: "PDF Security", value: "pdf-security" },
  ];

  const filteredTools = PDFToolData.filter((tool) =>
    getToolCategory === "all" ? true : tool.type === getToolCategory
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 py-5 text-center">
        <h2 className="font-bold tracking-tight text-cyan-900 sm:text-5xl">
          Every tool you need to work with PDFs in one place
        </h2>
        <span className="w-1/2 text-gray-500 text-xl">
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE
          and easy to use! Merge, split, compress, convert, rotate, unlock and
          watermark PDFs with just a few clicks.
        </span>
      </div>

      <div className="flex flex-row items-center justify-center gap-5 mb-4">
        {toolCategory.map((category) => (
          <button
            key={category.value}
            onClick={() => setGetToolCategory(category.value)}
            className={`m-3 rounded-full border border-gray-300 px-4 py-1 text-md font-medium text-gray-700 shadow-sm transition-colors duration-300 cursor-pointer
              ${
                getToolCategory === category.value
                  ? "bg-sky-900 text-white"
                  : "bg-white hover:bg-sky-900 hover:text-white"
              }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex flex-row items-center justify-center ">
        <div className="grid w-full max-w-sm gap-6">
          <InputGroup
            className={"rounded-full border border-gray-300 bg-white shadow-sm"}
          >
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-6 px-4 mt-8">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="flex w-full max-w-sm flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center shadow-md transition-transform duration-300 hover:scale-105 hover:border-sky-900 hover:shadow-lg"
            >
              <Icon className="mb-4 h-12 w-12 text-blue-900" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {tool.title}
              </h3>
              <p className="mb-4 text-gray-500">{tool.subtitle}</p>
              <a
                href={tool.link}
                className="rounded bg-sky-900 px-6 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
              >
                Use Tool
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
