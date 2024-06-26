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
import { PlayMemoriesCard } from './dto/play-memories-card.dto';

@ApiTags('Memories Cards')
@Controller('api/v1/memories-card')
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
  @Post('play')
  play(@Body() dto: PlayMemoriesCard) {
    return this.memoriesCardService.play(dto);
  }
  @Get('type/:id')
  getCardType(@Param('id') id: string) {
    return this.memoriesCardService.getCardType(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesCardService.findOne(id);
  }

  @Put()
  update(@Body() updateMemoriesCardDto: UpdateMemoriesCardDto) {
    return this.memoriesCardService.update(updateMemoriesCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesCardService.remove(+id);
  }
}
