import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserFollowerDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}

export class CreateManualFollowerDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthday: number;
  @ApiProperty()
  address: string;
  @ApiProperty()
  postcode: string;
}

export class UnFollowDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}

export class RemoveManualFollowerDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
