import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory, MemoryDocument } from './entities/memory.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MemoriesService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Memory.name)
    private readonly memoryModel: Model<MemoryDocument>,
  ) {
    console.log(configService.get('DATABASE_URI'));
  }
  create(createMemoryDto: CreateMemoryDto) {
    return 'This action adds a new memory';
  }

  async findAll(): Promise<Memory[]> {
    const result = await this.memoryModel.find();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} memory`;
  }

  update(id: number, updateMemoryDto: UpdateMemoryDto) {
    return `This action updates a #${id} memory`;
  }

  remove(id: number) {
    return `This action removes a #${id} memory`;
  }
}
