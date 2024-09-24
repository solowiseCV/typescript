import { Schema, model, Document } from "mongoose";


interface IRoom {
  type: string;
  price: number;
}

export interface IHotel extends Document {
  name: string;
  type: string;
  city: string;
  state: string;
  location: string;
  rating?: number;
  description?: string;
  address: string;
  price_per_night: number;
  cheapestPrice: number;
  number_of_guest?: number;
  image_url: string[];
  rooms: IRoom[];
  created_at?: Date;
  updated_at?: Date;
  beach_view?: boolean;
  tv?: boolean;
  wifi?: boolean;
  smart_home?: boolean;
  surveillance?: boolean;
  panic_button?: boolean;
}


const HotelSchema = new Schema<IHotel>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    description: { type: String },
    address: { type: String, required: true },
    price_per_night: { type: Number, required: true },
    cheapestPrice: { type: Number, required: true },
    number_of_guest: { type: Number, required: false },
    image_url: [{ type: String }],
    rooms: [
      {
        type: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    beach_view: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    smart_home: { type: Boolean, default: false },
    surveillance: { type: Boolean, default: false },
    panic_button: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Hotel = model<IHotel>("Hotel", HotelSchema);
export {Hotel}
export default IHotel;
