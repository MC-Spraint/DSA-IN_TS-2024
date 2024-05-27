### [Bounderies-condition]
1. Down-boundery -> row < matrix.length
2. Left-boundery -> col >= 0
3. Up-boundery -> row >= 0
4. Right-boundery -> col < matrix[0].length
 
### [Down-Right]
___
#### Condition: 
`row < matrix.length && col < matrix[0].length`
#### Action:
`col ++`
`row ++`

### [Down-Left]
___
#### Condition: 
`row < matrix.length && col >= 0`
#### Action:
`row ++`
`col --`

### [Up-Left]
___
#### Condition: 
`row >= 0 && col >= 0`
#### Action:
`row --`
`col --`

### [Up-Right]
___
#### Condition: 
`row >= 0 && col < matrix[0].length`
#### Action:
`row --`
`col ++`



### [Right]
___
#### Condition: 
`col < matrix[0].length`
#### Action:
`col ++`

### [Down]
___
#### Condition: 
`col < matrix.length`
#### Action:
`row ++`


### [Left]
___
#### Condition: 
`col >= 0`
#### Action:
`col --`

### [Up]
___
#### Condition: 
`row >= 0`
#### Action:
`row --`

