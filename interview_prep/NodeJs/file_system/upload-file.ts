// src/index.ts
import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

// Create an instance of express
const app = express();

// Set the storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save the uploaded files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Name the file uniquely
  },
});

// File filter function to validate file types (optional)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// Initialize multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // File size limit: 5MB
});

// Create a POST route for file uploads
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  try {
    // File upload is successful
    res.send({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    res.status(400).send({ message: "Error uploading file", error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
