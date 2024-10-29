import * as fs from "fs";
import * as path from "path";
import { PassThrough } from "stream";

async function getFileStream(relativePath: string): Promise<PassThrough> {
  const filePath = path.join(__dirname, relativePath);
  const passThrough = new PassThrough();

  try {
    const fileStream = fs.createReadStream(filePath, {
      encoding: "utf-8",
    });

    fileStream.pipe(passThrough);

    fileStream.on("end", () => {
      console.log("File reading ended");
      passThrough.end();
    });
    fileStream.on("error", (error: Error) => {
      console.error("File reading error:", error);
      passThrough.destroy(error);
    });
  } catch (error: unknown) {
    console.error("Error creating file stream:", error);
    passThrough.destroy();
  }

  return passThrough;
}

// Example usage:
async function streamJSON() {
  try {
    const filePassThrough = await getFileStream("../public/banners.json");

    let jsonData = "";
    filePassThrough.on("data", (chunk) => {
      jsonData += chunk.toString();
      const object = JSON.parse(jsonData);
      console.log(object);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
streamJSON();


