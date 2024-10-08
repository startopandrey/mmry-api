import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { AdminContestsService } from './admin-contests.service';
import { CreateAdminContestDto } from './dto/create-admin-contest.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindAllQuery } from './dto/find-all.query';

@ApiTags('Admin Contest')
@ApiBearerAuth('JWT')
@Controller('api/v1/admin-contests')
export class AdminContestsController {
  constructor(private readonly adminContestsService: AdminContestsService) {}

  @Post()
  create(@Body() createContestDto: CreateAdminContestDto) {
    return this.adminContestsService.create(createContestDto);
  }

  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.adminContestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminContestsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
  //   return this.adminContestsService.update(+id, updateContestDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminContestsService.remove(+id);
  }
}
