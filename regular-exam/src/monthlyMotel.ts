import { Motel } from './contracts/motel';
import { PartialMonthlyMotel } from './contracts/partialMonthlyMotel';
import { Room } from './contracts/room';
import { SummerMonth, WinterMonth } from './contracts/util';

export class MonthlyMotel<T extends SummerMonth | WinterMonth>
  extends PartialMonthlyMotel
  implements Motel
{
  private totalBudget = 0;
  private rooms: Map<Room['roomNumber'], Room> = new Map();
  private bookings: Map<Room['roomNumber'], Set<T>> = new Map();

  getTotalBudget(): string {
    return `MotelName: ${
      PartialMonthlyMotel.MotelName
    }\nTotal budget: $${this.totalBudget.toFixed(2)}`;
  }
  addRoom(room: Room): string {
    if (
      !('roomNumber' in room) ||
      !('totalPrice' in room) ||
      !('cancellationPrice' in room)
    ) {
      return 'Value was not a Room.';
    }
    if (this.rooms.has(room.roomNumber)) {
      return `Room '${room.roomNumber}' already exists.`;
    }
    this.rooms.set(room.roomNumber, room);
    return `Room '${room.roomNumber}' added.`;
  }

  bookRoom(roomNumber: Room['roomNumber'], bookedMonth: T): string {
    if (!this.rooms.has(roomNumber)) {
      return `Room '${roomNumber}' does not exist.`;
    }

    if (!this.bookings.has(roomNumber)) {
      this.bookings.set(roomNumber, new Set<T>());
    }

    const setOfBookedRooms = this.bookings.get(roomNumber);

    if (setOfBookedRooms?.has(bookedMonth)) {
      return `Room '${roomNumber}' is already booked for '${bookedMonth}'.`;
    } else {
      const room = this.rooms.get(roomNumber)!;
      this.totalBudget += room.totalPrice;
      setOfBookedRooms?.add(bookedMonth);
      return `Room '${roomNumber}' booked for '${bookedMonth}'.`;
    }
  }
  cancelBooking(roomNumber: Room['roomNumber'], bookedMonth: T): string {
    if (!this.rooms.has(roomNumber)) {
      return `Room '${roomNumber}' does not exist.`;
    }
    const setOfBookedRooms = this.bookings.get(roomNumber);
    if (!setOfBookedRooms?.has(bookedMonth)) {
      return `Room '${roomNumber}' is not booked for '${bookedMonth}'.`;
    } else {
      const room = this.rooms.get(roomNumber)!;
      this.totalBudget -= room.cancellationPrice;
      setOfBookedRooms.delete(bookedMonth);
      return `Booking cancelled for Room '${roomNumber}' for '${bookedMonth}'.`;
    }
  }
}
