import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateMemoryDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  readonly note: string;
}
