import { Room } from './contracts/room';

export class Apartment implements Room {
  public readonly roomNumber;
  private _price!: number;
  private _guestsCount: number;

  constructor(
    price: number,
    roomNumber: 'A01' | 'A02' | 'A03' | 'B01' | 'B02' | 'B03',
    guestsCount: number
  ) {
    this._guestsCount = guestsCount;
    this.setPrice(price);
    this.roomNumber = roomNumber;
  }

  private setPrice(val: number) {
    this._price = val;
  }

  public get totalPrice(): number {
    return this._price * this._guestsCount;
  }

  public get cancellationPrice(): number {
    return this.totalPrice * 0.8;
  }
}
