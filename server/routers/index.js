import express from "express";
import multer from "multer";
const router = express.Router();
import * as compressPDF from "../functions/compressPDF.js";

const upload = multer({ dest: "uploads/" });

//compress pdf
router.post(
  "/compress-pdf",
  upload.single("pdf"),
  compressPDF.compressFunction
);

export default router;
