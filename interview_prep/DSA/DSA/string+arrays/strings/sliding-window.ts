
// Longest Substring with At Most K Distinct Characters
// Given a string and an integer K, find the length of the longest substring with at most K distinct characters.

// Longest Substring Without Repeating Characters
// Find the length of the longest substring in which all characters are unique. This is a classic problem that can be solved using sliding windows effectively.

// Minimum Window Substring
// Given a string s and a string t, find the minimum window in s which contains all the characters in t. This problem combines sliding window and hashmap concepts.

// Longest Substring with All Repeating Characters Replaced (Character Replacement)
// Given a string and an integer k, find the length of the longest substring where you can replace up to k characters to make all characters the same.

// Permutation in String
// Given two strings s1 and s2, check if s1's permutation is a substring of s2. This problem is about finding any substring of s2 that is a permutation of s1.

// Sliding Window Maximum (or Longest Subarray)
// Given an array of integers and an integer k, find the maximum for each sliding window of size k. This is often applied to strings for finding character frequencies within a window.

// Repeated DNA Sequences
// Given a DNA string (a string of ACGT characters), find all the 10-letter-long sequences (substrings) that occur more than once. This problem uses sliding windows to check for repeated sequences efficiently.

// Find All Anagrams in a String
// Given a string s and a pattern p, return the starting indices of all anagrams of p in s. This involves finding all substrings in s that are permutations of p.

// Longest Substring with At Least K Repeating Characters
// Given a string s and an integer k, find the length of the longest substring where every character appears at least k times.

// Substrings of Size K with K Different Characters
// Given a string and an integer K, find all the substrings of size K where each character appears at most once. This involves managing a sliding window with unique characters.

// Longest Substring with At Most Two Distinct Characters
// Given a string, find the length of the longest substring containing at most two distinct characters. This problem uses the sliding window technique to efficiently explore substrings with a fixed set of characters.

// Longest Substring with No More Than Two Distinct Characters
// This is a variation of the "longest substring with at most K distinct characters" problem, where K = 2. It asks for the longest substring where no more than two distinct characters are allowed.

// Longest Substring of All 1s After at Most K Flips
// Given a binary string and an integer k, find the length of the longest substring that can be formed by flipping at most k zeros into ones. This involves sliding a window while tracking flips.

// Find All Substrings with Exactly K Distinct Characters
// Given a string s and an integer K, return all the substrings of s that contain exactly K distinct characters. Sliding window helps track the size and distinctness of substrings.

// Longest Subarray with Sum Less Than or Equal to K
// Given an integer array nums and a target integer k, find the longest subarray such that the sum of the elements in the subarray is less than or equal to k. This question can be adapted to strings by working with their numeric values (like ASCII values).

// Smallest Subarray with Sum Greater Than or Equal to K
// Given an array nums and a number k, find the length of the smallest contiguous subarray where the sum is at least k. This can be related to strings by considering substring lengths that meet a certain condition.

// Substring with Concatenation of All Words
// Given a string s and a list of words words, find all starting indices of substring(s) in s that are a concatenation of each word in words exactly once and without any intervening characters. This is a common sliding window problem involving string concatenations.

// Longest Substring with At Least K Repeating Characters (Optimized)
// Given a string s and an integer k, find the length of the longest substring where each character appears at least k times. The sliding window is used to adjust the substring length dynamically while maintaining the character count.

// Substring with Exactly K Distinct Characters (Optimized)
// Given a string s and an integer k, find the length of the longest substring with exactly k distinct characters. The challenge here is using a sliding window to dynamically manage the count of distinct characters as the window expands and contracts.


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
  