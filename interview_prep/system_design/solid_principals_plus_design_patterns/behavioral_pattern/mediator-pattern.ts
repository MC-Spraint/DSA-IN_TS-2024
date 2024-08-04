// Define Mediator interface
interface Mediator {
    notify(sender: Colleague, event: string): void;
  }
  
  // Define Colleague interface
  interface Colleague {
    setMediator(mediator: Mediator): void;
    send(event: string): void;
    receive(event: string): void;
  }
  
  // Concrete Mediator
  class ConcreteMediator implements Mediator {
    private colleagues: Colleague[] = [];
  
    addColleague(colleague: Colleague) {
      this.colleagues.push(colleague);
      colleague.setMediator(this);
    }
  
    notify(sender: Colleague, event: string): void {
      this.colleagues.forEach(colleague => {
        if (colleague !== sender) {
          colleague.receive(event);
        }
      });
    }
  }
  
  // Concrete Colleague
  class ConcreteColleague implements Colleague {
    private mediator!: Mediator;
  
    setMediator(mediator: Mediator): void {
      this.mediator = mediator;
    }
  
    send(event: string): void {
      console.log(`Sending "${event}"`);
      this.mediator.notify(this, event);
    }
  
    receive(event: string): void {
      console.log(`Received "${event}"`);
    }
  }
  
  // Usage
  const mediator = new ConcreteMediator();
  
  const colleague1 = new ConcreteColleague();
  const colleague2 = new ConcreteColleague();
  
  mediator.addColleague(colleague1);
  mediator.addColleague(colleague2);
  
  colleague1.send("Hello!");
  colleague2.send("Hi there!");
  