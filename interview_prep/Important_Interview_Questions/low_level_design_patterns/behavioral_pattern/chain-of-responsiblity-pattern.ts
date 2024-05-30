// Handler interface
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
  }
  
  // Base handler
  abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;
  
    setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }
  
    handle(request: string): string | null {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return null;
    }
  }
  
  // Concrete handlers
  class ConcreteHandler1 extends AbstractHandler {
    handle(request: string): string | null {
      if (request === 'one') {
        return `Handled request: ${request}`;
      } else {
        return super.handle(request);
      }
    }
  }
  
  class ConcreteHandler2 extends AbstractHandler {
    handle(request: string): string | null {
      if (request === 'two') {
        return `Handled request: ${request}`;
      } else {
        return super.handle(request);
      }
    }
  }
  
  class ConcreteHandler3 extends AbstractHandler {
    handle(request: string): string | null {
      if (request === 'three') {
        return `Handled request: ${request}`;
      } else {
        return super.handle(request);
      }
    }
  }
  
  // Usage
  const handler1 = new ConcreteHandler1();
  const handler2 = new ConcreteHandler2();
  const handler3 = new ConcreteHandler3();
  
  handler1.setNext(handler2).setNext(handler3);
  
  console.log(handler1.handle('two')); // Output: Handled request: two
  console.log(handler1.handle('three')); // Output: Handled request: three
  console.log(handler1.handle('four')); // Output: null
  