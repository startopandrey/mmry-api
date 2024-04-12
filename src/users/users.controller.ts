import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchQuery } from './dto/search.query';
import { PageDto } from 'src/pagination/pagination.dto';
import { UserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @ApiResponse({ type: UserDto, isArray: true })
  @Get('search')
  search(@Query() query: SearchQuery): Promise<PageDto<UserDto>> {
    return this.usersService.search(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Get('followers')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
}
