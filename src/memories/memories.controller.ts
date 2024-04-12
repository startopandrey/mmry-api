import { PaginationQuery } from 'src/pagination/pagination-options.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Memories')
@Controller('api/v1/memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoriesService.create(createMemoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(id);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PaginationQuery) {
    return this.memoriesService.pagination(pageOptionsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoriesService.update(+id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesService.remove(+id);
  }
}
