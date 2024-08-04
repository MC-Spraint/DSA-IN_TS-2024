namespace CarRentalSystem {
  function generateId() {
    const id = Math.floor(Math.random() * (9999 - 1111 + 4)) + 1111;
    return String(id);
  }
  class DataPool {
    users: User[] = [];
    addresses: Address[] = [];
    additionalServices: AdditionalService[] = [];
    vehicles: Vehicle[] = [];
    bookings: Booking[] = [];
    payments: Payment[] = [];

    private static instance: DataPool;
    private constructor() {} // Private constructor

    public static getInstance(): DataPool {
      if (!DataPool.instance) {
        DataPool.instance = new DataPool();
      }
      return DataPool.instance;
    }
  }

  enum VehicleType {
    CAR = "CAR",
    TRUCK = "TRUCK",
    SUV = "SUV",
    VAN = "VAN",
    MOTORCYCLE = "MOTORCYCLE",
  }

  enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED",
    RENTED = "RENTED",
    MAINTENANCE = "MAINTENANCE",
  }

  enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
  }

  enum PaymentType {
    CREDIT_CARD = "CREDIT_CARD",
    UPI = "UPI",
  }

  enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
  }
  enum NotificationType {
    EMAIL = "EMAIL",
    SMS = "SMS",
    PUSH = "PUSH",
  }

  class Address {
    constructor(
      public id: string, // Added id property
      public street: string,
      public city: string,
      public state: string,
      public zip: string
    ) {}
  }

  class User implements Observable {
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public phone: string,
      public address: Address
    ) {}

    getNotified(message: string): void {
      console.log(`User ${this.id} received message: ${message}`);
    }
  }

  class AdditionalService {
    constructor(
      public id: string,
      public title: string,
      public charge: number
    ) {}
  }

  class Vehicle {
    constructor(
      public id: string,
      public vehicleType: VehicleType,
      public make: string,
      public model: string,
      public year: number,
      public charge: number,
      public status: VehicleStatus
    ) {}
  }

  class Booking {
    constructor(
      public id: string,
      public userId: string,
      public vehicleId: string,
      public startDate: Date,
      public endDate: Date,
      public returnDate: Date | null = null,
      public rentalCharge: number = 0,
      public lateCharge: number = 0,
      public status: BookingStatus = BookingStatus.PENDING,
      public barCode: string | null = null
    ) {}
  }
  class Payment {
    constructor(
      public id: string,
      public bookingId: string,
      public amount: number,
      public type: PaymentType,
      public paymentTime: number,
      public paymentStatus: PaymentStatus = PaymentStatus.PENDING
    ) {}
  }

  class Lock {
    private promise: Promise<void> = Promise.resolve();
    private resolve: (() => void) | null = null;

    async acquire(): Promise<void> {
      let acquired = false;
      while (!acquired) {
        await this.promise.then(() => {
          if (this.resolve === null) {
            this.promise = new Promise<void>((res) => {
              this.resolve = res;
            });
            acquired = true;
          }
        });
      }
    }

    release(): void {
      if (this.resolve) {
        this.resolve();
        this.resolve = null;
      }
    }
  }

  // BaseRepository class
  abstract class BaseRepository<T extends { id: string }> {
    protected lock: Lock;
    protected dataPool: DataPool;
    protected data: T[];

    constructor(data: T[] = [], dataPool: DataPool) {
      this.lock = new Lock();
      this.data = data;
      this.dataPool = dataPool;
    }

    async add(item: T): Promise<string> {
      await this.lock.acquire();
      try {
        this.data.push(item);
        return Promise.resolve(item.id);
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.add.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async getAll(): Promise<T[]> {
      await this.lock.acquire();

      try {
        return Promise.resolve(this.data);
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.getAll.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async getById(id: string): Promise<T | undefined> {
      await this.lock.acquire();
      try {
        return Promise.resolve(this.data.find((item: any) => item.id === id));
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.getById.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async removeById(id: string): Promise<boolean> {
      await this.lock.acquire();
      try {
        const index = this.data.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          this.data.splice(index, 1);
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.removeById.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async updateById(id: string, updatedItem: T): Promise<boolean> {
      await this.lock.acquire();
      try {
        const index = this.data.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          this.data[index] = updatedItem;
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.updateById.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    // Generalized method with criteria
    async removeByCriteria(criteria: (item: T) => boolean): Promise<boolean> {
      await this.lock.acquire();
      try {
        const index = this.data.findIndex(criteria);
        if (index !== -1) {
          this.data.splice(index, 1);
          return Promise.resolve(true);
        }
        return Promise.resolve(false);
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.removeByCriteria.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async getByCriteria(
      criteria: (item: T) => boolean
    ): Promise<T | undefined> {
      await this.lock.acquire();
      try {
        return Promise.resolve(this.data.find(criteria));
      } catch (error) {
        throw new Error(`[${BaseRepository.name}] ${this.getByCriteria.name}
        : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }
  }

  class AddressRepository extends BaseRepository<Address> {
    constructor(data: Address[] = []) {
      super(data, DataPool.getInstance());
    }
  }

  class UserRepository extends BaseRepository<User> {
    constructor(data: User[] = []) {
      super(data, DataPool.getInstance());
    }
  }

  class AdditionalServiceRepository extends BaseRepository<AdditionalService> {
    constructor(data: AdditionalService[] = []) {
      super(data, DataPool.getInstance());
    }
  }

  class VehicleRepository extends BaseRepository<Vehicle> {
    constructor(data: Vehicle[] = []) {
      super(data, DataPool.getInstance());
    }
  }

  class BookingRepository extends BaseRepository<Booking> {
    constructor(data: Booking[] = []) {
      super(data, DataPool.getInstance());
    }

    async addBarCodeToBooking(
      barCode: string,
      bookingId: string
    ): Promise<void> {
      const booking = await this.getById(bookingId);
      if (!booking) throw new Error(`Barcode: ${barCode} not found`);
      booking.barCode = barCode;
      await this.updateById(bookingId, booking);
    }
    async getBookingIdByBarCode(barCode: string): Promise<string> {
      const booking = await this.getByCriteria((b) => b.barCode === barCode);
      if (!booking) throw new Error(`Barcode: ${barCode} not found`);
      return booking.id;
    }
  }

  class PaymentRepository extends BaseRepository<Payment> {
    constructor(data: Payment[] = []) {
      super(data, DataPool.getInstance());
    }
  }

  //############### Notification Moldule Starts ##################
  interface INotificationStrategy {
    send(userId: string, message: string): void;
  }
  class EmailNotification implements INotificationStrategy {
    send(userId: string, message: string): void {
      console.log(`${EmailNotification.name}[To Id: ${userId}]: ${message}`);
    }
  }
  class SMSNotification implements INotificationStrategy {
    send(userId: string, message: string): void {
      console.log(`${SMSNotification.name}[To Id: ${userId}]: ${message}`);
    }
  }
  class NotificationStrategyFactory {
    static createStrategy(type: string): INotificationStrategy {
      switch (type) {
        case NotificationType.EMAIL:
          return new EmailNotification();
        case NotificationType.SMS:
          return new SMSNotification();
        default:
          throw new Error(`Strategy ${type} not found`);
      }
    }
  }
  class NotificationContext {
    private userId: string;
    private notificationType: NotificationType;
    private strategy: INotificationStrategy;

    constructor(userId: string, notificationType: NotificationType) {
      this.userId = userId;
      this.notificationType = notificationType;
      this.strategy = NotificationStrategyFactory.createStrategy(
        this.notificationType
      );
    }
    getStrategy(): INotificationStrategy {
      return this.strategy;
    }
    send(message: string): void {
      this.strategy.send(this.userId, message);
    }
    getNotificationType(): NotificationType {
      return this.notificationType;
    }
    getUSerId(): string {
      return this.userId;
    }
  }
  interface Observable {
    id: string;
    getNotified(message: string): void;
  }
  class NotificationObservable<T extends Observable> {
    private observers: T[] = [];
    constructor(
      private strategies: INotificationStrategy[] = [
        new EmailNotification(),
        new SMSNotification(),
      ]
    ) {}

    addObserver(observer: T): void {
      this.observers.push(observer);
    }

    removeObserver(id: string): boolean {
      const index = this.observers.findIndex((observer) => observer.id === id);
      if (index !== -1) {
        this.observers.splice(index, 1);
        return true;
      }
      return false;
    }

    // Notify all users using all strategies
    sendNotificationToAll(
      message: string,
      notificationContext: NotificationContext
    ): void {
      const observers = this.observers;
      if (observers.length === 0) {
        console.log("No users to notify.");
        return;
      }
      const strategy = this.strategies.find(
        (s) => s.constructor === notificationContext.getStrategy().constructor
      );
      if (!strategy)
        throw new Error(`${this.sendNotificationToAll.name}[${NotificationObservable.name}]
                  Strategy not found`);

      this.observers.forEach((o) => {
        strategy.send(o.id, message);
      });
    }

    sendNotificationToOne(
      message: string,
      notificationContext: NotificationContext,
      observerId: string
    ): void {
      const observer = this.observers.find((o) => o.id === observerId);
      const strategy = this.strategies.find(
        (s) => s.constructor === notificationContext.getStrategy().constructor
      );
      if (!observer)
        throw new Error(`${this.sendNotificationToOne.name}[${NotificationObservable.name}]
                  Observer[id: ${observerId}] not found`);
      if (!strategy)
        throw new Error(`${this.sendNotificationToOne.name}[${NotificationObservable.name}]
                  Strategy not found`);
      strategy.send(observer.id, message);
    }
  }
  class NotificationService {
    private observable: NotificationObservable<User>;

    constructor() {
      this.observable = new NotificationObservable<User>();
    }
    subscribe(user: User): void {
      this.observable.addObserver(user);
    }

    unSubscribe(userId: string): boolean {
      return this.observable.removeObserver(userId);
    }
    // Notify all users using all strategies
    sendNotificationToAll(
      message: string,
      notificationContext: NotificationContext
    ): void {
      try {
        this.observable.sendNotificationToAll(message, notificationContext);
      } catch (err) {
        throw new Error(`Failed to send notification: ${err.message}`);
      }
    }

    sendNotificationToOne(
      message: string,
      notificationContext: NotificationContext,
      userId: string
    ): void {
      try {
        this.observable.sendNotificationToOne(
          message,
          notificationContext,
          userId
        );
      } catch (err) {
        throw new Error(`Failed to send notification: ${err.message}`);
      }
    }
  }

  //############### Notification Moldule Ends ##################

  //############### Payments Moldule Starts ##################
  interface IPaymentStrategy {
    process(amount: number): void;
  }
  class CreditCardPayment implements IPaymentStrategy {
    process(amount: number): void {
      console.log(`Paying ${amount} using Credit Card`);
    }
  }
  class UPIService {
    makePayment(amount: number): void {
      console.log(`Paying ${amount} using UPI`);
    }
  }
  class UPIPayment implements IPaymentStrategy {
    constructor(private upiService: UPIService = new UPIService()) {}

    process(amount: number): void {
      this.upiService.makePayment(amount);
    }
  }
  class PaymentStrategyFactory {
    static createStrategy(type: PaymentType): IPaymentStrategy {
      switch (type) {
        case PaymentType.CREDIT_CARD:
          return new CreditCardPayment();
        case PaymentType.UPI:
          return new UPIPayment();
        default:
          throw new Error(`Strategy ${type} not found`);
      }
    }
  }
  class PaymentContext {
    private paymentType: PaymentType;
    private strategy: IPaymentStrategy;

    constructor(paymentType: PaymentType) {
      this.paymentType = paymentType;
      this.strategy = PaymentStrategyFactory.createStrategy(this.paymentType);
    }
    getPaymentType(): PaymentType {
      return this.paymentType;
    }

    getStrategy(): IPaymentStrategy {
      return this.strategy;
    }

    processPayment(amount: number): void {
      this.strategy.process(amount);
    }
  }
  class PaymentService {
    constructor(private paymentRepo: PaymentRepository) {
      this.processPayment = this.processPayment.bind(this);
      this.createPayment = this.createPayment.bind(this);
    }

    processPayment(amount: number, context: PaymentContext): void {
      const strategy = context.getStrategy();
      strategy.process(amount);
    }
    async createPayment(
      amount: number,
      context: PaymentContext,
      bookingId: string
    ): Promise<string> {
      const payment = await this.paymentRepo.getByCriteria(
        (p: Payment) => p.id === bookingId
      );
      if (payment) {
        throw new Error(`Payment already exists for bookingId ${bookingId}`);
      }
      const newPayment = new Payment(
        generateId(),
        bookingId,
        amount,
        context.getPaymentType(),
        Date.now()
      );
      const paymentId = await this.paymentRepo.add(newPayment);
      return paymentId;
    }
    async pay(
      amount: number,
      context: PaymentContext,
      bookingId: string
    ): Promise<string> {
      try {
        context.processPayment(amount);
        const paymentId = await this.createPayment(amount, context, bookingId);
        if (!paymentId)
          throw new Error(
            `Failed to save Payment with paymentId: ${paymentId}`
          );
        return paymentId;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  //############### Payments Module ##################

  type Fees = {
    rentFee: number;
    lateFee: number;
    additionalServicesFee: number;
    totalFees: number;
  };
  interface IBookingService {
    createReservation(
      userId: string,
      vehicleId: string,
      startDate: Date,
      endDate: Date
    ): Promise<string>;
    confirmBookingToGetBarCode(bookingId: string): Promise<{
      barCode: string;
      booking: Booking;
    }>;
    cancelBooking(bookingId: string): Promise<void>;

    pickUpVehicle(barCode: string): Promise<void>;
    returnVehicleAndPay(
      barCode: string,
      paymentContext: PaymentContext
    ): Promise<void>;
    completePayment(
      barCode: string,
      paymentContext: PaymentContext
    ): Promise<void>;
  }
  class BookingService implements IBookingService {
    private lock: Lock = new Lock();
    constructor(
      private addressRepo: AddressRepository,
      private userRepo: UserRepository,
      private vehicleRepo: VehicleRepository,
      private bookingRepo: BookingRepository,
      private paymentService: PaymentService,
      private notificationService: NotificationService
    ) {}
    // ### Start ###
    async createReservation(
      userId: string,
      vehicleId: string,
      startDate: Date,
      endDate: Date
    ): Promise<string> {
      await this.lock.acquire();
      try {
        //Get user
        const user = await this.userRepo.getById(userId);
        if (!user) {
          throw new Error(`User not found`);
        }

        //Get Vehicle with status AVAILABLE
        const vehicle = await this.getVehicleStatusUsingValidation(
          vehicleId,
          VehicleStatus.AVAILABLE,
          `Vehicle is eighter not found or not available`
        );
        //Update vehicle status to RESERVED
        vehicle.status = VehicleStatus.RESERVED;
        await this.vehicleRepo.updateById(vehicleId, vehicle);

        //Create booking
        const newbooking = new Booking(
          generateId(),
          userId,
          vehicleId,
          startDate,
          endDate
        );
        const bookingId = await this.bookingRepo.add(newbooking);

        this.notificationService.subscribe(user);

        return bookingId;
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.createReservation.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async confirmBookingToGetBarCode(
      bookingId: string
    ): Promise<{ barCode: string; booking: Booking }> {
      await this.lock.acquire();
      try {
        //Get booking with status PENDING
        const booking = await this.getBookingStatusUsingValidation(
          bookingId,
          BookingStatus.PENDING
        );

        //Update booking status to CONFIRMED
        booking.status = BookingStatus.CONFIRMED;
        await this.bookingRepo.updateById(bookingId, booking);

        //Create barcode
        const barCode = generateId();
        await this.bookingRepo.addBarCodeToBooking(barCode, booking.id);

        const notificationContext = new NotificationContext(
          booking.userId,
          NotificationType.EMAIL
        );
        this.notificationService.sendNotificationToOne(
          `User[id: ${booking.userId}] Booking[id: ${bookingId}] 
            Booking successful`,
          notificationContext,
          booking.userId
        );
        return { barCode, booking };
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.confirmBookingToGetBarCode.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async cancelBooking(bookingId: string): Promise<void> {
      await this.lock.acquire();
      try {
        //Get booking with status CONFIRMED
        const booking = await this.getBookingStatusUsingValidation(
          bookingId,
          BookingStatus.CONFIRMED
        );
        //Get Vehicle with status RESERVED
        const vehicle = await this.getVehicleStatusUsingValidation(
          booking.id,
          VehicleStatus.RESERVED
        );

        //Update booking status to CANCELLED
        booking.status = BookingStatus.CANCELLED;
        await this.bookingRepo.updateById(bookingId, booking);

        //Update vehicle status to AVAILABLE
        vehicle.status = VehicleStatus.AVAILABLE;
        await this.vehicleRepo.updateById(vehicle.id, vehicle);

        const notificationContext = new NotificationContext(
          booking.userId,
          NotificationType.EMAIL
        );
        this.notificationService.sendNotificationToOne(
          `User[id: ${booking.userId}] Booking[id: ${bookingId}] 
            Booking Cancelled`,
          notificationContext,
          booking.userId
        );
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.cancelBooking.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async pickUpVehicle(barCode: string): Promise<void> {
      await this.lock.acquire();
      try {
        const bookingId = await this.bookingRepo.getBookingIdByBarCode(barCode);
        if (!bookingId) throw new Error(`BarCode not found`);

        //Get booking with status CONFIRMED
        const booking = await this.getBookingStatusUsingValidation(
          bookingId,
          BookingStatus.CONFIRMED
        );
        //Get Vehicle with status RESERVED
        const vehicle = await this.getVehicleStatusUsingValidation(
          booking.vehicleId,
          VehicleStatus.RESERVED
        );
        //Update vehicle status to RENTED
        vehicle.status = VehicleStatus.RENTED;
        await this.vehicleRepo.updateById(vehicle.id, vehicle);

        const notificationContext = new NotificationContext(
          booking.userId,
          NotificationType.EMAIL
        );
        this.notificationService.sendNotificationToOne(
          `User[id: ${booking.userId}] Booking[id: ${bookingId}] Vehicle[id: ${booking.vehicleId}] 
            Vehicle picked up`,
          notificationContext,
          booking.userId
        );
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.pickUpVehicle.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async returnVehicle(barCode: string): Promise<void> {
      await this.lock.acquire();
      try {
        const bookingId = await this.bookingRepo.getBookingIdByBarCode(barCode);
        if (!bookingId) throw new Error(`BarCode not found`);

        //Get booking with status CONFIRMED
        const booking = await this.getBookingStatusUsingValidation(
          bookingId,
          BookingStatus.CONFIRMED
        );
        //Get Vehicle with status RENTED
        const vehicle = await this.getVehicleStatusUsingValidation(
          booking.vehicleId,
          VehicleStatus.RENTED,
          `Vehicle is not even rented`
        );

        //Update vehicle status to AVAILABLE
        vehicle.status = VehicleStatus.AVAILABLE;
        await this.vehicleRepo.updateById(vehicle.id, vehicle);

        const notificationContext = new NotificationContext(
          booking.userId,
          NotificationType.EMAIL
        );
        this.notificationService.sendNotificationToOne(
          `User[id: ${booking.userId}] Booking[id: ${bookingId}] Vehicle[id: ${vehicle.id}] 
            Vehicle returned`,
          notificationContext,
          booking.userId
        );
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.returnVehicle.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }

    async completePayment(
      barCode: string,
      paymentContext: PaymentContext
    ): Promise<void> {
      await this.lock.acquire();
      try {
        const bookingId = await this.bookingRepo.getBookingIdByBarCode(barCode);
        if (!bookingId) throw new Error(`BarCode not found`);

        //Get booking with status CONFIRMED
        const booking = await this.getBookingStatusUsingValidation(
          bookingId,
          BookingStatus.CONFIRMED
        );
        //Get Vehicle with status AVAILABLE
        const vehicle = await this.getVehicleStatusUsingValidation(
          booking.vehicleId,
          VehicleStatus.AVAILABLE
        );

        //Calculate fees
        const returnDate = new Date();
        const fees = this.calculateFees(
          vehicle.charge,
          returnDate.getTime(),
          booking.startDate,
          booking.endDate
        );

        //Call PaymentService to
        const paymentId = await this.paymentService.pay(
          fees.totalFees,
          paymentContext,
          bookingId
        ); //status is generally given by web
        if (!paymentId)
          throw new Error(
            `Failed to process payment for paymentId: ${paymentId}`
          );
        booking.status = BookingStatus.COMPLETED;
        await this.bookingRepo.updateById(bookingId, booking);

        const notificationContext = new NotificationContext(
          booking.userId,
          NotificationType.EMAIL
        );
        this.notificationService.sendNotificationToOne(
          `User[id: ${booking.userId}] Booking[id: ${bookingId}] Payment[id: ${paymentId}]
            Payment successful`,
          notificationContext,
          booking.userId
        );
      } catch (error) {
        throw new Error(`[${BookingService.name}] ${this.completePayment.name}
          : ${error.message}`);
      } finally {
        this.lock.release();
      }
    }
    async returnVehicleAndPay(
      barCode: string,
      paymentContext: PaymentContext
    ): Promise<void> {
      await this.returnVehicle(barCode);
      await this.completePayment(barCode, paymentContext);
    }

    //### Utility Methods ###
    private async getVehicleStatusUsingValidation(
      vehicleId: string,
      requiredStatus: VehicleStatus,
      errMsg?: string
    ): Promise<Vehicle> {
      errMsg = errMsg || `Vehicle not found for vehicleId: ${vehicleId}`;

      //Get Vehicle and validate the status
      const vehicle = await this.vehicleRepo.getById(vehicleId);
      if (!vehicle || vehicle.status !== requiredStatus) {
        throw new Error(errMsg);
      }
      return vehicle;
    }

    private async getBookingStatusUsingValidation(
      bookingId: string,
      requiredStatus: BookingStatus,
      errMsg?: string
    ): Promise<Booking> {
      errMsg = errMsg || `Booking not found for bookingId: ${bookingId}`;

      //Get booking and validate the status
      const booking = await this.bookingRepo.getById(bookingId);
      if (!booking || booking.status !== requiredStatus) {
        throw new Error(errMsg);
      }
      return booking;
    }

    private calculateFees(
      vehicleCharge: number,
      returnTime: number,
      startDate: Date,
      endDate: Date
    ): Fees {
      let rentFee = 0;
      let lateFee = 0;
      let additionalServicesFee = 0;

      const duration = (returnTime - startDate.getTime()) / 1000;

      rentFee = duration * vehicleCharge;

      if (returnTime > endDate.getTime()) {
        lateFee = duration * rentFee * 1.5; // 1.5x rate for late fee
      }

      const totalFees = rentFee + lateFee + additionalServicesFee;
      const feesObj = { rentFee, lateFee, additionalServicesFee, totalFees };
      return feesObj;
    }
  }

  async function test() {
    // Example setup
    const userRepo = new UserRepository();
    const vehicleRepo = new VehicleRepository();
    const bookingRepo = new BookingRepository();
    const paymentRepo = new PaymentRepository();

    const notificationService = new NotificationService();
    const paymentService = new PaymentService(paymentRepo);

    const bookingService = new BookingService(
      new AddressRepository(),
      userRepo,
      vehicleRepo,
      bookingRepo,
      paymentService,
      notificationService
    );

    // Create a user
    const userId = generateId();
    const address = new Address(
      userId,
      "123 Main St",
      "Metropolis",
      "NY",
      "10001"
    );
    const user = new User(
      userId,
      "John Doe",
      "john.doe@example.com",
      "555-1234",
      address
    );
    await userRepo.add(user);

    // Create a vehicle
    const vehicleId = generateId();
    const vehicle = new Vehicle(
      vehicleId,
      VehicleType.CAR,
      "Toyota",
      "Camry",
      2022,
      20,
      VehicleStatus.AVAILABLE
    );
    await vehicleRepo.add(vehicle);

    // Create a reservation
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // 1 day later
    const bookingId = await bookingService.createReservation(
      userId,
      vehicleId,
      startDate,
      endDate
    );
    console.log(`Booking created with ID: ${bookingId}`);

    // Confirm booking and get barcode
    const { barCode, booking } =
      await bookingService.confirmBookingToGetBarCode(bookingId);
    console.log(`Booking confirmed with BarCode: ${barCode}`);

    // Pick up the vehicle using the barcode
    await bookingService.pickUpVehicle(barCode);
    console.log(`Vehicle picked up for booking ID: ${bookingId}`);

    // Create a payment context
    const paymentContext = new PaymentContext(PaymentType.CREDIT_CARD);
    // Return the vehicle and complete payment
    await bookingService.returnVehicleAndPay(barCode, paymentContext);
    console.log(
      `Vehicle returned and payment completed for booking ID: ${bookingId}`
    );
  }
  test();
}
