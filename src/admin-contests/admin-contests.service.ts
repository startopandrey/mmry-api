import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAdminContestDto } from './dto/create-admin-contest.dto';
import {
  AdminContest,
  AdminContestDocument,
} from './entities/admin-contest.entity';
import {
  AdminCategory,
  AdminCategoryDocument,
} from 'src/admin-categories/entities/admin-category.entity';
import { FindAllQuery } from './dto/find-all.query';
import axios from 'axios';

@Injectable()
export class AdminContestsService {
  constructor(
    @InjectModel(AdminCategory.name)
    private readonly categoryModel: Model<AdminCategoryDocument>,
    @InjectModel(AdminContest.name)
    private readonly contestModel: Model<AdminContestDocument>,
  ) {}
  async create(createAdminContestDto: CreateAdminContestDto) {
    let address = '';

    const lng = createAdminContestDto?.location?.coordinates?.lng;
    const lat = createAdminContestDto?.location?.coordinates?.lat;
    if (lng && lat) {
      const addressFromCoords = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address`,
        {
          params: {
            access_token: process.env.MAPBOX_ACCESS_TOKEN,
          },
        },
      );
      address = addressFromCoords?.data?.features[0]?.text;
    }
    const date = createAdminContestDto?.date?.length
      ? { date: createAdminContestDto?.date }
      : {};
    const transformedAdminContest = {
      ...createAdminContestDto,
      ...date,
      location: {
        address: address,
        geometry: {
          coordinates: createAdminContestDto.location.coordinates,
        },
      },
    };
    const newAdminContest = await this.contestModel.create(
      transformedAdminContest,
    );
    await this.categoryModel
      .updateMany(
        {
          _id: {
            $in: createAdminContestDto.categories.map(
              (id) => new Types.ObjectId(id),
            ),
          },
        },
        { $addToSet: { contests: newAdminContest.id } },
      )
      .exec();

    return newAdminContest;
  }

  async findAll(query: FindAllQuery) {
    const now = new Date();
    const filterActive = !!query.isActive
      ? {
          'duration.to': { $gt: now },
        }
      : {};

    const allAdminContests = await this.contestModel.find(filterActive);
    return allAdminContests;
  }

  async findOne(id: string) {
    const foundAdminContest = await this.contestModel.findById(id).populate({
      path: 'categories',
      model: 'AdminCategory',
    });
    if (!foundAdminContest?._id) {
      throw new HttpException(
        'Contest was not found',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    return foundAdminContest;
  }

  // update(id: number, updateAdminContestDto: UpdateAdminContestDto) {
  //   return `This action updates a #${id} AdminContest`;
  // }

  remove(id: number) {
    return `This action removes a #${id} AdminContest`;
  }
}
