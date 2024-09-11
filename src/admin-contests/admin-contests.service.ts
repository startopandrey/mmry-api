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

@Injectable()
export class AdminContestsService {
  constructor(
    @InjectModel(AdminCategory.name)
    private readonly categoryModel: Model<AdminCategoryDocument>,
    @InjectModel(AdminContest.name)
    private readonly contestModel: Model<AdminContestDocument>,
  ) {}
  async create(createAdminContestDto: CreateAdminContestDto) {
    const transformedAdminContest = {
      ...createAdminContestDto,
      location: {
        address: createAdminContestDto.location.address,
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
    const foundAdminContest = await this.contestModel.findById(id);
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
