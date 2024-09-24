import { Router } from 'express';
import RoomController from '../controllers/room.controller';  
const roomRouter = Router();


roomRouter.post('/rooms', RoomController.createRoom);         
roomRouter.get('/rooms', RoomController.getRooms);              
roomRouter.get('/rooms/:id', RoomController.getRoom);       
roomRouter.put('/rooms/:id', RoomController.updateRoom);       
roomRouter.delete('/rooms/:id', RoomController.deleteRoom);     

export default roomRouter;
