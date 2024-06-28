import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyWishDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
