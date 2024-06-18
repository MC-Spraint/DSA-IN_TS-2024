import { Pool, PoolClient, QueryResult } from "pg";
import * as util from "util";
import * as fs from "fs";
import * as path from "path";
import { PassThrough } from "stream";
import express from "express";



const stat = promisify(fs.stat);
async function getVideoStream(
  relativePath: string,
  range: string | undefined
): Promise<PassThrough> {
  const filePath = path.join(__dirname, relativePath);
  const passThrough = new PassThrough();

  const videoStats = await stat(filePath) as fs.Stats;
  const { start, end } = calculateRange(range, videoStats.size);

  const videoStream = fs.createReadStream(filePath, { start, end });
  videoStream.pipe(passThrough);

  videoStream.on("end", () => {
    console.log("Video stream ended");
    passThrough.end();
  });

  videoStream.on("error", (error) => {
    console.error("Error in video stream:", error);
    passThrough.destroy(error);
  });

  return passThrough;
}
function calculateRange(
    range: string | undefined,
    fileSize: number
  ): { start: number; end: number } {
    //Range looks like (Range: bytes=0-499)
    //Remove 'bytes=' and split into 2 parts by '-'
    const parts = range ? range.replace(/bytes=/, "").split("-") : [0];
    
    //Take the number from first index(i=0) and typecast to integer
    const start = parseInt(parts[0] as string, 10);
    //Take the number from 2nd index(i=1) and typecast to integer
    //If it does not exist, take the last index(fileSize - 1)
    const end = parts[1] ? parseInt(parts[1] as string, 10) : fileSize - 1;
  
    if (start >= fileSize || start < 0 || isNaN(start) || isNaN(end) || start > end) {
      throw new Error(
        `Requested range not satisfiable: ${start}-${end} for file size ${fileSize}`
      );
    }
  
    return { start, end };
  }
async function getVideoHeaders(
  relativePath: string,
  range: string | undefined,
  isDownload: boolean = false
): Promise<Record<string, string | number>> {
  const filePath = path.join(__dirname, relativePath);

  const videoStats = await stat(filePath) as fs.Stats;
  const { start, end } = calculateRange(range, videoStats.size);

  const headers: Record<string, string | number> = {
    "Content-Type": "video/mp4",
    "Content-Range": `bytes ${start}-${end}/${videoStats.size}`,
    "Content-Length": end - start + 1,
    "Accept-Ranges": "bytes",
};

  if (isDownload) {
    headers["Content-Disposition"] = `attachment; filename="${path.basename(filePath)}"`;
  }

  return headers;
}


async function handleVideoRequest(
  relativePath: string,
  range: string | undefined,
  res: express.Response,
  isDownload: boolean = false
) {
  try {
    
  } catch (error) {
    console.error("Error in streaming video:", error);
    res.status(500).send("Internal Server Error");
  }
}



function promisify(original) {
    return function (...args) {
      // `args` is an array containing all the arguments passed to the promisified function
      // `original` is the original function that follows the error-first callback pattern
  
      return new Promise((resolve, reject) => {
        // Call the original function with the captured arguments (`...args`)
        // Pass a callback function that resolves or rejects the promise
        original(...args, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };
  }