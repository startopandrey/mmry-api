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
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/pagination/pagination.dto';
import { SearchQuery } from './dto/search.query';

@ApiTags('Memories')
@ApiBearerAuth('JWT')
@Controller('api/v1/memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  create(@Body() createMemoryDto: CreateMemoryDto) {
    return this.memoriesService.create(createMemoryDto);
  }

  @Get('search')
  search(
    @Query(new ValidationPipe({ transform: true })) query: SearchQuery,
  ): Promise<PageDto<CreateMemoryDto>> {
    return this.memoriesService.search(query);
  }
  @Get('count-all')
  countAll(): Promise<{ itemsCount: number }> {
    return this.memoriesService.countAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.memoriesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoriesService.update(id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesService.remove(id);
  }
}
