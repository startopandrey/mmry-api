import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);
    return newCategory;
  }

  async findAll() {
    const allCategories = await this.categoryModel.find().populate({
      path: 'activities',
      model: 'Activity',
    });

    return allCategories;
  }

  async findOne(id: string) {
    const foundCategory = await this.categoryModel.findById(id).populate({
      path: 'activities',
      model: 'Activity',
    });

    return foundCategory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
