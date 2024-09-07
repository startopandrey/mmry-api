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
import { MemoriesDto } from './dto/memories.dto';

@Injectable()
export class MemoriesService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Memory.name)
    private readonly memoryModel: Model<MemoryDocument>,
    private readonly auth: AuthService,
  ) {}
  async create(createMemoryDto: CreateMemoryDto) {
    const newMemory = await this.memoryModel.create(createMemoryDto);
    const userWithNewMemory = await this.auth.getCurrentUserOrThrow();
    userWithNewMemory.memories.push(newMemory.id);
    await userWithNewMemory.save();
    return newMemory;
  }

  async findAll(): Promise<MemoriesDto<any>> {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const entities = await this.memoryModel
      .find({ authorClerkId: currentUser.clerkUserId })
      .sort({ date: 'asc' })
      .lean();

    const populatedMemories = await entities.map((memory: any) => ({
      ...memory,
      id: memory._id,
      categories: this.populateMemoryCategories(
        memory.categories,
        currentUser.categories,
      ),
    }));
    const metadata = { itemCount: entities.length };
    return new MemoriesDto(populatedMemories, metadata);
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
      .populate({
        path: 'mentioned',
        model: 'User',
      })
      .limit(query.take)
      .skip(query.skip);

    const populatedMemories = await Promise.all(
      entities.map(async (memory) => ({
        ...memory?.toObject(),
        id: memory._id,
        categories: await this.populateMemoryCategories(
          memory.categories,
          currentUser.categories,
        ),
      })),
    );
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    return new PageDto(populatedMemories, pageMetaDto);
  }
  async countAll() {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const countMemories = await this.memoryModel
      .find({ authorClerkId: currentUser.clerkUserId })
      .populate({
        path: 'mentioned',
        model: 'User',
      })
      .countDocuments()
      .exec();
    return { itemsCount: countMemories };
  }
  async pagination(pageOptionsDto: PaginationQuery): Promise<PageDto<any>> {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const entities = await this.memoryModel
      .find({ authorClerkId: currentUser.clerkUserId })
      .sort({ date: pageOptionsDto.order })
      .limit(pageOptionsDto.take)
      .skip(pageOptionsDto.skip);
    const itemCount = await this.memoryModel.countDocuments();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const memory = await this.memoryModel.findById(id).populate({
      path: 'mentioned',
      model: 'User',
    });

    if (!memory) {
      return null;
    }
    const manualFollowerIds = memory?.mentionedManually ?? [];
    const populatedManualFollowers = currentUser?.manualFollowers.length
      ? currentUser?.manualFollowers?.filter((e: any) =>
          manualFollowerIds?.includes(e?._id),
        )
      : [];

    const populatedCategories = memory?.categories.length
      ? await this.populateMemoryCategories(
          memory?.categories,
          currentUser.categories,
        )
      : [];
    const transformedMemory = {
      ...memory?.toObject(),
      categories: populatedCategories,
      mentionedManually: populatedManualFollowers,
    };
    return transformedMemory;
  }
  populateMemoryCategories(memoryCategories, currentUserCategories) {
    const currentUserCategoriesIds = currentUserCategories.map((category) =>
      category._id.toString(),
    );
    console.log({ memoryCategories, currentUserCategoriesIds });
    const populatedCategories = memoryCategories
      ?.map((categoryId: any) => {
        const found = currentUserCategories?.filter(
          (category) => category?._id.toString() == categoryId.toString(),
        )[0];
        return found;
      })
      .filter(Boolean);
    return populatedCategories;
  }
  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    console.log(updateMemoryDto?.location?.coordinates);
    const transformedGeo = updateMemoryDto?.location?.coordinates
      ? {
          location: {
            ...updateMemoryDto?.location,
            geometry: {
              coordinates: updateMemoryDto?.location?.coordinates,
            },
          },
        }
      : null;
    const transformedMemory = {
      ...updateMemoryDto,
      ...transformedGeo,
    };
    const updatedMemory = await this.memoryModel.findByIdAndUpdate(
      id,
      transformedMemory,
    );
    console.log({ updatedMemory });
    return updatedMemory;
  }

  async remove(id: string) {
    await this.memoryModel.findByIdAndDelete(id);
    return 'SUCCESS';
  }
}
