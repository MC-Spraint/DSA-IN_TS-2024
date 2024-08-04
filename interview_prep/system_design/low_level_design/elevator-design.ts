namespace ElevatorSystemDesign {
  async function delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  // Strategy pattern
  enum RequestType {
    CALL = "CALL",
    GO = "GO",
  }

  enum CarState {
    MOVING_UP = "MOVING_UP",
    MOVING_DOWN = "MOVING_DOWN",
    AT_REST = "AT_REST",
  }
  enum CarType {
    ADVANCED = "ADVANCED",
    NORMAL = "NORMAL",
  }

  class Request {
    floor: number;
    type: RequestType;
    constructor(floor: number, type: RequestType) {
      this.floor = floor;
      this.type = type;
    }
  }

  interface IGate {
    open(): void;
    close(): void;

    isGateOpen(): boolean;

    getElevatorId(): number;
    setElevatorId(elevatorId: number): void;
  }

  interface ICar {
    start(state: CarState): void;
    stop(): void;

    setState(state: CarState): void;
    getState(): CarState;

    getGate(): IGate;
    getType(): CarType;
  }

  class AutomaticGate implements IGate {
    private isOpen = false;
    private elevatorId = -1;

    async open(): Promise<void> {
      if (!this.isOpen) {
        console.log(
          `${this.getElevatorId()}: Attention! Automatic gate is opening...`
        );
        this.isOpen = true;
        await delay(800);
      }
    }
    async close(): Promise<void> {
      if (this.isOpen) {
        console.log(
          `${this.getElevatorId()}: Attention! Automatic gate is closing...`
        );
        this.isOpen = false;
        await delay(800);
      }
    }

    isGateOpen(): boolean {
      return this.isOpen;
    }

    getElevatorId(): number {
      return this.elevatorId;
    }
    setElevatorId(elevatorId: number): void {
      this.elevatorId = elevatorId;
    }
  }

  class ManualGate implements IGate {
    private isOpen = false;
    private elevatorId = -1;

    async open(): Promise<void> {
      if (!this.isOpen) {
        console.log(`${this.getElevatorId()}: Manual gate is opening...`);
        this.isOpen = true;
        await delay(2);
      }
    }
    async close(): Promise<void> {
      if (this.isOpen) {
        console.log(`${this.getElevatorId()}: Manual gate is closing...`);
        this.isOpen = false;
        await delay(2);
      }
    }

    isGateOpen(): boolean {
      return this.isOpen;
    }

    getElevatorId(): number {
      return this.elevatorId;
    }
    setElevatorId(elevatorId: number): void {
      this.elevatorId = elevatorId;
    }
  }

  class AdvanceCar implements ICar {
    private state: CarState;
    private gate: IGate;
    private type: CarType;

    constructor() {
      this.gate = new AutomaticGate();
      this.state = CarState.AT_REST;
      this.type = CarType.ADVANCED;
    }

    async start(state: CarState): Promise<void> {
      if (!this.gate.isGateOpen()) {
        this.state = state;
        return;
      }
      await this.gate.close();
      this.state = state;
    }
    async stop(): Promise<void> {
      if (!this.gate.isGateOpen()) {
        this.state = CarState.AT_REST;
        await this.gate.open();
      }
    }

    setState(state: CarState): void {
      this.state = state;
    }
    getState(): CarState {
      return this.state;
    }

    getGate(): IGate {
      return this.gate;
    }
    getType(): CarType {
      return this.type;
    }
  }

  class NormalCar implements ICar {
    private state: CarState;
    private gate: IGate;
    private type: CarType;

    constructor() {
      this.gate = new ManualGate();
      this.state = CarState.AT_REST;
      this.type = CarType.NORMAL;
    }

    async start(state: CarState): Promise<void> {
      if (!this.gate.isGateOpen()) {
        this.state = state;
        return;
      }
      throw new Error(`Gate is Open`);
    }
    async stop(): Promise<void> {
      this.state = CarState.AT_REST;
    }

    setState(state: CarState): void {
      this.state = state;
    }
    getState(): CarState {
      return this.state;
    }

    getGate(): IGate {
      return this.gate;
    }

    getType(): CarType {
      return this.type;
    }
  }

  class AsyncQueue<T> {
    private queue: T[] = [];
    private resolvers: Map<T, (result: void) => void> = new Map();
    private processing = false;
    private strategy: QueueStrategy<T>;

    constructor(strategy: QueueStrategy<T>) {
      this.strategy = strategy;
    }

    async enqueue(
      task: T,
      processTask: (task: T) => Promise<void>
    ): Promise<void> {
      this.queue.push(task);
      this.queue = this.strategy.apply(this.queue);

      let resolver: (result: void) => void;
      const promise = new Promise<void>((resolve) => {
        resolver = resolve;
      });
      this.resolvers.set(task, resolver!);
      // Ensure processQueue is called only if not already processing
      if (!this.processing) {
        this.processing = true;
        this.processQueue(processTask).finally(() => {
          this.processing = false;
        });
      }
      await promise;
    }

    private async processQueue(
      processTask: (task: T) => Promise<void>
    ): Promise<void> {
      while (this.queue.length) {
        // Apply strategy to the queue
        const task = this.queue.shift();
        if (task) {
          try {
            await processTask(task);
            const resolve = this.resolvers.get(task);
            if (resolve) {
              resolve();
              this.resolvers.delete(task);
            }
          } catch (error) {
            console.error(`Error processing task: ${error}`);
            // Handle or log error, optionally resolve the promise with failure state if needed
            const resolve = this.resolvers.get(task);
            if (resolve) {
              resolve();
              this.resolvers.delete(task);
            }
          }
        }
      }
    }
  }

  interface QueueStrategy<T> {
    apply(queue: T[]): T[];
  }

  class ElevatorQueueStrategy implements QueueStrategy<Request> {
    apply(queue: Request[]): Request[] {
      const filteredQueue = queue.filter(
        (elem, index, self) =>
          index ===
          self.findIndex((e) => e.floor === elem.floor && e.type === elem.type)
      );

      const callGroup = filteredQueue
        .filter((elem) => elem.type === RequestType.CALL)
        .sort((a, b) => a.floor - b.floor);
      const goGroup = filteredQueue
        .filter((elem) => elem.type === RequestType.GO)
        .sort((a, b) => b.floor - a.floor);
      return [...callGroup, ...goGroup];
    }
  }

  // Main code: Elevator design
  class Elevator {
    id: number;
    car: ICar;
    floors: number[];
    minFloor: number;
    maxFloor: number;
    currFloor: number;
    lastFloor: number;

    queue: AsyncQueue<Request>;
    isQueueBusy: boolean;

    constructor(car: ICar, minFloor: number, maxFloor: number) {
      this.id = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
      this.car = car;
      this.minFloor = minFloor;
      this.maxFloor = maxFloor;
      this.floors = [];
      for (let i = minFloor; i <= maxFloor; i++) {
        this.floors.push(i);
      }
      this.currFloor = minFloor;
      this.lastFloor = 0;

      this.queue = new AsyncQueue<Request>(new ElevatorQueueStrategy());
      this.isQueueBusy = false;
      this.car.getGate().setElevatorId(this.id);
    }

    async autoCloseGateIfNoMovement(noMovementLimit: number): Promise<void> {
      const promise = await new Promise<void>((resolve) => {
        const gateOpenInterval = setInterval(async () => {
          if (!this.car.getGate().isGateOpen()) {
            clearInterval(gateOpenInterval);
            resolve(); // Resolve when gate is closed
          } else {
            console.log(
              `${this.id}: Gate found left-open and due to no movement of elevator, closing it.......................`
            );
            await this.car.getGate().close();
            clearInterval(gateOpenInterval);
            resolve();
          }
        }, noMovementLimit);
      });
      return promise;
    }

    async callElevator(startFloor: number): Promise<void> {
      if (
        this.car.getType() === CarType.NORMAL &&
        this.car.getGate().isGateOpen()
      ) {
        throw new Error(`${this.id} Gate is leff-open!`);
      }

      if (
        startFloor === this.lastFloor &&
        this.car.getState() === CarState.AT_REST
      ) {
        console.log(`${startFloor} ===== ${this.lastFloor}`);
        await this.car.getGate().open();
        return;
      }
      const distance = startFloor > this.currFloor ? 1 : -1;

      await this.car.start(
        distance > 0 ? CarState.MOVING_UP : CarState.MOVING_DOWN
      );
      console.log(
        `${this.id}: Elevator being called from floor ${this.currFloor} to ${startFloor}`
      );
      while (this.currFloor !== startFloor) {
        this.currFloor += distance;
        console.log(
          `${this.id}: Elevator being called: Floor ${this.currFloor}`
        );
        await delay(20);
      }
      console.log(`${this.id}: Elevator arrived at start floor ${startFloor}`);
      await this.car.stop();

      this.lastFloor = startFloor;
    }

    async moveElevatorToTarget(endFloor: number): Promise<void> {
      if (
        this.car.getType() === CarType.NORMAL &&
        this.car.getGate().isGateOpen()
      ) {
        throw new Error(`${this.id} Please close the gate`);
      }
      const distance = endFloor > this.currFloor ? 1 : -1;

      await this.car.start(
        distance > 0 ? CarState.MOVING_UP : CarState.MOVING_DOWN
      );
      console.log(
        `${this.id}: Elevator moving from floor ${this.currFloor} to ${endFloor}`
      );

      while (this.currFloor !== endFloor) {
        this.currFloor += distance;
        console.log(`${this.id}: Elevator moving: Floor ${this.currFloor}`);
        await delay(20); // Simulate time to move between floors
      }
      console.log(`${this.id}: Elevator arrived at end floor ${endFloor}`);
      await this.car.stop();

      this.lastFloor = endFloor;
    }
    async openGate(): Promise<void> {
      await this.car.getGate().open();
    }

    async closeGate(): Promise<void> {
      await this.car.getGate().close();
    }

    async requestElevator(
      startFloor: number,
      endFloor?: number
    ): Promise<void> {
      const call = new Request(startFloor, RequestType.CALL);
      await this.addToQueue(call);
      if (endFloor !== undefined) {
        const go = new Request(endFloor, RequestType.GO);
        await this.addToQueue(go);
      }
    }

    async addToQueue(task: Request): Promise<void> {
      this.checkBound(task);
      await this.queue.enqueue(task, this.processTask.bind(this));
    }

    private async processTask(task: Request): Promise<void> {
      if (task) {
        const { floor, type } = task;
        if (type === RequestType.CALL) {
          await this.callElevator(floor);
          if (this.car.getType() === CarType.ADVANCED) {
            this.autoCloseGateIfNoMovement(500);
          }
          //open from outer control panel
          await this.car.getGate().open();

          //close from inner control panel
          await this.car.getGate().close();
        }

        if (type === RequestType.GO) {
          //Move from inner control panel
          await this.moveElevatorToTarget(floor);

          //open from inner control panel;
          await this.car.getGate().open();

          if (this.car.getType() === CarType.ADVANCED) {
            this.autoCloseGateIfNoMovement(500);
          }
          //close from outer control panel
          await this.car.getGate().close();
        }
      }
    }

    checkBound({ floor, type }: Request): void {
      const isWithinBounds = (floor: number) =>
        floor <= this.maxFloor && floor >= this.minFloor;

      if (!isWithinBounds(floor))
        throw new Error(
          `Invalid floor request: ${
            type === RequestType.CALL ? "startFloor" : "endFloor"
          } ${floor}`
        );

      if (floor === undefined && type === RequestType.GO) return;
    }
  }

  // Example usage
  async function run() {
    const elevator = new Elevator(new NormalCar(), 0, 20);

    // First block of concurrent requests
    await Promise.all([
      elevator.requestElevator(5),
      elevator.requestElevator(1, 9),
      elevator.requestElevator(10, 6),
      elevator.requestElevator(2, 7),
      elevator.requestElevator(2, 7),
    ]);

    // Second block of concurrent requests
    await Promise.all([
      elevator.requestElevator(10, 1),
      elevator.requestElevator(2, 8),
    ]);
  }
  run();
}
