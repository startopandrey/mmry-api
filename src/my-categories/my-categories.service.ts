import { Injectable } from '@nestjs/common';
import { CreateMyCategoryDto } from './dto/create-my-category.dto';
import { UpdateMyCategoryDto } from './dto/update-my-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class MyCategoriesService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  create(createMyCategoryDto: CreateMyCategoryDto) {
    return 'This action adds a new myCategory';
  }

  findAll() {
    return `This action returns all myCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myCategory`;
  }

  update(id: number, updateMyCategoryDto: UpdateMyCategoryDto) {
    return `This action updates a #${id} myCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} myCategory`;
  }
}
