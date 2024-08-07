import { Injectable } from '@nestjs/common';
import { CreateMyWishDto } from './dto/create-my-wish.dto';
import { UpdateMyWishDto } from './dto/update-my-wish.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import mongoose, { Model, Types } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { MyWish } from './entities/my-wish.entity';

@Injectable()
export class MyWishService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthService,
  ) {}
  async create(createMyWishDto: CreateMyWishDto) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    currentUser.wishes.push(createMyWishDto);
    await currentUser.save();
    return 'SUCCESS';
  }

  async findAll(): Promise<MyWish[]> {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    return currentUser?.wishes ?? [];
  }

  findOne(id: number) {
    return `This action returns a #${id} myWish`;
  }

  update(id: number, updateMyWishDto: UpdateMyWishDto) {
    return `This action updates a #${id} myWish`;
  }

  async remove(id: string) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    // console.log(currentUser.wishes)
    currentUser.wishes = currentUser.wishes.filter(
      (item: any) => item._id != id,
    );
    await currentUser.save();
    return 'SUCCESS';
  }
}
