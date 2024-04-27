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
    console.log(query);
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const currentManualFollowerIds = currentUser.manualFollowers.map((e: any) =>
      e._id.toString(),
    );
    const queryFollowerIds = query.followers?.filter(Boolean);
    const transformedCategoriesIds = query.categories?.filter(Boolean);
    const queryMyFollowerIds = queryFollowerIds?.filter(
      (queryFollowerId: string) =>
        !currentManualFollowerIds.includes(queryFollowerId),
    );
    const queryManualFollowerIds = queryFollowerIds?.filter(
      (queryFollowerId: string) =>
        currentManualFollowerIds.includes(queryFollowerId),
    );
    console.log({ queryManualFollowerIds, queryMyFollowerIds });
    const findByKeyword = query.keyword
      ? {
          name: { $regex: query.keyword, $options: 'i' },
        }
      : {};
    const findByCategories = transformedCategoriesIds?.length
      ? {
          categories: { $in: transformedCategoriesIds },
        }
      : {};
    const findByMyFollowers = queryMyFollowerIds?.length
      ? {
          mentioned: { $in: queryMyFollowerIds },
        }
      : {};
    const findByManualFollowers = queryManualFollowerIds?.length
      ? {
          mentionedManually: { $in: queryManualFollowerIds },
        }
      : {};
    const findOptions = {
      ...findByKeyword,
      ...findByCategories,
      ...findByMyFollowers,
      ...findByManualFollowers,
      authorClerkId: currentUser.clerkUserId,
    };
    const itemCount = await this.memoryModel.find(findOptions).countDocuments();

    const entities = await this.memoryModel
      .find(findOptions)
      .sort({ date: query.order })
      .limit(query.take)
      .skip(query.skip);

    const populatedMemories = await Promise.all(
      entities.map(async (memory) => ({
        ...memory.toObject(),
        id: memory._id,
        categories: await this.populateMemoryCategories(memory.categories),
      })),
    );
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    return new PageDto(populatedMemories, pageMetaDto);
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
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const memory = await this.memoryModel
      .findById(id)
      .populate({
        path: 'mentioned',
        model: 'User',
      })
      .exec();
    const manualFollowerIds = memory.mentionedManually;

    const populatedManualFollowers = currentUser.manualFollowers.filter(
      (e: any) => manualFollowerIds.includes(e._id),
    );
    console.log({ populatedManualFollowers });
    const populatedCategories = await this.populateMemoryCategories(
      memory.categories,
    );
    const transformedMemory = {
      ...memory.toObject(),
      categories: populatedCategories,
      mentionedManually: populatedManualFollowers,
    };
    return transformedMemory;
  }
  async populateMemoryCategories(memoryCategories) {
    const currentUserCategories = await this.getCurrentUserCategories();
    const populatedCategories = currentUserCategories.filter((category: any) =>
      memoryCategories.includes(category._id),
    );
    return populatedCategories;
  }
  async getCurrentUserCategories() {
    const currentUser = this.auth.getCurrentUserOrThrow();
    const currentCategories = (await currentUser).categories;
    return currentCategories;
  }
  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    const updatedMemory = await this.memoryModel.findByIdAndUpdate(
      id,
      updateMemoryDto,
    );
    return updatedMemory;
  }

  remove(id: number) {
    return `This action removes a #${id} memory`;
  }
}
