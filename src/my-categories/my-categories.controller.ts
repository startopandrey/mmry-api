import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyCategoriesService } from './my-categories.service';
import { CreateMyCategoryDto } from './dto/create-my-category.dto';
import { UpdateMyCategoryDto } from './dto/update-my-category.dto';

@Controller('my-categories')
export class MyCategoriesController {
  constructor(private readonly myCategoriesService: MyCategoriesService) {}

  @Post()
  create(@Body() createMyCategoryDto: CreateMyCategoryDto) {
    return this.myCategoriesService.create(createMyCategoryDto);
  }

  @Get()
  findAll() {
    return this.myCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMyCategoryDto: UpdateMyCategoryDto,
  ) {
    return this.myCategoriesService.update(+id, updateMyCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myCategoriesService.remove(+id);
  }
}
