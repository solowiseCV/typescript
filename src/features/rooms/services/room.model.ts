import  { Room } from '../models/room.model';  // Assuming the Room model is located in 'models'
import mongoose from 'mongoose';
import IRoom from '../models/room.model';

interface CreateRoomDTO {
  hotel_id: mongoose.Schema.Types.ObjectId;
  room_number: string;
  type: string;
  price: number;
  amenities?: string[];
}

interface UpdateRoomDTO extends Partial<CreateRoomDTO> {}

class RoomService {
  // Create a new room
  public async createRoom(roomData: CreateRoomDTO): Promise<IRoom> {
    try {
      const newRoom = new Room(roomData);
      return await newRoom.save();
    } catch (error) {
      throw new Error(`Error creating room: ${(error as Error).message}`);
    }
  }

  // Get all rooms
  public async getRooms(): Promise<IRoom[]> {
    try {
      return await Room.find();
    } catch (error) {
      throw new Error(`Error fetching rooms: ${(error as Error).message}`);
    }
  }

  // Get room by ID
  public async getRoomById(id: string): Promise<IRoom | null> {
    try {
      return await Room.findById(id);
    } catch (error) {
      throw new Error(`Error fetching room with ID ${id}: ${(error as Error).message}`);
    }
  }

  // Update room by ID
  public async updateRoom(id: string, roomData: UpdateRoomDTO): Promise<IRoom | null> {
    try {
      return await Room.findByIdAndUpdate(id, roomData, { new: true });
    } catch (error) {
      throw new Error(`Error updating room with ID ${id}: ${(error as Error).message}`);
    }
  }

  // Delete room by ID
  public async deleteRoom(id: string): Promise<IRoom | null> {
    try {
      return await Room.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting room with ID ${id}: ${(error as Error).message}`);
    }
  }
}

export default new RoomService();
