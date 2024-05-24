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
  constructor(private paymentStrategy: PaymentStrategy) {
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
