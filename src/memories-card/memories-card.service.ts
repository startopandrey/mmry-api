import { Injectable } from '@nestjs/common';
import { CreateMemoriesCardDto } from './dto/create-memories-card.dto';
import { UpdateMemoriesCardDto } from './dto/update-memories-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MemoryCard, MemoryCardDocument } from './entities/memory-card.entity';
import { Model } from 'mongoose';
import { CreateMemoriesCardCollectionDto } from './dto/create-memories-card-collection.dto';
import {
  generateSixDigitNumber,
  getCurrentTime,
} from 'src/helper/index.helper';

@Injectable()
export class MemoriesCardService {
  constructor(
    @InjectModel(MemoryCard.name)
    private readonly memoryCardModel: Model<MemoryCardDocument>,
  ) {}
  async create(createMemoriesCardDto: CreateMemoriesCardDto) {
    const newMemoryCard = await new this.memoryCardModel(createMemoriesCardDto);
    return newMemoryCard.save();
  }
  async createCollection({ quantity }: CreateMemoriesCardCollectionDto) {
    const emptyMemoriesCards = Array.from({ length: quantity }, () => {
      const password = generateSixDigitNumber();
      return { password, createdAt: getCurrentTime() };
    });
    const memoriesWithIds =
      await this.memoryCardModel.create(emptyMemoriesCards);
    return memoriesWithIds;
  }

  async findOne(id: string) {
    const memoryCard = await this.memoryCardModel.findById(id);
    return memoryCard;
  }
  async update(id: string, { assets, activatedAt }: UpdateMemoriesCardDto) {
    const memoryCard = await this.memoryCardModel.findById(id);
    memoryCard.assets = assets;
    memoryCard.activatedAt = activatedAt ?? getCurrentTime();
    memoryCard.updatedAt = getCurrentTime();
    await memoryCard.save();
    return memoryCard;
  }
  async getCardType(id: string) {
    const memoryCard = await this.memoryCardModel.findById(id);
    const isPlayType = !!memoryCard.assets.length;
    if (!isPlayType) {
      return { type: 'UPLOAD' };
    }
    return { type: 'PLAY' };
  }
  remove(id: number) {
    return `This action removes a #${id} memoriesCard`;
  }
}
