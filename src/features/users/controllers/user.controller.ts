import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users); 
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error : (error as Error).message });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user); 
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, age } = req.body;
      const newUser = await UserService.createUser({ name, email, age });
      return res.status(201).json(newUser); 
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, age } = req.body;
      const updatedUser = await UserService.updateUser(req.params.id, { name, email, age });
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json(updatedUser); 
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User deleted successfully' }); 
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
  }
}

export default new UserController();
