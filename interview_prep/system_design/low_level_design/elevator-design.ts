enum CarState {
    MOVING_UP = "MOVING_UP",
    MOVING_DOWN = "MOVING_DOWN",
    AT_REST = "AT_REST",
}

interface IGateButton {
    open(): void;
    close(): void;
}

interface ICarButton {
    start(state: CarState): void;
    stop(): void;
}

interface IGate extends IGateButton {
    isOpen: boolean;
}

interface ICar extends ICarButton {
    state: CarState;
    gate: IGate;
}

class Gate implements IGate {
    isOpen: boolean;

    constructor() {
        this.isOpen = false;
    }

    open(): void {
        this.isOpen = true;
    }

    close(): void {
        this.isOpen = false;
    }

    getState(): boolean {
        return this.isOpen;
    }
}

class Car implements ICar {
    state: CarState;
    gate: IGate;

    constructor(gate: Gate) {
        this.state = CarState.AT_REST;
        this.gate = gate;
    }

    start(state: CarState): void {
        if (!this.gate.isOpen) {
            this.state = state;
        } else {
            throw new Error("Cannot start the car while the gate is open.");
        }
    }

    stop(): void {
        this.state = CarState.AT_REST;
    }

    getState(): CarState {
        return this.state;
    }

    setState(state: CarState): void {
        this.state = state;
    }
}

class Elevator {
    private car: Car;
    private floors: number[];
    private currFloor: number;
    getCurrentFloor(): number {
        return this.currFloor;
    }
    setCurrentFloor(floor: number): void {
        this.currFloor = floor;
    }

    constructor(car: Car, fromFloor: number, toFloor: number) {
        this.car = car;
        this.currFloor = fromFloor;
        this.floors = [];
        for (let i = fromFloor; i <= toFloor; i++) {
            this.floors.push(i);
        }
    }

    requestFloor(floor: number): void {
        if (floor < this.floors[0] || floor > this.floors[this.floors.length - 1]) {
            throw new Error("Requested floor is out of bounds.");
        }

        if (floor > this.currFloor) {
            this.moveUp(floor);
        } else if (floor < this.currFloor) {
            this.moveDown(floor);
        }
    }

    private moveUp(floor: number): void {
        this.car.gate.close();
        this.car.start(CarState.MOVING_UP);
        while (this.currFloor < floor) {
            this.currFloor++;
            console.log(`Elevator moving up to floor ${this.currFloor}`);
        }
        this.car.stop();
        this.car.gate.open();
        console.log(`Elevator arrived at floor ${this.currFloor}`);
    }

    private moveDown(floor: number): void {
        this.car.gate.close();
        this.car.start(CarState.MOVING_DOWN);
        while (this.currFloor > floor) {
            this.currFloor--;
            console.log(`Elevator moving down to floor ${this.currFloor}`);
        }
        this.car.stop();
        this.car.gate.open();
        console.log(`Elevator arrived at floor ${this.currFloor}`);
    }
}

class Dispatcher {
    private elevators: Elevator[];

    constructor(elevators: Elevator[]) {
        this.elevators = elevators;
    }

    requestElevator(floor: number, direction: CarState): void {
        let bestElevator = this.findBestElevator(floor, direction);
        bestElevator.requestFloor(floor);
    }

    private findBestElevator(floor: number, direction: CarState): Elevator {
        // Simple logic for the closest elevator
        let bestElevator = this.elevators[0];
        let minDistance = Math.abs(bestElevator.getCurrentFloor() - floor);

        for (let elevator of this.elevators) {
            let distance = Math.abs(elevator.getCurrentFloor() - floor);
            if (distance < minDistance) {
                bestElevator = elevator;
                minDistance = distance;
            }
        }

        return bestElevator;
    }
}

const elevator1 = new Elevator(new Car(new Gate()), 0, 20);
const elevator2 = new Elevator(new Car(new Gate()), 0, 20);
const dispatcher = new Dispatcher([elevator1, elevator2]);

dispatcher.requestElevator(5, CarState.MOVING_UP);
dispatcher.requestElevator(2, CarState.MOVING_DOWN);
