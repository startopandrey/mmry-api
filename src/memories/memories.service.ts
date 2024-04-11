import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory, MemoryDocument } from './entities/memory.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MemoriesService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Memory.name)
    private readonly memoryModel: Model<MemoryDocument>,
    private readonly auth: AuthService,
  ) {
    console.log(configService.get('DATABASE_URI'));
  }
  create(createMemoryDto: CreateMemoryDto) {
    console.log(createMemoryDto);
    const newMemory = this.memoryModel.create({
      name: createMemoryDto.name,
      note: createMemoryDto.note,
    });

    return newMemory;
  }

  async findAll(): Promise<Memory[]> {
    // const currentUserId = this.auth.getCurrentUserId();
    // console.log({ currentUserId });
    const result = await this.memoryModel.find();
    return result;
  }

  async findOne(id: string) {
    const memory = await this.memoryModel.findById(id);
    // .populate({
    //   path: 'categories',
    //   model: 'Category',
    //   select: ['category'],X
    // })
    // .populate({
    //   path: 'user',
    //   model: 'User',
    // select: ['category'],
    // })
    // .exec();
    return memory;
  }

  update(id: number, updateMemoryDto: UpdateMemoryDto) {
    return `This action updates a #${id} memory`;
  }

  remove(id: number) {
    return `This action removes a #${id} memory`;
  }
}
