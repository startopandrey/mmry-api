import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MemoriesCardService } from './memories-card.service';
import { CreateMemoriesCardDto } from './dto/create-memories-card.dto';
import { UpdateMemoriesCardDto } from './dto/update-memories-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemoriesCardCollectionDto } from './dto/create-memories-card-collection.dto';

@ApiTags('Memories Cards')
@Controller('/api/memories-card')
export class MemoriesCardController {
  constructor(private readonly memoriesCardService: MemoriesCardService) {}

  @Post()
  create(@Body() createMemoriesCardDto: CreateMemoriesCardDto) {
    return this.memoriesCardService.create(createMemoriesCardDto);
  }

  @Post('collection')
  createCollection(
    @Body() createMemoriesCardCollectionDto: CreateMemoriesCardCollectionDto,
  ) {
    return this.memoriesCardService.createCollection(
      createMemoriesCardCollectionDto,
    );
  }

  @Get()
  findAll() {
    return this.memoriesCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesCardService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemoriesCardDto: UpdateMemoriesCardDto,
  ) {
    console.log(id);
    return this.memoriesCardService.update(id, updateMemoriesCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesCardService.remove(+id);
  }
}