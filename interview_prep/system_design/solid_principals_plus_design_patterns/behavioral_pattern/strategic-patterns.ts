// Strategy interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} via Credit Card.`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} via PayPal.`);
  }
}

class BankTransferPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paying ${amount} via Bank Transfer.`);
  }
}

// Context class
class PaymentContext {
  private paymentStrategy: PaymentStrategy;
  
  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  executePayment(amount: number) {
    this.paymentStrategy.pay(amount);
  }
}

// Usage
const paymentContext = new PaymentContext(new CreditCardPayment());
paymentContext.executePayment(100);

paymentContext.setPaymentStrategy(new PayPalPayment());
paymentContext.executePayment(200);

paymentContext.setPaymentStrategy(new BankTransferPayment());
paymentContext.executePayment(300);

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
  ON_GOING = "ON_GOING",
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

class Address {
  constructor(
    public id: string, // Added id property
    public street: string,
    public city: string,
    public state: string,
    public zip: string
  ) {}
}

class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public address: Address
  ) {}
}

class AdditionalService {
  constructor(public id: string, public title: string, public charge: number) {}
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
    public status: BookingStatus = BookingStatus.PENDING
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
// ###
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
// ###

class BookingAdditionalService {
  constructor(
    public id: string,
    public bookingId: string,
    public additionalServiceId: string
  ) {}
}

class DataPool {
  users: User[] = [];
  addresses: Address[] = [];
  additionalServices: AdditionalService[] = [];
  vehicles: Vehicle[] = [];
  bookings: Booking[] = [];
  payments: Payment[] = [];

  bookingAdditionalService: BookingAdditionalService[] = [];

  private static instance: DataPool;
  private constructor() {} // Private constructor

  public static getInstance(): DataPool {
    if (!DataPool.instance) {
      DataPool.instance = new DataPool();
    }
    return DataPool.instance;
  }
}

// BaseRepository class
abstract class BaseRepository<T extends { id: string }> {
  protected dataPool: DataPool;
  protected data: T[];

  constructor(data: T[] = [], dataPool: DataPool) {
    this.data = data;
    this.dataPool = dataPool;
  }

  async add(item: T): Promise<string> {
    this.data.push(item);
    return Promise.resolve(item.id);
  }

  async getAll(): Promise<T[]> {
    return Promise.resolve(this.data);
  }

  async getById(id: string): Promise<T | undefined> {
    return Promise.resolve(this.data.find((item: any) => item.id === id));
  }

  async removeById(id: string): Promise<boolean> {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async updateById(id: string, updatedItem: T): Promise<boolean> {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.data[index] = updatedItem;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  // Generalized method with criteria
  async removeByCriteria(criteria: (item: T) => boolean): Promise<boolean> {
    const index = this.data.findIndex(criteria);
    if (index !== -1) {
      this.data.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async getByCriteria(criteria: (item: T) => boolean): Promise<T | undefined> {
    return Promise.resolve(this.data.find(criteria));
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
  private barCodeBookings = new Map<string, string>();

  addBarCodeToBooking(barCode: string, bookingId: string): void {
    this.barCodeBookings.set(bookingId, barCode);
  }
  getBookingIdByBarCode(barCode: string): string {
    return this.barCodeBookings.get(barCode)!;
  }
  removeBarCodeFromBooking(bookingId: string): void {
    this.barCodeBookings.delete(bookingId);
  }
}

class PaymentRepository extends BaseRepository<Payment> {
  constructor(data: Payment[] = []) {
    super(data, DataPool.getInstance());
  }
}
class BookingAdditionalServiceRepository extends BaseRepository<BookingAdditionalService> {
  constructor(data: BookingAdditionalService[] = []) {
    super(data, DataPool.getInstance());
  }
}

function generateId() {
  const id = Date.now() + Math.floor(Math.random() * 1000);
  return String(id);
}
type Fees = {
  rentFee: number;
  lateFee: number;
  additionalServicesFee: number;
  totalFees: number;
};

class PaymentService {
  private strategyMap: Map<IPaymentStrategy, PaymentType>;
  constructor(
    private strategy: IPaymentStrategy,
    private paymentRepo: PaymentRepository
  ) {
    this.strategyMap = new Map<IPaymentStrategy, PaymentType>([
      [new CreditCardPayment(), PaymentType.CREDIT_CARD],
      [new UPIPayment(), PaymentType.UPI],
    ]);

    this.processPayment = this.processPayment.bind(this);
    this.createPayment = this.createPayment.bind(this);
  }

  processPayment(amount: number): void {
    this.strategy.process(amount);
  }
  async createPayment(bookingId: string, amount: number): Promise<string> {
    const payment = await this.paymentRepo.getByCriteria(
      (p: Payment) => p.id === bookingId
    );
    if (payment) {
      throw new Error(`Payment already exists for bookingId ${bookingId}`);
    }

    const paymentType = this.strategyMap.get(this.strategy)!;
    if (!paymentType)
      throw new Error(`payment type: ${paymentType} doesn't exist`);

    const newPayment = new Payment(
      generateId(),
      bookingId,
      amount,
      paymentType,
      Date.now()
    );
    const paymentId = await this.paymentRepo.add(newPayment);
    return paymentId;
  }
  async pay(bookingId: string, amount: number): Promise<string> {
    this.processPayment(amount);
    return await this.createPayment(bookingId, amount);
  }
}
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
  returnVehicle(barCode: string): Promise<void>;
  completePayment(bookingId: string): Promise<void>;
  returnVehicleAndPay(barCode: string): Promise<void>;
}
class BookingService implements IBookingService {
  constructor(
    private userRepo: UserRepository,
    private vehicleRepo: VehicleRepository,
    private bookingRepo: BookingRepository,
    private paymentService: PaymentService,

    private addressRepo: AddressRepository,
    private additionalServiceRepo: AdditionalServiceRepository,
    private paymentRepo: PaymentRepository,

    private bookingAdditionalServiceRepo: BookingAdditionalServiceRepository
  ) {}
  // ### Start ###
  async createReservation(
    userId: string,
    vehicleId: string,
    startDate: Date,
    endDate: Date
  ): Promise<string> {
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

    return bookingId;
  }

  async confirmBookingToGetBarCode(
    bookingId: string
  ): Promise<{ barCode: string; booking: Booking }> {
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
    this.bookingRepo.addBarCodeToBooking(barCode, booking.id);
    return { barCode, booking };
  }
  async cancelBooking(bookingId: string): Promise<void> {
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
  }

  async pickUpVehicle(barCode: string): Promise<void> {
    const bookingId = this.bookingRepo.getBookingIdByBarCode(barCode);
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
  }

  async returnVehicle(barCode: string): Promise<void> {
    const bookingId = this.bookingRepo.getBookingIdByBarCode(barCode);
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
  }

  async completePayment(barCode: string): Promise<void> {
    const bookingId = this.bookingRepo.getBookingIdByBarCode(barCode);
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

    //Call PaymentService to pay
    const paymentId = await this.paymentService.pay(bookingId, fees.totalFees); //status is generally given by web
    if (paymentId) throw new Error(`Failed to process payment`);
    this.bookingRepo.updateById(bookingId, booking);
  }
  async returnVehicleAndPay(barCode: string): Promise<void> {
    await this.returnVehicle(barCode);
    await this.completePayment(barCode);
  }
  //### End ###

  async getVehicleStatusUsingValidation(
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
