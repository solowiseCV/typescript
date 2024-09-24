import { error } from 'console';
import RoomService from '../services/room.model'
import { Request, Response } from 'express';

class RoomController {
    async createRoom(req:Request, res: Response): Promise<Response>{
      try {
        const data = req.body;
        const newRoom = await RoomService.createRoom(data);
        return res.status(201).json({
            message: "Room created succesfully",
            data: newRoom
        })
      } catch (error) {
        console.log(error);
        return res.status(500).json({message:(error as Error).message})
      }
    }

    async getRooms(req: Request,res: Response): Promise<Response>{
        try {
            const rooms = await RoomService.getRooms();
            return res.status(200).json({
                message : "Room fetched Successfully",
                data: rooms
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: (error as Error).message});
        }
    }

    async getRoom(req:Request,res:Response): Promise<Response>{
        try {
           const {id} = req.params;
           const room = await RoomService.getRoomById(id);
           if(!room) return res.status(404).json({message : "Room not found"}) ;
            return res.status(200).json({message:"Room fetched successfully",
                data: room
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:(error as Error).message});
        }
    }

    async updateRoom(req: Request,res: Response): Promise<Response>{
        try {
            const {id}= req.params;
            const data = req.body;
            const updatedRoom = await RoomService.updateRoom(id,data);
            if(!updatedRoom) return res.status(404).json({message:"Room not found"});
            return res.status(200).json({message:'Room updated successfully',
                data : updatedRoom
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: (error as Error).message});
            
        }

        
    }

    async deleteRoom(req: Request,res: Response) : Promise<Response>{
        try {
            const {id} = req.params;
           const deletedRoom= await RoomService.deleteRoom(id);
           if(!deletedRoom) return res.status(404).json({message : 'Room not found'});
            return res.status(200).json({message: "Room deleted .."});
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: (error as Error).message})
        }
    }
}

export default new RoomController