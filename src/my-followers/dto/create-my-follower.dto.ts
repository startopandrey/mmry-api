import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMyFollowerDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}

export class CreateManualFollowerDto {
  name: string;
  birthday: number;
  address: string;
  postcode: string;
}

export class UnFollowDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
