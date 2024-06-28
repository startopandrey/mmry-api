import { Injectable } from '@nestjs/common';
import { CreateMyWishDto } from './dto/create-my-wish.dto';
import { UpdateMyWishDto } from './dto/update-my-wish.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

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

  async findAll() {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    return currentUser?.wishes ?? [];
  }

  findOne(id: number) {
    return `This action returns a #${id} myWish`;
  }

  update(id: number, updateMyWishDto: UpdateMyWishDto) {
    return `This action updates a #${id} myWish`;
  }

  remove(id: number) {
    return `This action removes a #${id} myWish`;
  }
}
