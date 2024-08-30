import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { WISH_TYPE } from './wish.dto';

export class Data {
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}

export class CreateUserWishDto {
  @IsEnum(WISH_TYPE, { each: true })
  @ApiProperty({ enum: WISH_TYPE })
  type: WISH_TYPE;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  data: Data;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  releatedActivityId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  releatedContestId: string;
}
