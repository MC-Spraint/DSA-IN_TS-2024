# **Arrays(Easy)** 
#### [1] Remove Duplicates

If the current element is the first index of their element.

#### [2] Inverse

Index becomes element and element becomes index.

#### [3] Two Sum

In order to find "Two Sum", a Map is required where we need to map each element to its index.

Now as we iterate through the array we look for the complement of each element for the given target sum.
If the complement exists, its index and the current elements index are combined into a new array and returned.
If the complement doesn't exist, the current element is mapped to its current index.
Ultimately we return false at the end of the loop if no compliment was found.

#### [4] Leaders

Take last element as maxRight and travel backwards in loop,
update maRight and push in a leaders array if the current element is greater than it

#### [5] Max Profit

Current price or minimum price, whichever becomes smaller becomes minimum price
and current price - minimum price is profit,
then profit or maximum profit, whichever becomes greater becomes maximum profit

#### [6] Move Zeros To End

To move zeros in the end, a non-zero pointer is taken 
where it needs to be replaced with 0.
and if in the loop the current element is not equal to 0, 
the non-zero pointer element is replaced with it and gets increased by 1.

#### [7] Majority Elements

To find majority element it should be checked whether in the loop 
the current element is equal to the majority element and if it is 
then the count gets increased by 1 otherwise gets decreased by 1.
`
count += a[i] === majorityElement ? 1 : -1;
`
And Once the count becomes 0, it is reset to 1 and the
current element becomes the majoity element.


#### [8] Max Consecutive Numbers

In order to find max consecutive numbers, we keep on checking
till which point in the loop the given number matches and increase the length,
as long as the length becomes greater than previous one, we have found it. 


#### [9] Longest Consecutive Sequence

It checks if **its predecessor (num - 1) exists in the set**. If not,
*it initiates a sequence starting from that number and extends it until consecutive numbers are found*. 
Finally, it compares the length of the current sequence with the longest one found so far and updates it if necessary. The function returns the longest consecutive sequence found.

#### [10] Ceils And Floors

For each element, find the *greater closest element (ceil) and the smaller closest element (floor).* 

`const greaterClosest = nums[i] < nums[j] && nums[j] < ceil && i !== j`

`const smallerClosest = nums[i] > nums[j] && nums[j] > floor && i !== j`

#### [11] Second Largest Element

Find max element and its floor;

#### [12] Span

Find min and max value and substract min from max;

#### [13] Product Except Self

It accomplishes this by traversing the array twice. In the first pass, it calculates the product of all elements to the right of each index. In the second pass, it updates the result by multiplying the previously calculated product with the product of all elements to the left of each index. Finally, it returns the resulting array.

#### [14] Rotate Array
To the right: a reverse function is needed first, then the array is reversed 
(0 - n) - > (0 - (k - 1)) -> (k - n) respectively.

To the left: a reverse function is needed first, then the array is reversed 
(0 - (k - 1)) -> (k - n) -> (0 - n) respectively.


#### [15] Search In A Rotated Array
//As long as l not greater than r
    //find m = Math.floor((l + r) / 2)
    //Check if target is m

    //Check if l to m in asc
        //Check if left in asc
        //Check in right part
    //Else
        //Check in right part
        //Check in left part



#### [16] Maximum Sub-array sum

Thw Sum of elements in a sub array is maximized to find maximum sub array sum, 
and to maximize it two choices are required, 
one is the sub array starts from the first index or the sub array starts from anywhere else in the middle.
We find the sum in this case like 
`sum = Math.max(i, sum + i);`


#### [17] Longest Sub-array sequence with sum K

*Lets assume our target is K and we are at ith and preix sum is sum*.

If K is found, 1 is added to its index to find length.
Otherwise k needs (k-sum) or -(sum-k) to be fulfilled, 
but since it can be found travelling backwards in the array, we look for +(sum -k). In order to find (sum - k),
we need to look it up in the map as a key and once found, the associated value is retrieved which represents the index
and substract it from current index to get the length, this length is maximzed to find its maximum length.
if sum is not in map, add it as key and add index as value


#### [18] Longest Alternative Even-odd Sub-array

Lets say isOddEven when previous element is odd and current element is even
and isEvenOdd when previous element is even and current element is odd.
Then if either of isOddEven or isEvenOdd is found in the loop, increment count
otherwise reset the count.

#### [19] Minimum Consecutive Moves To Make Elements Same

In order to find minimum consecutive moves to make elements same, 
we find the actual sum of all the array elements first. Then as we loop through the array
if the array is filled with only the current element, we find the total sum and substract it from the actual sum,
whatever we find we minimize it.

#### [20] Make Consecutive 1s By Flipping Minimum 0s