import mongoose, { Document, Schema, Model } from 'mongoose';


interface IRoom extends Document {
  hotel_id: mongoose.Schema.Types.ObjectId;
  room_number: string;
  type: string;  
  price: number;
  amenities?: string[];  
  created_at: Date;
  updated_at: Date;
}


const RoomSchema: Schema = new mongoose.Schema({
  hotel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  room_number: { type: String, required: true },
  type: { type: String, required: true },  
  price: { type: Number, required: true },
  amenities: { type: [String] }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const Room: Model<IRoom> = mongoose.model<IRoom>('Room', RoomSchema);

export  {Room};
export default IRoom;
