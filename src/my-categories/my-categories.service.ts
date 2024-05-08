import { Injectable } from '@nestjs/common';
import { CreateMyCategoryDto } from './dto/create-my-category.dto';
import { UpdateMyCategoryDto } from './dto/update-my-category.dto';
import { InjectModel, Prop } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Memory, MemoryDocument } from 'src/memories/entities/memory.entity';
import { UserCategory } from './entities/my-category.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@Injectable()
export class MyCategoriesService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthService,
    @InjectModel(Memory.name)
    private readonly memoryModel: Model<MemoryDocument>,
  ) {}
  async create(dto: CreateMyCategoryDto) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    currentUser.categories.push(dto);
    await currentUser.save();
    return 'SUCCESS';
  }

  async findAll(): Promise<UserCategory[]> {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    return currentUser.categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} myCategory`;
  }

  update(id: number, updateMyCategoryDto: UpdateMyCategoryDto) {
    return `This action updates a #${id} myCategory`;
  }

  async remove(id: string) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    currentUser.categories = currentUser.categories.filter(
      (item: any) => item._id != id,
    );
    await currentUser.save();
    await this.memoryModel.updateMany(
      { categories: { $in: id } },
      { $pull: { categories: { $in: [id] } } },
    );
    return 'SUCCESS';
  }
}
