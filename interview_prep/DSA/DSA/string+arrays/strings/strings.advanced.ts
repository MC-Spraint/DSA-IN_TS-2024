
function knuthMorrisPratt(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPSArray(pattern);
    const indices: number[] = [];
  
    let i = 0; // index for text[]
    let j = 0; // index for pattern[]
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        if (j === m) {
            indices.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return indices;
  }
  function longestPalindromicSubstring(str: string): string {
    let longest = '';
  
    function expandAroundCenter(left: number, right: number): void {
        while (left >= 0 && right < str.length && str[left] === str[right]) {
            const palindrome = str.substring(left, right + 1);
            if (palindrome.length > longest.length) {
                longest = palindrome;
            }
            left--;
            right++;
        }
    }
  
    for (let i = 0; i < str.length; i++) {
        expandAroundCenter(i, i);       // Odd length palindromes
        expandAroundCenter(i, i + 1);   // Even length palindromes
    }
  
    return longest;
  }
  
  function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
  }
  