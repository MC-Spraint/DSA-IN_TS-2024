// Context interface
interface SwitchState {
    // Method to handle switching on
    switchOn(): void;
    
    // Method to handle switching off
    switchOff(): void;
}

// Concrete state: On state
class ConcreteOnState implements SwitchState {
    switchOn(): void {
        console.log("The switch is already on.");
    }

    switchOff(): void {
        console.log("Switching off...");
        console.log("The switch is now off.");
    }
}

// Concrete state: Off state
class OffState implements SwitchState {
    switchOn(): void {
        console.log("Switching on...");
        console.log("The switch is now on.");
    }

    switchOff(): void {
        console.log("The switch is already off.");
    }
}

// Context: Switch
class SwitchContext {
    private state: SwitchState;

    constructor() {
        // Initial state is off
        this.state = new OffState();
    }

    // Method to set state
    setState(state: SwitchState): void {
        this.state = state;
    }

    // Method to switch on
    switchOn(): void {
        this.state.switchOn();
    }

    // Method to switch off
    switchOff(): void {
        this.state.switchOff();
    }
}

// Usage
const mySwitch = new SwitchContext();

// Switch on
mySwitch.switchOn();

// Switch off
mySwitch.switchOff();

// Change state and switch on again
mySwitch.setState(new ConcreteOnState());
mySwitch.switchOn();
