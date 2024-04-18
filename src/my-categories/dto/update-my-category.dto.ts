import { PartialType } from '@nestjs/swagger';
import { CreateMyCategoryDto } from './create-my-category.dto';

export class UpdateMyCategoryDto extends PartialType(CreateMyCategoryDto) {}
