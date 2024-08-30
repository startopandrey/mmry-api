import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserWishesService } from './user-wishes.service';
import { CreateUserWishDto } from './dto/create-user-wishes.dto';
import { UpdateUserWishDto } from './dto/update-user-wishes.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Wish')
@ApiBearerAuth('JWT')
@Controller('api/v1/user-wishes')
export class UserWishesController {
  constructor(private readonly userWishService: UserWishesService) {}

  @Post()
  create(@Body() createUserWishDto: CreateUserWishDto) {
    return this.userWishService.create(createUserWishDto);
  }

  @Get()
  findAll() {
    return this.userWishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWishService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserWishDto: UpdateUserWishDto) {
  //   return this.userWishService.update(+id, updateUserWishDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userWishService.remove(id);
  }
}
