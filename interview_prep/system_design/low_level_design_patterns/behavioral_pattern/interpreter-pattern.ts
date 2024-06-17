// Abstract Expression interface
interface Expression {
    interpret(context: Context): number;
  }
  
  // Terminal Expression for numbers
  class NumberExpression implements Expression {
    private number: number;
  
    constructor(number: number) {
      this.number = number;
    }
  
    interpret(context: Context): number {
      return this.number;
    }
  }
  
  // Terminal Expression for variables
  class VariableExpression implements Expression {
    private name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    interpret(context: Context): number {
      return context.lookup(this.name);
    }
  }
  
  // Nonterminal Expression for addition
  class AddExpression implements Expression {
    private left: Expression;
    private right: Expression;
  
    constructor(left: Expression, right: Expression) {
      this.left = left;
      this.right = right;
    }
  
    interpret(context: Context): number {
      return this.left.interpret(context) + this.right.interpret(context);
    }
  }
  
  // Nonterminal Expression for subtraction
  class SubtractExpression implements Expression {
    private left: Expression;
    private right: Expression;
  
    constructor(left: Expression, right: Expression) {
      this.left = left;
      this.right = right;
    }
  
    interpret(context: Context): number {
      return this.left.interpret(context) - this.right.interpret(context);
    }
  }
  
  // Context class
  class Context {
    private variables: Map<string, number> = new Map();
  
    setVariable(name: string, value: number): void {
      this.variables.set(name, value);
    }
  
    lookup(name: string): number {
      if (!this.variables.has(name)) {
        throw new Error(`Undefined variable: ${name}`);
      }
      return this.variables.get(name) as number;
    }
  }
  
  // Usage
  const context = new Context();
  context.setVariable('x', 5);
  context.setVariable('y', 10);
  
  const expression: Expression = new AddExpression(
    new VariableExpression('x'),
    new SubtractExpression(
      new VariableExpression('y'),
      new NumberExpression(2)
    )
  );
  
  const result = expression.interpret(context);
  console.log(`Result: ${result}`); // Result: 13
  