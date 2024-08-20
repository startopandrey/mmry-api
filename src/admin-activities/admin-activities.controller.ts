import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminActivitiesService } from './admin-activities.service';
import { CreateAdminActivityDto } from './dto/create-admin-activity.dto';
import { UpdateAdminActivityDto } from './dto/update-admin-activity.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Activities')
@ApiBearerAuth('JWT')
@Controller('api/v1/admin-activities')
export class AdminActivitiesController {
  constructor(
    private readonly adminActivitiesService: AdminActivitiesService,
  ) {}

  @Post()
  create(@Body() createActivityDto: CreateAdminActivityDto) {
    return this.adminActivitiesService.create(createActivityDto);
  }

  @Get()
  findAll() {
    return this.adminActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminActivitiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateAdminActivityDto,
  ) {
    return this.adminActivitiesService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminActivitiesService.remove(+id);
  }
}
