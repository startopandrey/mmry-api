import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './entities/memory.entity';

@Injectable()
export class MemoriesService {
  create(createMemoryDto: CreateMemoryDto) {
    return 'This action adds a new memory';
  }

  findAll(): Memory[] {
    return [
      {
        _id: '1',
        name: 'one',
      },
      {
        _id: '2',
        name: 'two',
      },
    ];
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
