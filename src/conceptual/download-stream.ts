import express, { Request, Response } from 'express';
import fs, { ReadStream } from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Route for downloading the file
app.get('/download', (req: Request, res: Response) => {
  try {
    // Define the file path (replace 'sample.txt' with the path to your file)
    const filePath = path.join(__dirname, 'sample.txt');
    
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', 'attachment; filename="sample.txt"');
    res.setHeader('Content-Type', 'application/octet-stream');

    // Create a readable stream from the file
    const fileStream: ReadStream = fs.createReadStream(filePath);

    // Handle stream events
    fileStream.on('open', () => {
      console.log('Stream opened');
    });

    fileStream.on('data', (chunk: Buffer) => {
      console.log(`Received ${chunk.length} bytes`);
    });

    fileStream.on('end', () => {
      console.log('Stream ended');
    });

    fileStream.on('error', (error: Error) => {
      console.error('Stream error:', error);
      res.status(500).send('Internal Server Error');
    });

    // Pipe the file stream to the response stream
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error streaming file:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
