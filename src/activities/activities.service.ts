import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from './entities/activity.entity';
import {
  Category,
  CategoryDocument,
} from 'src/categories/entities/category.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Activity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    const transformedActivity = {
      ...createActivityDto,
      location: {
        address: createActivityDto.location.address,
        geometry: {
          coordinates: createActivityDto.location.coordinates,
        },
      },
    };
    const newActivity = await this.activityModel.create(transformedActivity);
    await this.categoryModel
      .updateMany(
        {
          _id: {
            $in: createActivityDto.categories.map(
              (id) => new Types.ObjectId(id),
            ),
          },
        },
        { $addToSet: { activities: newActivity.id } },
      )
      .exec();

    return newActivity;
  }

  async findAll() {
    const allActivities = await this.activityModel.find();
    return allActivities;
  }

  async findOne(id: string) {
    const foundActivity = await this.activityModel.findById(id);
    return foundActivity;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} Activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} Activity`;
  }
}
