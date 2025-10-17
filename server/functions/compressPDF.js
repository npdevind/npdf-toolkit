import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { Buffer } from "buffer";
import { exec } from "child_process";
import path from "path";
import os from "os";

export const compressFunction = async (req, res) => {
  try {
    //!those code work fine but compress not good enough size reduces by 5-10% only
    // const filePath = req.file.path;
    // const arrayBuffer = fs.readFileSync(filePath);
    // const pdfDoc = await PDFDocument.load(arrayBuffer);
    // const pdfBytes = await pdfDoc.save();
    // res.setHeader("Content-Disposition", "attachment; filename=compressed.pdf");
    // res.setHeader("Content-Type", "application/pdf");
    // res.send(Buffer.from(pdfBytes));

    const inputPath = req.file.path;
    const outputPath = path.join("uploads", `compressed-${Date.now()}.pdf`);

    // ✅ Detect platform: use `gswin64c` on Windows, `gs` on Linux/macOS
    const gsCommand = os.platform() === "win32" ? "gswin64c" : "gs";

    // ✅ Ghostscript compression command
    const command = `${gsCommand} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
      -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH \
      -sOutputFile=${outputPath} ${inputPath}`;

    exec(command, (error) => {
      if (error) {
        console.error("Ghostscript error:", error);
        return res.status(500).send({
          error: "Ghostscript compression failed.",
          details: error.message,
        });
      }

      // ✅ Read compressed file and send as download
      const pdfBuffer = fs.readFileSync(outputPath);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=compressed.pdf"
      );
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfBuffer);

      // Optional: cleanup temp files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (error) {
    console.error("⚠️ Compression error:", error);
    res.status(500).send({ error: error.message });
  }
};
