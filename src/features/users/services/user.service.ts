// userService.ts
import User from '../models/user.model';

class UserService {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async createUser(data: { name: string, email: string, age: number }) {
    const newUser = new User(data);
    return await newUser.save();
  }

  async updateUser(id: string, data: { name: string, email: string, age: number }) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserService();
