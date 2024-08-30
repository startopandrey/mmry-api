import { PartialType } from '@nestjs/swagger';
import { CreateUserWishDto } from './create-user-wishes.dto';

export class UpdateUserWishDto extends PartialType(CreateUserWishDto) {}
