import Destination from '../models/destination.model'; 

class DestinationService {
    
    async createDestination(data: any) {
        return await Destination.create(data);
    }

    
    async getAllDestinations() {
        return await Destination.find().populate('hotels');
    }

   
    async getDestinationById(id: string) {
        return await Destination.findById(id).populate('hotels');
    }

   
    async updateDestination(id: string, data: any) {
        return await Destination.findByIdAndUpdate(id, data, { new: true });
    }

   
    async deleteDestination(id: string) {
        return await Destination.findByIdAndDelete(id);
    }
}

export default new DestinationService();
