import { Body, Controller, Get, Module, Post } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/categories.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import forFeatureDb from 'src/db/for-feature.db';

class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  category: string;
}
@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoriesController {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return dto;
  }
  @Get()
  async findAll(): Promise<CreateCategoryDto[]> {
    const allCategories = await this.categoryModel.find();
    return allCategories;
  }
}

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
