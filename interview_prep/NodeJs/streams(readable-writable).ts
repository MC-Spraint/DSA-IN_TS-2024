import fs from "fs";
import express from "express";

const readableStream = fs.createReadStream("deploy.sh");

// Listen for events on the readable stream
readableStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk);
});

readableStream.on("end", () => {
  console.log("Readable stream ended");
});

readableStream.on('error', (err) => {
  console.error('Error reading file:', err);
});

const writableStream = fs.createWriteStream("output.txt");

// Pipe the readable stream to the writable stream
readableStream.pipe(writableStream);
writableStream.write('Hello World!\n');
writableStream.end();

// Listen for events on the writable stream
writableStream.on("finish", () => {
  console.log("Writable stream finished writing");
});

writableStream.on("error", (err) => {
  console.error("Error writing to writable stream:", err);
});




























