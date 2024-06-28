import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const app = express();
const port = 3000;

// Middleware for parsing multipart/form-data (file uploads)
const upload = multer({ dest: 'uploads/' });

// Define the source and destination file paths
const destinationFilePath = path.join(__dirname, 'destination.txt');

// Route handler for file upload
app.post('/upload', upload.single('file'), (req: any, res) => {
  // req.file contains information about the uploaded file
  const { path: sourceFilePath } = req.file;

  // Create readable and writable streams
  const readableStream = fs.createReadStream(sourceFilePath);
  const writableStream = fs.createWriteStream(destinationFilePath);

  // Pipe the readable stream to the writable stream
  readableStream.pipe(writableStream);

  // Event handlers for stream operations
  readableStream.on('end', () => {
    console.log('File reading ended');
    // Optional: Delete the uploaded file once read
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
