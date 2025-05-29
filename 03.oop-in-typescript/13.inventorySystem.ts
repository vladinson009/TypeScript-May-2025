class Product {
  private static _productCount: number = 0;
  private readonly _id: number;
  private _name!: string;
  private _price!: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this._id = ++Product._productCount;
  }
  static get productCount(): number {
    return this._productCount;
  }
  get id() {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  set name(value) {
    if (value.length < 1) {
      throw new Error('Value must be more than 1 char!');
    }
    this._name = value;
  }
  get price(): number {
    return this._price;
  }
  set price(value: number) {
    if (value <= 0) {
      throw new Error('Must be positive number!');
    }
    this._price = value;
  }
  getDetails(): string {
    return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
  }
}

class Inventory {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }
  listProducts(): string {
    let result = [];
    this.products.forEach((el) => result.push(el.getDetails()));
    result.push(`Total products created: ${Product.productCount}`);

    return result.join('\n');
  }
}

const inventory = new Inventory();
const product1 = new Product('Laptop', 1200);
const product2 = new Product('Phone', 800);

inventory.addProduct(product1);
inventory.addProduct(product2);

console.log(inventory.listProducts());
