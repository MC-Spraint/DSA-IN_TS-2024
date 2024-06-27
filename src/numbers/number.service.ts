import * as fs from "fs";
import * as path from "path";

export class NumberService {
  private filePaths: { [key: string]: string } = {
    A: path.join(__dirname, "../../public/A.txt"),
    B: path.join(__dirname, "../../public/B.txt"),
    C: path.join(__dirname, "../../public/C.txt"),
    D: path.join(__dirname, "../../public/D.txt"),
  };

  private readFileContents(filePath: string): string[] {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, "utf8").trim();
    return content ? [content] : [];
  }

  private allFilesHaveEntries(): boolean {
    return Object.values(this.filePaths).every((filePath) => {
      return (
        fs.existsSync(filePath) &&
        fs.readFileSync(filePath, "utf8").trim() !== ""
      );
    });
  }

  async processNumber(
    input: number
  ): Promise<{ number: number; multipliedValue: number; file: string }> {
    try {
    const multipliedValue = input * 7;
    let file = "D";

    if (multipliedValue > 140) file = "A";
    else if (multipliedValue > 100) file = "B";
    else if (multipliedValue > 60) file = "C";

    if (this.allFilesHaveEntries()) {
      throw new Error(
        `All files have entries. No more numbers can be processed.`
      );
    }

    const filePath = this.filePaths[file];

    if (
      fs.existsSync(filePath) &&
      fs.readFileSync(filePath, "utf8").trim() !== ""
    ) {
      throw new Error(`File ${file} already has an entry.`);
    }

    fs.writeFileSync(filePath, input.toString());
    return { number: input, multipliedValue, file };
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
    
  }


  async getAllNumbers(): Promise<{ [key: string]: string[] }> {
    try {
      const results = {
        A: this.readFileContents(this.filePaths.A),
        B: this.readFileContents(this.filePaths.B),
        C: this.readFileContents(this.filePaths.C),
        D: this.readFileContents(this.filePaths.D),
      };
      return results;
    } catch (error: any) {
      throw new Error(`Error: ${error.message}`);
    }
    
  }

}
