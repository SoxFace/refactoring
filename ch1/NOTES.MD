# 1-decomposingTheStatementFunction

Identify points of the code that seperate different parts of the overall behaviour of the function. The switch statement is the first part to tackle. Create a new `amountFor function` that is *within* the scope of the `function statement` and pop the switch statement within this function. 

This refactoring is called:

`Extract Function (106)` - look at a fragment of code, understand what it is doing, then extract it into its own function.

# 2-removingThePlayVariable

The `play` parameter being passed into `function amountFor` is not necessary, as it's a temporary variable. Temporary variables like `play` can complicate extractions in future as they create locally scoped names. Play is being declared in the `function statement` as `const play = playFor(perf)`. To remove the `play` variable the following refactorings are necessary:

`Replace Temp with Query (178)` - use functions instead of variables. This takes the right-hand side of `play` and turns it into its own function:

```
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
```

`Inline Variable (123)` - When the name of the variable doesn't communicate more than the expression itself, it's a good idea to remove the declaration and assignment of the variable. This technique is the opposite of `Extract variable (119)`. This removes `const play = playFor(perf)` entirely and calls the new playFor funcion inline in `let thisAmount = amountFor(perf, playFor(perf))` and in the `if` and `result` statements.

`Change Function Declaration (124)` - renaming a function to a more readable name. In this commit we changed `perf` to `aPerformance`

# 3-extractingVolumeCredits

# 4-removingTheFormatVariable

`Change Function Declaration (124)`. In this commit we changed `format` to `usd`.

# 5-removingTotalVolumeCredits

`Split Loop (227)` - if you're doing two different things in a loop, split them out so it's easier to read and modify later.

`Slide Statements (223)` - put code that relates to eachother together. In this commit we slid the `let volumeCredits = 0;` down to the for loop calculating the volume credits. We then repeated the same refactoring methods as we did when removing the play variable.

`Replace Temp with Query (178)`
`Extract Function (106)`
`Inline Variable (123)`
