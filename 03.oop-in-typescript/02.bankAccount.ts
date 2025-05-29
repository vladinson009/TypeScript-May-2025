class BankAccount {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
  }
  private validateInput(input: number) {
    if (typeof input != 'number' || input <= 0) {
      throw new Error('Invalid amount!');
    }
  }

  deposit(amount: number): void {
    this.validateInput(amount);
    this.balance += Number(amount);
  }
  withdraw(amount: number): void {
    this.validateInput(amount);
    if (this.balance < amount) {
      throw new Error('Not enough balance!');
    }
    this.balance -= amount;
  }
  getBalance(): number {
    return this.balance;
  }
}
const account = new BankAccount(20);
account.withdraw(30);
console.log(account.getBalance());
