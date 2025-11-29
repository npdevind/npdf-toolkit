import React, { useState } from "react";
import PDFToolData from "../data/pdfToolsData";
import { SearchIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [getToolCategory, setGetToolCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toolCategory = [
    { label: "All Tools", value: "all" },
    { label: "Workflow", value: "workflow" },
    { label: "Organize", value: "organized-pdf" },
    { label: "Convert", value: "convert-pdf" },
    { label: "Optimize", value: "optimize-pdf" },
    { label: "Edit", value: "edit-pdf" },
    { label: "Security", value: "pdf-security" },
  ];

  const filteredTools = PDFToolData.filter((tool) => {
    const matchesCategory =
      getToolCategory === "all" ? true : tool.type === getToolCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Features Available
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Master Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              PDFs
            </span>
            <br /> with Ease
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-900">
            All-in-one toolkit to merge, split, compress, convert, and edit your
            PDFs. 100% free, secure, and easy to use.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-full shadow-lg border border-border p-2">
              <SearchIcon className="ml-3 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a tool (e.g., 'Merge', 'Compress')..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-12 overflow-x-auto">
        <div className="flex justify-center min-w-max gap-2 pb-4">
          {toolCategory.map((category) => (
            <button
              key={category.value}
              onClick={() => setGetToolCategory(category.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${
                  getToolCategory === category.value
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                to={tool.link}
                key={tool.id}
                className="group relative bg-card hover:bg-gradient-to-br hover:from-card hover:to-primary/5 border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                  <ArrowRight size={20} />
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {tool.subtitle}
                </p>
              </Link>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No tools found matching your criteria.
            </p>
            <button
              onClick={() => {
                setGetToolCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
