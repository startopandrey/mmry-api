import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  category: string;
}
