// src/index.ts
import express, { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import multer, { FileFilterCallback } from "multer";

// File filter function to validate file types (optional)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});

// Initialize multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // File size limit: 5MB
});

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the update photo template
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './readable-writable-stream')); // Assuming update_photo_template.html is your template file
});

// Route to handle file upload
// Route to handle file upload
app.post('/upload', upload.single('file'), (req:any, res) => {
  const { path: sourceFilePath } = req.file;
  const destinationFilePath = path.join(__dirname, 'destination.txt');

  // Create readable and writable streams
  const readableStream = fs.createReadStream(sourceFilePath);
  const writableStream = fs.createWriteStream(destinationFilePath);

  readableStream.on('end', () => {
    console.log('File reading ended');
    // Delete the uploaded file once read
    fs.unlinkSync(sourceFilePath);
  });

  writableStream.on('finish', () => {
    console.log('File writing finished');
    res.send('File uploaded and copied successfully!');
  });

  // Error handling for streams
  readableStream.on('error', (error) => {
    console.error('File reading error:', error);
    res.status(500).send('Error reading file');
  });

  writableStream.on('error', (error) => {
    console.error('File writing error:', error);
    res.status(500).send('Error writing file');
  });

  // Pipe the readable stream to the writable stream
  readableStream.pipe(writableStream);
});

// Route to initiate streaming and send data chunk by chunk
app.get('/start-streaming', (req, res) => {
    const destinationFilePath = path.join(__dirname, './../public/destination.txt');
    const readStreamDestination = fs.createReadStream(destinationFilePath, { encoding: 'utf-8' });

    // Set response headers for text/plain content
    res.setHeader('Content-Type', 'text/plain');

    // Pipe data from read stream to response chunk by chunk
    readStreamDestination.on('data', (chunk) => {
        res.write(chunk);
    });

    readStreamDestination.on('end', () => {
        res.end();
    });

    readStreamDestination.on('error', (err) => {
        console.error('Error reading file:', err);
        res.status(500).send('Error reading file');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
