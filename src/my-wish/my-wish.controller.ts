import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyWishService } from './my-wish.service';
import { CreateMyWishDto } from './dto/create-my-wish.dto';
import { UpdateMyWishDto } from './dto/update-my-wish.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('My Wish')
@ApiBearerAuth('JWT')
@Controller('api/v1/my-wishes')
export class MyWishController {
  constructor(private readonly myWishService: MyWishService) {}

  @Post()
  create(@Body() createMyWishDto: CreateMyWishDto) {
    return this.myWishService.create(createMyWishDto);
  }

  @Get()
  findAll() {
    return this.myWishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myWishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyWishDto: UpdateMyWishDto) {
    return this.myWishService.update(+id, updateMyWishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myWishService.remove(id);
  }
}
