import mongoose, { FilterQuery } from "mongoose";
import { Hotel } from "../models/hotel.model";
import IHotel from "../models/hotel.model";
import destinationModel from "../../destinations/models/destination.model";

interface CreateHotelDTO {
  name: string;
  address: string;
  location: string;
  state: string;
  type: string;
  city: string;
}

interface IFilters extends FilterQuery<IHotel> {} 
interface IHotelResponse {
  hotels: IHotel[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface CreateBookingDTO {
  user_id: mongoose.Schema.Types.ObjectId;
  hotel_id: mongoose.Schema.Types.ObjectId;
  check_in: Date;
  check_out: Date;
  status: string;
  payment_status: string;
}

interface UpdateHotelDto extends Partial<CreateHotelDTO> {}
interface UpdateHotelBookingDto extends Partial<CreateBookingDTO> {}
export default class HotelService {

  async createHotel(data: CreateHotelDTO): Promise<IHotel> {
    try {
      const newHotel = new Hotel(data);
      const savedHotel = await newHotel.save();
      // Find all matching destinations based on the hotel's location and state
      const matchingDestinations = await destinationModel.find({
        location: data.location,
        state: data.state,
      });

      if (matchingDestinations.length > 0) {
        // Add the hotel to each matching destination's hotels array
        await Promise.all(
          matchingDestinations.map((destination) =>
            destinationModel.findByIdAndUpdate(
              destination._id,
              { $push: { hotels: newHotel._id } },
              { new: true }
            )
          )
        );
      } else {
        throw new Error(
          "No matching destination found for the provided location and state"
        );
      }
      return savedHotel;
    } catch (error) {
      throw new Error(`Error creating room: ${(error as Error).message}`);
    }

  }
  
 // Fetch all hotels with pagination and filters
 async getHotels(filters :IFilters, query: any): Promise<IHotelResponse> {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const hotels = await Hotel.find(filters).skip(skip).limit(limit);
      const total = await Hotel.countDocuments(filters);
      const totalPages = Math.ceil(total / limit);

      return {
        hotels,
        total,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      throw new Error(`Error fetching hotels: ${(error as Error).message}`);
    }
  }

  async getHotel(id: string) {
    try {
      return await Hotel.findById(id).exec();
    } catch (error) {
      throw new Error(`Error fetching hotel: ${( error as Error).message}`);
    }
  }

    // Delete a hotel and remove references from destinations
    async deleteHotel(id :string) {
        try {
          const hotel = await Hotel.findByIdAndDelete(id);
          if (!hotel) throw new Error("Hotel not found");
    
          // Remove the hotel from all destinations that reference it
          await destinationModel.updateMany({ hotels: id }, { $pull: { hotels: id } });
    
          return hotel;
        } catch (error) {
          throw new Error(`Error deleting hotel: ${(error as Error).message}`);
        }
      }


  // Update an existing hotel
  async updateHotel(id: string, data: CreateHotelDTO) {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) throw new Error("Hotel not found");

      const originalLocation = hotel.location;
      const originalState = hotel.state;

      // Update the hotel
      const updatedHotel = await Hotel.findByIdAndUpdate(id, data, {
        new: true,
      });

      // If location or state changed, update the relevant destinations
      if (
        data.location !== originalLocation ||
        data.state !== originalState
      ) {
        // Remove hotel from original destinations
        await destinationModel.updateMany(
          { hotels: id, location: originalLocation, state: originalState },
          { $pull: { hotels: id } }
        );

        // Find new matching destinations
        const newMatchingDestinations = await destinationModel.find({
          location: updatedHotel?.location,
          state: updatedHotel?.state,
        });

        // Add the hotel to new matching destinations
        if (newMatchingDestinations.length > 0) {
          await Promise.all(
            newMatchingDestinations.map((destination) =>
              destinationModel.findByIdAndUpdate(
                destination._id,
                { $push: { hotels: id } },
                { new: true }
              )
            )
          );
        }
      }

      return updatedHotel;
    } catch (error) {
      throw new Error(`Error updating hotel: ${(error as Error).message}`);
    }
  }

}
