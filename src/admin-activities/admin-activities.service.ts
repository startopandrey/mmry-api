import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAdminActivityDto } from './dto/create-admin-activity.dto';
import { UpdateAdminActivityDto } from './dto/update-admin-activity.dto';
import {
  AdminActivity,
  ActivityDocument,
} from './entities/admin-activity.entity';
import {
  AdminCategory,
  AdminCategoryDocument,
} from 'src/admin-categories/entities/admin-category.entity';
import axios from 'axios';

@Injectable()
export class AdminActivitiesService {
  constructor(
    @InjectModel(AdminCategory.name)
    private readonly adminCategoryModel: Model<AdminCategoryDocument>,
    @InjectModel(AdminActivity.name)
    private readonly activityModel: Model<ActivityDocument>,
  ) {}
  async create(createActivityDto: CreateAdminActivityDto) {
    let address = 'No address is available :(';
    try {
      const addressFromCoords = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${createActivityDto.location.coordinates.lng},${createActivityDto.location.coordinates.lat}.json?types=address`,
        {
          params: {
            access_token: process.env.MAPBOX_ACCESS_TOKEN,
          },
        },
      );
      console.log(addressFromCoords.data.features[0]?.text);
      console.log(addressFromCoords.data);
      address = addressFromCoords.data.features[0]?.text;
    } catch (error) {}

    const transformedActivity = {
      ...createActivityDto,
      location: {
        address: address,
        geometry: {
          coordinates: createActivityDto.location.coordinates,
        },
      },
    };
    const newActivity = await this.activityModel.create(transformedActivity);
    await this.adminCategoryModel
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

  update(id: number, updateActivityDto: UpdateAdminActivityDto) {
    return `This action updates a #${id} Activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} Activity`;
  }
}
