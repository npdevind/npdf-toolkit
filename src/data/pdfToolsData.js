// pdfToolsData.js
import {
  GitMerge,
  SquareSplitHorizontal,
  AlignHorizontalSpaceAround,
  PenTool,
  LockKeyholeOpen,
  SquarePen,
} from "lucide-react";

const PDFToolData = [
  {
    id: 1,
    title: "Merge PDF",
    subtitle:
      "Combine PDFs in the order you want with the easiest PDF merger available.",
    icon: GitMerge,
    link: "#merge", // replace with actual link
    type: "organized-pdf",
  },
  {
    id: 2,
    title: "Split PDF",
    subtitle:
      "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: SquareSplitHorizontal,
    link: "#split",
    type: "organized-pdf",
  },
  {
    id: 3,
    title: "Compress PDF",
    subtitle: "Reduce file size while optimizing for maximal PDF quality.",
    icon: AlignHorizontalSpaceAround,
    link: "compress",
    type: "optimize-pdf",
  },
  {
    id: 4,
    title: "Sign PDF",
    subtitle: "Sign yourself or request electronic signatures from others.",
    icon: PenTool,
    link: "#sign",
    type: "pdf-security",
  },
  {
    id: 5,
    title: "Unlock PDF",
    subtitle:
      "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
    icon: LockKeyholeOpen,
    link: "#unlock",
    type: "pdf-security",
  },
  {
    id: 6,
    title: "Edit PDF",
    subtitle:
      "Add text, images, shapes or freehand annotations to a PDF document. Edit the size, font, and color of the added content.",
    icon: SquarePen,
    link: "#edit",
    type: "edit-pdf",
  },
];
export default PDFToolData;
