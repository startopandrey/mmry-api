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
import { AdminCategoriesService } from './admin-categories.service';
import { CreateAdminCategoryDto } from './dto/create-admin-category.dto';
import { UpdateAdminCategoryDto } from './dto/update-admin-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterQuery } from './dto/filter.query';

@ApiTags('Admin Categories')
@ApiBearerAuth('JWT')
@Controller('api/v1/admin-categories')
export class AdminCategoriesController {
  constructor(private readonly categoriesService: AdminCategoriesService) {}

  @Post()
  create(@Body() createAdminCategoryDto: CreateAdminCategoryDto) {
    return this.categoriesService.create(createAdminCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('filter')
  filter(@Query() query: FilterQuery) {
    return this.categoriesService.filter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminCategoryDto: UpdateAdminCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateAdminCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
