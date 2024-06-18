// Define Expression interface
interface Expression {
    interpret(): number;
}

// Terminal expression: NumberExpression
class NumberExpression implements Expression {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    interpret(): number {
        return this.value;
    }
}

// Non-terminal expressions: AddExpression, SubtractExpression, MultiplyExpression, DivideExpression
class AddExpression implements Expression {
    private left: Expression | undefined;
    private right: Expression | undefined;

    constructor(left: Expression | undefined, right: Expression | undefined) {
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        const leftValue = this.left ? this.left.interpret() : 0;
        const rightValue = this.right ? this.right.interpret() : 0;
        return leftValue + rightValue;
    }
}

class SubtractExpression implements Expression {
    private left: Expression | undefined;
    private right: Expression | undefined;

    constructor(left: Expression | undefined, right: Expression | undefined) {
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        const leftValue = this.left ? this.left.interpret() : 0;
        const rightValue = this.right ? this.right.interpret() : 0;
        return leftValue - rightValue;
    }
}

class MultiplyExpression implements Expression {
    private left: Expression | undefined;
    private right: Expression | undefined;

    constructor(left: Expression | undefined, right: Expression | undefined) {
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        const leftValue = this.left ? this.left.interpret() : 1;
        const rightValue = this.right ? this.right.interpret() : 1;
        return leftValue * rightValue;
    }
}

class DivideExpression implements Expression {
    private left: Expression | undefined;
    private right: Expression | undefined;

    constructor(left: Expression | undefined, right: Expression | undefined) {
        this.left = left;
        this.right = right;
    }

    interpret(): number {
        const leftValue = this.left ? this.left.interpret() : 0;
        const rightValue = this.right ? this.right.interpret() : 1; // Default to 1 to avoid division by zero
        if (rightValue === 0) {
            throw new Error('Division by zero error');
        }
        return leftValue / rightValue;
    }
}

// Tokenization function: tokenize
function tokenize(expression: string): string[] {
    const tokens: string[] = [];
    let currentToken = '';

    for (const char of expression) {
        if ('+-*/()'.includes(char)) {
            if (currentToken.trim()) tokens.push(currentToken.trim());
            tokens.push(char);
            currentToken = '';
        } else {
            currentToken += char;
        }
    }

    if (currentToken.trim()) tokens.push(currentToken.trim());

    return tokens;
}

// Handle negative numbers function
function handleNegativeNumbers(tokens: string[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '-' && (i === 0 || '+-*/('.includes(tokens[i - 1]))) {
            result.push(tokens[i] + tokens[i + 1]);
            i++;
        } else {
            result.push(tokens[i]);
        }
    }
    return result;
}

// Shunting Yard algorithm: shuntingYard
function shuntingYard(tokens: string[]): string[] {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];
    const precedence: Map<string, number> = new Map([
        ['+', 1],
        ['-', 1],
        ['*', 2],
        ['/', 2]
    ]);

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            outputQueue.push(token);
        } else if (precedence.has(token)) {
            while (operatorStack.length > 0 &&
                precedence.get(operatorStack[operatorStack.length - 1])! >= precedence.get(token)! &&
                operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.pop(); // Pop the '('
        }
    }

    return outputQueue.concat(operatorStack.reverse());
}



// Build expression tree: buildExpressionTree
function buildExpressionTree(postfix: string[]): Expression {
    const stack: Expression[] = [];

    for (const token of postfix) {
        if (!isNaN(Number(token))) {
            stack.push(new NumberExpression(Number(token)));
        } else {
            const right = stack.pop()!;
            const left = stack.pop()!;
            switch (token) {
                case '+':
                    stack.push(new AddExpression(left, right));
                    break;
                case '-':
                    stack.push(new SubtractExpression(left, right));
                    break;
                case '*':
                    stack.push(new MultiplyExpression(left, right));
                    break;
                case '/':
                    stack.push(new DivideExpression(left, right));
                    break;
            }
        }
    }

    return stack.pop()!;
}

// Evaluate expression: evaluateExpression
function evaluateExpression(expression: string): number {
    try {
        let tokens = tokenize(expression);
        tokens = handleNegativeNumbers(tokens);
        const postfix = shuntingYard(tokens);
        const parsedExpression = buildExpressionTree(postfix);
        return parsedExpression.interpret();
    } catch (error) {
        console.error('Error evaluating expression:', error);
        return NaN;
    }
}

// Example usage:
const expression = '-3 - 2 + 7 / 2 * 3 * 2 / -3 - 2 + 6';
const result = evaluateExpression(expression);
console.log(result); // Output should be -8
