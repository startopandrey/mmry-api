import { Injectable } from '@nestjs/common';
import { CreateAdminCategoryDto } from './dto/create-admin-category.dto';
import { UpdateAdminCategoryDto } from './dto/update-admin-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  AdminCategory,
  AdminCategoryDocument,
} from './entities/admin-category.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdminCategoriesService {
  constructor(
    @InjectModel(AdminCategory.name)
    private readonly adminCategoryModel: Model<AdminCategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateAdminCategoryDto) {
    const newCategory = await this.adminCategoryModel.create(createCategoryDto);
    return newCategory;
  }

  async findAll() {
    const allCategories = await this.adminCategoryModel.find().populate({
      path: 'activities',
      model: 'AdminActivity',
    });

    return allCategories;
  }

  async findOne(id: string) {
    const foundCategory = await this.adminCategoryModel.findById(id).populate({
      path: 'activities',
      model: 'AdminActivity',
    });

    return foundCategory;
  }

  update(id: number, updateCategoryDto: UpdateAdminCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
