import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoriesCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly authorClerkId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: number;

  @IsNumber()
  @ApiProperty()
  readonly createdAt: string;
}
