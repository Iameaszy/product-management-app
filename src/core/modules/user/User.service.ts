import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './User.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


  public async createUser(user: User) {
    return this.userModel.create(user);
  }

  public async updateUser(userId: string, user: Partial<User>) {
    return this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec()
  }

  public async findUserById(id: string) {
    return this.userModel.findById(id).exec()
  }

  public async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec()
  }
}
