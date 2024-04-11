import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemoriesCardCollectionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}
