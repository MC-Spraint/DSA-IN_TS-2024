interface Command {
  execute(): void;
  undo(): void;
}
//Receiver
class Light {
  on(): void {
    console.log("The light is on");
  }

  off(): void {
    console.log("The light is off");
  }
}

//Concreate commands
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.on();
  }

  undo(): void {
    this.light.off();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.off();
  }

  undo(): void {
    this.light.on();
  }
}

//Invoker
class RemoteControl {
  private command: Command | null = null;

  setCommand(command: Command): void {
    this.command = command;
  }

  pressButton(): void {
    if (this.command) {
      this.command.execute();
    }
  }

  pressUndo(): void {
    if (this.command) {
      this.command.undo();
    }
  }
}


//Client
// Client code
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

const remote = new RemoteControl();

// Turn the light on
remote.setCommand(lightOnCommand);
remote.pressButton();  // Output: The light is on

// Turn the light off
remote.setCommand(lightOffCommand);
remote.pressButton();  // Output: The light is off

// Undo the last command (turn the light back on)
remote.pressUndo();    // Output: The light is on
