import HotelService from '../services/hotel.service'

class HotelController{
    async createHotel(){
      
        try {
            
            const newHotel = await HotelService.createHotel(req.body)
        } catch (error) {
            
        }
    }
}