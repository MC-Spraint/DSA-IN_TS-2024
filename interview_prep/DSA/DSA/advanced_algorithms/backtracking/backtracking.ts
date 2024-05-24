export class BackTracking {
  static permuteString(str: string): string[] {
    const result: Set<string> = new Set();

    function permuteHelper(current: string, remaining: string) {
      if (remaining.length === 0) {
        result.add(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const nextChar = remaining[i];
        const newCurrent = current + nextChar;
        const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
        permuteHelper(newCurrent, newRemaining);
      }
    }

    permuteHelper("", str);
    return Array.from(result);
  }
}
