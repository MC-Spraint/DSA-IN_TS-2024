/** 
 Text Justification
    Roman to Integer
    Integer to Roman
    Length of Last Word
    Longest Common Prefix
    Reverse Words in a String
    Zigzag Convertion
    Find the Index of the First Occurrence in a String
*/


export class StringsLeetcode150 {
    static fullJustify(words: string[], maxWidth: number): string[] {
        const res: string[] = [];
        let line: string[] = [];
        let len = 0;
    
        words.forEach((word) => {
            if (len + word.length + line.length > maxWidth) {
                res.push(this.justifyLine(line, len, maxWidth));
                line = [];
                len = 0;
            }
            line.push(word);
            len += word.length;
        });
        res.push(this.leftJustifyLine(line, maxWidth));
        return res;
    }
    static justifyLine(line: string[], len: number, maxWidth: number): string {
        const spaces = maxWidth - len;
        const gaps = line.length - 1;
        if (gaps === 0) return line[0] + " ".repeat(spaces);
    
        const spacesPerGap = Math.floor(spaces / gaps);
        let extraSpaces = spaces % gaps;
        return line.reduce((str, word, i) => {
            if (i === line.length - 1) return str + word;
            const gap = spacesPerGap + (extraSpaces-- > 0 ? 1 : 0);
            return str + word + " ".repeat(gap);
        }, "");
    }
    
    static leftJustifyLine(line: string[], maxWidth: number): string {
        const lastLine = line.join(" ");
        return lastLine + " ".repeat(maxWidth - lastLine.length);
    }
    static romanToInt(roman: string): number {
        const romanNumerals = new Map([
            ['I', 1],
            ['V', 5],
            ['X', 10],
            ['L', 50],
            ['C', 100],
            ['D', 500],
            ['M', 1000]
        ]);
    
        let result = 0;
    
        for (let i = 0; i < roman.length; i++) {
            const currentNumeral = romanNumerals.get(roman.charAt(i))!;
            const nextNumeral = romanNumerals.get(roman.charAt(i + 1))!;
    
            if (nextNumeral && nextNumeral > currentNumeral) {
                result += nextNumeral - currentNumeral;
                i++; // Skip the next numeral as it has been accounted for
            } else {
                result += currentNumeral;
            }
        }
    
        return result;
    }
    static intToRoman(num: number) {
        const romanNumerals = new Map([
            [1, 'I'],
            [4, 'IV'],
            [5, 'V'],
            [9, 'IX'],
            [10, 'X'],
            [40, 'XL'],
            [50, 'L'],
            [90, 'XC'],
            [100, 'C'],
            [400, 'CD'],
            [500, 'D'],
            [900, 'CM'],
            [1000, 'M']
        ]);
    
        let result = '';
    
        const values = Array.from(romanNumerals.keys()).reverse();
    
        for (const value of values) {
            while (num >= value) {
                result += romanNumerals.get(value);
                num -= value;
            }
        }
    
        return result;
    }
    
}
