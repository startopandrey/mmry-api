import { Injectable } from '@nestjs/common';
import { CreateUserWishDto } from './dto/create-user-wishes.dto';
import { UpdateUserWishDto } from './dto/update-user-wishes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserWish, UserWishDocument } from './entities/user-wish.entity';

@Injectable()
export class UserWishesService {
  constructor(
    @InjectModel(UserWish.name)
    private readonly userWishModel: Model<UserWishDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthService,
  ) {}
  async create(createMyWishDto: CreateUserWishDto) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const releatedActivity = createMyWishDto?.releatedActivityId
      ? {
          releatedActivity: createMyWishDto.releatedActivityId,
        }
      : {};
    const releatedContest = createMyWishDto.releatedContestId
      ? {
          releatedContest: createMyWishDto.releatedContestId,
        }
      : {};
    const transformedNewWish: any = {
      ...createMyWishDto,
      ...releatedActivity,
      ...releatedContest,
      author: currentUser._id,
    };
    const newWish = await this.userWishModel.create(transformedNewWish);
    const wishObj = { wish: newWish._id, isActive: true };
    currentUser.wishes.push(wishObj);
    await currentUser.save();
    return newWish;
  }

  async findAll(): Promise<any[]> {
    const currentUserId = await this.auth.getCurrentUserId();
    const currentUser = await this.userModel
      .findById(currentUserId)
      .populate({
        path: 'wishes.wish',
        model: 'UserWish',
        populate: {
          path: 'releatedActivity releatedContest',
        },
      })
      .lean();
    const activeWishes = currentUser?.wishes?.filter((wish) => wish?.isActive);
    // const foundWishes = currentUser?.wishes;
    const transformedWishes = activeWishes
      .map((wish: any) => {
        const currentType = wish?.wish?.type;
        console.log({ currentType });
        if (currentType == 'activity') {
          return {
            ...wish,
            wish: {
              ...wish?.wish,
              data: wish?.wish?.releatedActivity,
              releatedActivity: wish?.wish?.releatedActivity?.id,
            },
          };
        }
        if (currentType == 'contest') {
          return {
            ...wish,
            wish: {
              ...wish?.wish,
              data: wish?.wish?.releatedContest,
              releatedContest: wish?.wish?.releatedContest?.id,
            },
          };
        }
        return wish;
      })
      .filter((wish) => wish?.wish?.data);
    return transformedWishes ?? [];
  }

  async findOne(id: string) {
    const currentUserId = await this.auth.getCurrentUserId();
    const foundWish = await this.userWishModel.find({ author: currentUserId });
    return foundWish;
  }

  update(id: string, updateMyWishDto: UpdateUserWishDto) {
    return `This action updates a #${id} myWish`;
  }

  async remove(id: string) {
    console.log({ id });
    const removedWish = await this.userWishModel.deleteOne({ _id: id });
    const currentUser = await this.auth.getCurrentUserOrThrow();
    // console.log(currentUser.wishes)
    currentUser.wishes = currentUser.wishes.filter(
      (item: any) => item._id?.toString() != id,
    );
    await currentUser.save();
    return 'SUCCESS';
  }
  async completed(id: string) {
    console.log({ id });
    const currentUser = await this.auth.getCurrentUserOrThrow();
    // console.log(currentUser.wishes)
    currentUser.wishes = currentUser.wishes.map((item: any) => {
      if (item._id == id) {
        return { ...item, isActive: false };
      }
      return item;
    });
    await currentUser.save();
    return 'SUCCESS';
  }
}
