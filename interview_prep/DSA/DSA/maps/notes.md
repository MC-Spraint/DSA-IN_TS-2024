#### [1] Check If Two Strings Has Isomorphic Pattern
In each iteration, if the i-th element of the target 't' is present in the map, 'i' should be in the same position in the other string 's' as in the target 't' itself, if they are of equal length of courese. 
So, the value mapped to current s[i] must be the value of current t[i].
Otherwise, we still need to check whether any previous s[i] is mapped to the current t[i].
and to do that we get all the values from the map for every previous s[i] and check for current t[i] in them.
If it is found, that means it is already mapped and it can't be remapped in order to follow isomorphic pattern, so false is returned.
if it is not the case, we map current t[i] to current s[i];
If loop is successfully completed then true is returned.

[Example]
Input: "paper", "title", Output: true;
Input: "paper", "refer", Output: false;

#### [2] Word Pattern
Variation of isomorphic pattern, same code.

#### [3] Check If Two Strings Are Anagrams
Target string's character freequency is stored first.
Then in each iteration if the current character is present in the other string
the mapped freequency of this character is decreamented by one or the character is deleted from the map itself if freequency <= 0.
and if not present, false is returned. 
At the end true is returned if the size of the map becomes zero, else false is returned.

[Example]
Input: "master", "rats", Output: true;
Input: "paper", "pencil", Output: false;

#### [4] Check If Two Strings Can Be Constructed From The Other
Variation of "If Two Strings Are Anagrams".
Same code but at the end we return true.

#### [5] Group Anagrams
In each iteration, a key of the map is a sorted versions of the current string and values are arrays of anagrams.
For each string in the input array
the characters are sorted alphabetically to create a key for the anagram map.
If the map already contains this key, the string is added to the corresponding array.
If the map doesn't contain the key, a new array for this key is created and set in the map.
Finally, an array containing all the values from the anagram map is returned, effectively grouping the anagrams together.



