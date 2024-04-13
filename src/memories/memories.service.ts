import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory, MemoryDocument } from './entities/memory.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { PageDto } from 'src/pagination/pagination.dto';
import { PageMetaDto } from 'src/pagination/pagination-meta.dto';
import { PaginationQuery } from 'src/pagination/pagination-options.dto';
import { SearchQuery } from './dto/search.query';

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
    console.log({ createMemoryDto });
    const newMemory = this.memoryModel.create(createMemoryDto);

    return newMemory;
  }

  async findAll(): Promise<Memory[]> {
    const result = await this.memoryModel.find();
    return result;
  }
  async search(query: SearchQuery): Promise<PageDto<any>> {
    const currentUserId = await this.auth.getCurrentUserId();
    console.log(query.keyword);
    const findQuery = query.keyword
      ? {
          name: { $regex: query.keyword, $options: 'i' },
        }
      : {};
    const findOptions = {
      ...findQuery,
      authorClerkId: 'user_2egP7d70DEZsDc80Anbx8IVkkXc',
    };
    const itemCount = await this.memoryModel.find(findOptions).countDocuments();
    const entities = await this.memoryModel
      .find(findOptions)
      .sort({ date: query.order })
      .limit(query.take)
      .skip(query.skip);

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    return new PageDto(entities, pageMetaDto);
  }
  async pagination(pageOptionsDto: PaginationQuery): Promise<PageDto<any>> {
    console.log(pageOptionsDto.page);
    const entities = await this.memoryModel
      .find()
      .sort({ date: pageOptionsDto.order })
      .limit(pageOptionsDto.take)
      .skip(pageOptionsDto.skip);
    const itemCount = await this.memoryModel.countDocuments();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    console.log({ id });
    const memory = await this.memoryModel
      .findById(id)
      .populate({
        path: 'categories',
        model: 'Category',
      })
      .populate({
        path: 'mentioned',
        model: 'User',
      })
      .exec();

    return memory;
  }

  update(id: number, updateMemoryDto: UpdateMemoryDto) {
    return `This action updates a #${id} memory`;
  }

  remove(id: number) {
    return `This action removes a #${id} memory`;
  }
}
